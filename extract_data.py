"""
Emergency Data Extraction from Live Render Backend
Extracts all MongoDB data via API before the backend goes offline.
"""
import os
import json
import requests
import time

BASE_URL = "https://astro-vastu-backend.onrender.com"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "extracted_data")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

# ─── Step 1: Authenticate as Admin ───
print("=" * 60)
print("STEP 1: Admin Authentication")
print("=" * 60)

login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
    "email": "Savvvysinh9@gmail.com",
    "password": "astrosavvvysinh_123"
}, timeout=60)

if login_resp.status_code != 200:
    print(f"❌ Login failed: {login_resp.status_code}")
    exit(1)

token = login_resp.json()["token"]
role = login_resp.json()["role"]
print(f"✅ Authenticated as: {role}")

headers = {"Authorization": f"Bearer {token}"}

# ─── Step 2: Extract Products (Public) ───
print("\n" + "=" * 60)
print("STEP 2: Extracting Products")
print("=" * 60)

products_resp = requests.get(f"{BASE_URL}/api/products", timeout=60)
products_data = products_resp.json()
with open(os.path.join(OUTPUT_DIR, "products.json"), "w", encoding="utf-8") as f:
    json.dump(products_data, f, ensure_ascii=False, indent=2)
print(f"✅ Products: {products_data.get('count', 'unknown')} records saved")

# Also try admin endpoint for inactive products
try:
    admin_products_resp = requests.get(f"{BASE_URL}/api/products/admin/all", headers=headers, timeout=60)
    if admin_products_resp.status_code == 200:
        admin_products_data = admin_products_resp.json()
        with open(os.path.join(OUTPUT_DIR, "products_admin_all.json"), "w", encoding="utf-8") as f:
            json.dump(admin_products_data, f, ensure_ascii=False, indent=2)
        count = admin_products_data.get("count", len(admin_products_data.get("products", [])))
        print(f"✅ Admin Products (incl. inactive): {count} records saved")
except Exception as e:
    print(f"⚠️  Admin products endpoint: {e}")

# ─── Step 3: Extract Blogs (Public) ───
print("\n" + "=" * 60)
print("STEP 3: Extracting Blogs")
print("=" * 60)

blogs_resp = requests.get(f"{BASE_URL}/api/blogs", timeout=60)
blogs_data = blogs_resp.json()
with open(os.path.join(OUTPUT_DIR, "blogs.json"), "w", encoding="utf-8") as f:
    json.dump(blogs_data, f, ensure_ascii=False, indent=2)
blog_count = len(blogs_data) if isinstance(blogs_data, list) else blogs_data.get("count", "unknown")
print(f"✅ Blogs: {blog_count} records saved")

# ─── Step 4: Extract Orders (Admin) ───
print("\n" + "=" * 60)
print("STEP 4: Extracting Shop Orders")
print("=" * 60)

try:
    orders_resp = requests.get(f"{BASE_URL}/api/orders", headers=headers, timeout=60)
    if orders_resp.status_code == 200:
        orders_data = orders_resp.json()
        with open(os.path.join(OUTPUT_DIR, "orders.json"), "w", encoding="utf-8") as f:
            json.dump(orders_data, f, ensure_ascii=False, indent=2)
        count = len(orders_data) if isinstance(orders_data, list) else orders_data.get("count", "unknown")
        print(f"✅ Orders: {count} records saved")
    else:
        print(f"⚠️  Orders endpoint returned {orders_resp.status_code}: {orders_resp.text[:200]}")
except Exception as e:
    print(f"⚠️  Orders extraction error: {e}")

# Try with category filters
for cat in ["bracelet", "rudraksha", "potli"]:
    try:
        cat_resp = requests.get(f"{BASE_URL}/api/orders?category={cat}", headers=headers, timeout=60)
        if cat_resp.status_code == 200:
            cat_data = cat_resp.json()
            with open(os.path.join(OUTPUT_DIR, f"orders_{cat}.json"), "w", encoding="utf-8") as f:
                json.dump(cat_data, f, ensure_ascii=False, indent=2)
            count = len(cat_data) if isinstance(cat_data, list) else cat_data.get("count", "unknown")
            print(f"  ✅ {cat.title()} orders: {count} records")
    except Exception as e:
        print(f"  ⚠️  {cat} orders: {e}")

