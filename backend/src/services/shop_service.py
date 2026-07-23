from typing import Dict, Any, List, Optional
from src.services.supabase_service import SupabaseService

class ShopService:
    def __init__(self):
        self.supabase_service = SupabaseService()
        self.client = self.supabase_service.client

    # ================= PRODUCTS =================

    def get_public_products(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        query = self.client.table("products").select("*").eq("is_active", True)
        if category and category.lower() in ["bracelet", "rudraksha", "potli"]:
            query = query.eq("category", category.lower())
        res = query.order("created_at", desc=True).execute()
        return res.data or []

    def get_all_products_admin(self) -> List[Dict[str, Any]]:
        res = self.client.table("products").select("*").order("created_at", desc=True).execute()
        return res.data or []

    def get_product_by_slug(self, slug: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("products").select("*").eq("slug", slug).execute()
        if res.data:
            return res.data[0]
        return None

    def get_product_by_id(self, product_id: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("products").select("*").eq("id", product_id).execute()
        if res.data:
            return res.data[0]
        return None

    def create_product(self, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.client.table("products").insert(data).execute()
        return res.data[0] if res.data else {}

    def update_product(self, product_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.client.table("products").update(data).eq("id", product_id).execute()
        return res.data[0] if res.data else {}

    def delete_product(self, product_id: str) -> bool:
        res = self.client.table("products").delete().eq("id", product_id).execute()
        return True

    def toggle_product_active(self, product_id: str) -> Optional[Dict[str, Any]]:
        prod = self.get_product_by_id(product_id)
        if not prod:
            return None
        new_active = not prod.get("is_active", True)
        res = self.client.table("products").update({"is_active": new_active}).eq("id", product_id).execute()
        return res.data[0] if res.data else None

    # ================= SHOP ORDERS =================

    def create_shop_orders(self, orders_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        res = self.client.table("shop_orders").insert(orders_data).execute()
        return res.data or []

    def get_shop_orders(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        query = self.client.table("shop_orders").select("*")
        if category and category.lower() in ["bracelet", "rudraksha", "potli"]:
            query = query.eq("product_category", category.lower())
        res = query.order("created_at", desc=True).execute()
        return res.data or []

    def update_shop_order_status(self, order_id: str, status: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("shop_orders").update({"order_status": status}).eq("id", order_id).execute()
        return res.data[0] if res.data else None

    # ================= KUNDLI REQUESTS =================

    def create_kundli_request(self, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.client.table("kundli_requests").insert(data).execute()
        return res.data[0] if res.data else {}

    def get_paid_kundlis(self) -> List[Dict[str, Any]]:
        res = self.client.table("kundli_requests").select("*").eq("payment_status", "paid").order("created_at", desc=True).execute()
        return res.data or []

    def update_kundli_delivery_status(self, kundli_id: str, status: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("kundli_requests").update({"delivery_status": status}).eq("id", kundli_id).execute()
        return res.data[0] if res.data else None
