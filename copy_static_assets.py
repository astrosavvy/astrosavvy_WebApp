import os
import shutil

src_dir = os.path.join(os.path.dirname(__file__), "frontend")
dst_dir = os.path.join(os.path.dirname(__file__), "astro-vaastu-savvy-frontend-main", "public")

os.makedirs(dst_dir, exist_ok=True)

# Copy asset images and directories
for item in os.listdir(src_dir):
    s = os.path.join(src_dir, item)
    d = os.path.join(dst_dir, item)
    if os.path.isdir(s):
        shutil.copytree(s, d, dirs_exist_ok=True)
    elif item.endswith((".png", ".jpg", ".jpeg", ".ico", ".svg")):
        shutil.copy2(s, d)

# Copy HTML files with specific target names
html_mappings = {
    "order.html": ["love-report.html", "order.html"],
    "mobile.html": ["mobile.html"],
    "success.html": ["success.html"],
    "love_calculator.html": ["love_calculator.html"],
    "admin.html": ["report-admin.html", "admin.html"],
    "admin_login.html": ["report-admin-login.html"],
    "admin_signup.html": ["report-admin-signup.html"],
    "index.html": ["testbed.html"]
}

for src_name, targets in html_mappings.items():
    src_file = os.path.join(src_dir, src_name)
    if os.path.exists(src_file):
        for target in targets:
            shutil.copy2(src_file, os.path.join(dst_dir, target))

print("✅ Static frontend assets & HTML pages copied to public/")
