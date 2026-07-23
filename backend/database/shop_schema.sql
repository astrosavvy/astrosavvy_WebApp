-- ============================================
-- SHOP SCHEMA MIGRATION FOR SUPABASE (POSTGRESQL)
-- ============================================

-- PRODUCTS (E-commerce catalog)
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mongo_id TEXT,
    category TEXT NOT NULL CHECK (category IN ('bracelet', 'rudraksha', 'potli')),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    origin TEXT DEFAULT '',
    price NUMERIC(10,2) DEFAULT 0,
    original_price NUMERIC(10,2),
    images TEXT[] DEFAULT '{}',
    call_for_price BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    stock INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT TRUE,
    short_description TEXT DEFAULT '',
    description TEXT DEFAULT '',
    symbolism TEXT[] DEFAULT '{}',
    benefits TEXT[] DEFAULT '{}',
    benefits_appeal TEXT[] DEFAULT '{}',
    benefits_healing TEXT[] DEFAULT '{}',
    who_is_it_for TEXT[] DEFAULT '{}',
    icons TEXT[] DEFAULT '{}',
    contents TEXT[] DEFAULT '{}',
    title TEXT DEFAULT '',
    subtitle TEXT DEFAULT '',
    about TEXT DEFAULT '',
    footer_quote TEXT DEFAULT '',
    footer_note TEXT DEFAULT '',
    purpose TEXT DEFAULT '',
    how_to_use TEXT DEFAULT '',
    weight TEXT DEFAULT '',
    ritual JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

-- SHOP ORDERS (Physical products)
CREATE TABLE IF NOT EXISTS shop_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mongo_id TEXT,
    product_name TEXT NOT NULL,
    product_price NUMERIC(10,2) NOT NULL,
    product_category TEXT DEFAULT 'product',
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT NOT NULL,
    payment_id TEXT NOT NULL,
    payment_status TEXT DEFAULT 'paid',
    order_status TEXT DEFAULT 'received'
        CHECK (order_status IN ('received','processing','shipped','delivered','cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shop_orders_status ON shop_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_shop_orders_created ON shop_orders(created_at DESC);

-- KUNDLI REQUESTS (Consultations)
CREATE TABLE IF NOT EXISTS kundli_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mongo_id TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    time_of_birth TEXT NOT NULL,
    place_of_birth TEXT NOT NULL,
    gender TEXT,
    message TEXT,
    payment_status TEXT DEFAULT 'pending',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    delivery_status TEXT DEFAULT 'pending'
        CHECK (delivery_status IN ('pending','under_review','in_progress','delivered')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kundli_payment ON kundli_requests(payment_status);

-- BLOGS (Content management)
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mongo_id TEXT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT,
    author TEXT DEFAULT 'Admin',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- SHOP USERS (OTP auth)
CREATE TABLE IF NOT EXISTS shop_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    otp_code TEXT,
    otp_expires_at TIMESTAMPTZ,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shop_users_email ON shop_users(email);

-- AUTO-UPDATE TRIGGERS
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    CREATE TRIGGER trg_products_ts BEFORE UPDATE ON products
        FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_blogs_ts BEFORE UPDATE ON blogs
        FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_shop_users_ts BEFORE UPDATE ON shop_users
        FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