# ─── Step 5: Extract Paid Kundli (Admin) ───
print("\n" + "=" * 60)
print("STEP 5: Extracting Kundli Requests")
print("=" * 60)

try:
    kundli_resp = requests.get(f"{BASE_URL}/api/kundli/paid", headers=headers, timeout=60)
    if kundli_resp.status_code == 200:
        kundli_data = kundli_resp.json()
        with open(os.path.join(OUTPUT_DIR, "kundli_paid.json"), "w", encoding="utf-8") as f:
            json.dump(kundli_data, f, ensure_ascii=False, indent=2)
        count = len(kundli_data) if isinstance(kundli_data, list) else kundli_data.get("count", "unknown")
        print(f"✅ Paid Kundli: {count} records saved")
    else:
        print(f"⚠️  Kundli endpoint returned {kundli_resp.status_code}: {kundli_resp.text[:200]}")
except Exception as e:
    print(f"⚠️  Kundli extraction error: {e}")

# ─── Step 6: Figure Out Image Source & Download ───
print("\n" + "=" * 60)
print("STEP 6: Image Source Detection & Download")
print("=" * 60)

# Collect all image paths from products
all_image_paths = set()
products_list = products_data.get("products", []) if isinstance(products_data, dict) else products_data
for product in products_list:
    for img_path in product.get("images", []):
        all_image_paths.add(img_path)

# Also collect blog cover images
blogs_list = blogs_data.get("blogs", []) if isinstance(blogs_data, dict) else (blogs_data if isinstance(blogs_data, list) else [])
for blog in blogs_list:
    cover = blog.get("coverImage")
    if cover:
        all_image_paths.add(cover)

print(f"Found {len(all_image_paths)} unique image paths to download")

# Test where images are served from
test_image = list(all_image_paths)[0] if all_image_paths else "/images/rudraksha/1mukhi-1.jpeg"
sources_to_try = [
    ("Render Backend", f"{BASE_URL}{test_image}"),
    ("Cloudflare Frontend", f"https://www.astrosavvysingh.com{test_image}"),
]

working_base_url = None
for source_name, test_url in sources_to_try:
    try:
        resp = requests.get(test_url, timeout=30, allow_redirects=True)
        content_type = resp.headers.get("content-type", "unknown")
        print(f"  {source_name}: Status={resp.status_code}, Type={content_type}, Size={len(resp.content)} bytes")
        if resp.status_code == 200 and "image" in content_type:
            working_base_url = test_url.replace(test_image, "")
            print(f"  ✅ Images served from: {source_name} ({working_base_url})")
            break
    except Exception as e:
        print(f"  {source_name}: Error - {e}")

# Download all images
if working_base_url:
    downloaded = 0
    failed = 0
    for img_path in all_image_paths:
        img_url = f"{working_base_url}{img_path}"
        local_path = os.path.join(IMAGES_DIR, img_path.lstrip("/"))
        os.makedirs(os.path.dirname(local_path), exist_ok=True)

        try:
            img_resp = requests.get(img_url, timeout=30)
            if img_resp.status_code == 200:
                with open(local_path, "wb") as f:
                    f.write(img_resp.content)
                downloaded += 1
            else:
                failed += 1
                print(f"  ⚠️  Failed ({img_resp.status_code}): {img_path}")
        except Exception as e:
            failed += 1
            print(f"  ⚠️  Error downloading {img_path}: {e}")
        time.sleep(0.2)  # Be polite to the server

    print(f"\n✅ Images downloaded: {downloaded}/{len(all_image_paths)} (failed: {failed})")
else:
    print("❌ Could not determine image source. Manual investigation needed.")

# ─── Summary ───
print("\n" + "=" * 60)
print("EXTRACTION COMPLETE")
print("=" * 60)
print(f"Output directory: {OUTPUT_DIR}")
print("Files saved:")
for f in sorted(os.listdir(OUTPUT_DIR)):
    fp = os.path.join(OUTPUT_DIR, f)
    if os.path.isfile(fp):
        size = os.path.getsize(fp)
        print(f"  {f}: {size:,} bytes")
