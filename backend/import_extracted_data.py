import json
import os
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

from supabase import create_client

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
EXTRACTED_DIR = os.path.join(os.path.dirname(__file__), "..", "extracted_data")

def import_products():
    path = os.path.join(EXTRACTED_DIR, "products.json")
    if not os.path.exists(path):
        print("products.json not found")
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    products = data.get("products", [])
    print(f"Importing {len(products)} products...")
    
    rows = []
    for p in products:
        row = {
            "mongo_id": p.get("_id"),
            "category": p.get("category", "bracelet").lower(),
            "name": p.get("name", ""),
            "slug": p.get("slug", ""),
            "origin": p.get("origin", ""),
            "price": p.get("price", 0),
            "original_price": p.get("originalPrice"),
            "images": p.get("images", []),
            "call_for_price": p.get("callForPrice", False),
            "is_active": p.get("isActive", True),
            "stock": p.get("stock", 0),
            "in_stock": p.get("inStock", True),
            "short_description": p.get("shortDescription", ""),
            "description": p.get("description", ""),
            "symbolism": p.get("symbolism", []),
            "benefits": p.get("benefits", []),
            "benefits_appeal": p.get("benefitsAppeal", []),
            "benefits_healing": p.get("benefitsHealing", []),
            "who_is_it_for": p.get("whoIsItFor", []),
            "icons": p.get("icons", []),
            "contents": p.get("contents", []),
            "title": p.get("title", ""),
            "subtitle": p.get("subtitle", ""),
            "about": p.get("about", ""),
            "footer_quote": p.get("footerQuote", ""),
            "footer_note": p.get("footerNote", ""),
            "purpose": p.get("purpose", ""),
            "how_to_use": p.get("howToUse", ""),
            "weight": str(p.get("weight", "")) if p.get("weight") else "",
            "ritual": p.get("ritual", {}),
        }
        rows.append(row)
        
    res = supabase.table("products").upsert(rows, on_conflict="slug").execute()
    print(f"✅ Imported products successfully! Inserted/Updated: {len(res.data)}")

def import_blogs():
    path = os.path.join(EXTRACTED_DIR, "blogs.json")
    if not os.path.exists(path):
        print("blogs.json not found")
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    blogs = data.get("blogs", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
    print(f"Importing {len(blogs)} blogs...")
    
    rows = []
    for b in blogs:
        row = {
            "mongo_id": b.get("_id"),
            "title": b.get("title", ""),
            "slug": b.get("slug", ""),
            "excerpt": b.get("excerpt", ""),
            "content": b.get("content", ""),
            "cover_image": b.get("coverImage", ""),
            "author": b.get("author", "Admin"),
            "is_published": b.get("isPublished", True)
        }
        rows.append(row)
        
    if rows:
        res = supabase.table("blogs").upsert(rows, on_conflict="slug").execute()
        print(f"✅ Imported blogs successfully! Inserted/Updated: {len(res.data)}")

def import_orders():
    path = os.path.join(EXTRACTED_DIR, "orders.json")
    if not os.path.exists(path):
        print("orders.json not found")
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    orders = data.get("orders", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
    print(f"Importing {len(orders)} shop orders...")
    
    rows = []
    for o in orders:
        row = {
            "mongo_id": o.get("_id"),
            "product_name": o.get("productName", ""),
            "product_price": o.get("productPrice", 0),
            "product_category": o.get("productCategory", "product"),
            "customer_name": o.get("customerName", ""),
            "phone": o.get("phone", ""),
            "email": o.get("email", ""),
            "address": o.get("address", ""),
            "payment_id": o.get("paymentId", ""),
            "payment_status": o.get("paymentStatus", "paid"),
            "order_status": o.get("orderStatus", "received"),
        }
        rows.append(row)
        
    if rows:
        res = supabase.table("shop_orders").insert(rows).execute()
        print(f"✅ Imported shop_orders successfully! Inserted: {len(res.data)}")

def import_kundli():
    path = os.path.join(EXTRACTED_DIR, "kundli_paid.json")
    if not os.path.exists(path):
        print("kundli_paid.json not found")
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    kundlis = data.get("data", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
    print(f"Importing {len(kundlis)} paid kundli requests...")
    
    rows = []
    for k in kundlis:
        row = {
            "mongo_id": k.get("_id"),
            "full_name": k.get("fullName", ""),
            "email": k.get("email", ""),
            "phone": k.get("phone", ""),
            "date_of_birth": k.get("dateOfBirth", ""),
            "time_of_birth": k.get("timeOfBirth", ""),
            "place_of_birth": k.get("placeOfBirth", ""),
            "gender": k.get("gender", ""),
            "message": k.get("message", ""),
            "payment_status": k.get("paymentStatus", "paid"),
            "razorpay_order_id": k.get("razorpayOrderId", ""),
            "razorpay_payment_id": k.get("razorpayPaymentId", ""),
            "delivery_status": k.get("deliveryStatus", "pending"),
        }
        rows.append(row)
        
    if rows:
        res = supabase.table("kundli_requests").insert(rows).execute()
        print(f"✅ Imported kundli_requests successfully! Inserted: {len(res.data)}")

if __name__ == "__main__":
    print("=== STARTING DATA IMPORT TO SUPABASE ===")
    import_products()
    import_blogs()
    import_orders()
    import_kundli()
    print("=== DATA IMPORT COMPLETE ===")
