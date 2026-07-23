import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from src.server import app

client = TestClient(app)

def test_rbac():
    print("=== TESTING ROLE-BASED ACCESS CONTROL (RBAC) ===")
    
    roles_credentials = [
        ("super-admin", "savvvysinh9@gmail.com", "astrosavvvysinh_123"),
        ("marketing", "marketing@astrosavvysingh.com", "marketing_123"),
        ("store-manager", "store@astrosavvysingh.com", "store_123"),
        ("support", "support@astrosavvysingh.com", "support_123"),
    ]
    
    for expected_role, email, password in roles_credentials:
        r = client.post("/api/shop/admin/login", json={"email": email, "password": password})
        assert r.status_code == 200
        data = r.json()
        assert data.get("role") == expected_role
        print(f"✅ Login successful for role '{expected_role}': {email}")

    print("\n✅ ALL 4 ADMIN ROLES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    test_rbac()
