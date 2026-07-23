import json, os

d = "extracted_data"
for f in sorted(os.listdir(d)):
    if not f.endswith(".json"):
        continue
    fp = os.path.join(d, f)
    with open(fp, encoding="utf-8") as fh:
        data = json.load(fh)
    
    if isinstance(data, list):
        count = len(data)
    elif isinstance(data, dict):
        for key in ["products", "blogs", "orders", "kundlis", "data"]:
            if key in data:
                count = len(data[key])
                break
        else:
            count = data.get("count", "dict-no-list")
    else:
        count = "unknown"
    
    size = os.path.getsize(fp)
    print(f"{f}: {count} records, {size:,} bytes")

# Count images
img_dir = os.path.join(d, "images", "images")
if os.path.exists(img_dir):
    total_imgs = 0
    for root, dirs, files in os.walk(img_dir):
        total_imgs += len(files)
    print(f"\nImages downloaded: {total_imgs} files")
