import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from src.server import app

client = TestClient(app)

def test_routes():
    print("=== TESTING UNIFIED FASTAPI BACKEND ===")
    
    # 1. Health check
    r = client.get("/api/health")
    print(f"GET /api/health -> {r.status_code}: {r.json()}")
    assert r.status_code == 200
    
    # 2. Get Public Products
    r = client.get("/api/shop/products")
    print(f"GET /api/shop/products -> {r.status_code}: count={r.json().get('count')}")
    assert r.status_code == 200
    assert r.json().get("count", 0) > 0
    
    # 3. Get Single Product
    r = client.get("/api/shop/products/sarvdosh-nivaran-holashtak-potli")
    print(f"GET /api/shop/products/sarvdosh-nivaran-holashtak-potli -> {r.status_code}")
    assert r.status_code == 200
    
    # 4. Get Blogs
    r = client.get("/api/shop/blogs")
    print(f"GET /api/shop/blogs -> {r.status_code}: count={len(r.json().get('blogs', []))}")
    assert r.status_code == 200
    
    # 5. Shop Admin Login
    r = client.post("/api/shop/admin/login", json={
        "email": "Savvvysinh9@gmail.com",
        "password": "astrosavvvysinh_123"
    })
    print(f"POST /api/shop/admin/login -> {r.status_code}: role={r.json().get('role')}")
    assert r.status_code == 200
    token = r.json().get("token")
    
    # 6. Admin Get All Orders
    r = client.get("/api/shop/orders", headers={"Authorization": f"Bearer {token}"})
    print(f"GET /api/shop/orders -> {r.status_code}: count={r.json().get('count')}")
    assert r.status_code == 200
    
    # 7. Admin Get Paid Kundlis
    r = client.get("/api/shop/kundli/paid", headers={"Authorization": f"Bearer {token}"})
    print(f"GET /api/shop/kundli/paid -> {r.status_code}: count={len(r.json().get('data', []))}")
    # 8. Create Payment Order
    r = client.post("/api/shop/payment/create-order", json={"amount": 499.00})
    print(f"POST /api/shop/payment/create-order -> {r.status_code}: order_id={r.json().get('order', {}).get('id')}")
    assert r.status_code == 200
    assert r.json().get("success") is True

    print("\n✅ ALL BACKEND TEST PASS SUCCESSFULLY!")

if __name__ == "__main__":
    test_routes()
