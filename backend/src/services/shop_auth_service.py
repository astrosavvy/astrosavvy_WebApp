import os
import random
import time
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional
from jose import jwt, JWTError
from src.services.supabase_service import SupabaseService

class ShopAuthService:
    def __init__(self):
        self.supabase_service = SupabaseService()
        self.client = self.supabase_service.client
        self.jwt_secret = os.getenv("SHOP_JWT_SECRET") or os.getenv("SUPABASE_JWT_SECRET") or "super-secret-key-shop-12345"
        self.super_admin_email = (os.getenv("SHOP_ADMIN_EMAIL") or "Savvvysinh9@gmail.com").lower().strip()
        self.super_admin_pass = os.getenv("SHOP_ADMIN_PASSWORD") or "astrosavvvysinh_123"
        self.blog_admin_email = (os.getenv("SHOP_BLOG_ADMIN_EMAIL") or "blogadmin@astrosavvysingh.com").lower().strip()
        self.blog_admin_pass = os.getenv("SHOP_BLOG_ADMIN_PASSWORD") or "astrosavvvysinh_blog_123"

    def admin_login(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        email_clean = email.lower().strip()
        role = None
        full_name = "Admin User"

        # 1. Query Supabase admin_users table
        try:
            res = self.client.table("admin_users").select("*").eq("email", email_clean).execute()
            if res.data:
                u = res.data[0]
                if u.get("password") == password:
                    role = u.get("role", "support")
                    full_name = u.get("full_name", "Admin User")
        except Exception as e:
            print(f"[AdminLogin] Error checking database: {e}")

        # 2. Hardcoded / env fallback
        if not role:
            if email_clean == self.super_admin_email and password == self.super_admin_pass:
                role = "super-admin"
            elif email_clean == self.blog_admin_email and password == self.blog_admin_pass:
                role = "marketing"

        if not role:
            return None

        token = jwt.encode(
            {"email": email_clean, "role": role, "name": full_name, "exp": datetime.now(timezone.utc) + timedelta(days=1)},
            self.jwt_secret,
            algorithm="HS256"
        )
        return {"token": token, "role": role, "name": full_name}

    def generate_and_save_otp(self, name: str, email: str) -> str:
        email_clean = email.lower().strip()
        otp = str(random.randint(100000, 999999))
        expires_at = (datetime.now(timezone.utc) + timedelta(minutes=10)).isoformat()

        # Check existing user
        res = self.client.table("shop_users").select("*").eq("email", email_clean).execute()
        if res.data:
            self.client.table("shop_users").update({
                "name": name or res.data[0].get("name", "Customer"),
                "otp_code": otp,
                "otp_expires_at": expires_at
            }).eq("email", email_clean).execute()
        else:
            self.client.table("shop_users").insert({
                "name": name or "Customer",
                "email": email_clean,
                "otp_code": otp,
                "otp_expires_at": expires_at,
                "is_verified": False
            }).execute()
        return otp

    def verify_otp(self, email: str, otp: str) -> Optional[Dict[str, Any]]:
        email_clean = email.lower().strip()
        res = self.client.table("shop_users").select("*").eq("email", email_clean).execute()
        if not res.data:
            return None

        user = res.data[0]
        stored_otp = user.get("otp_code")
        expires_at_str = user.get("otp_expires_at")

        if not stored_otp or stored_otp != otp:
            return None

        if expires_at_str:
            try:
                expires_at = datetime.fromisoformat(expires_at_str.replace("Z", "+00:00"))
                if datetime.now(timezone.utc) > expires_at:
                    return None
            except Exception:
                pass

        # Clear OTP and verify
        self.client.table("shop_users").update({
            "otp_code": None,
            "otp_expires_at": None,
            "is_verified": True
        }).eq("email", email_clean).execute()

        token = jwt.encode({"id": user["id"], "email": email_clean, "name": user["name"], "exp": datetime.now(timezone.utc) + timedelta(days=7)}, self.jwt_secret, algorithm="HS256")
        return {"token": token, "user": user}

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        try:
            payload = jwt.decode(token, self.jwt_secret, algorithms=["HS256"])
            return payload
        except JWTError:
            return None
