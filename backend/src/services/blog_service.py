from typing import Dict, Any, List, Optional
from src.services.supabase_service import SupabaseService

class BlogService:
    def __init__(self):
        self.supabase_service = SupabaseService()
        self.client = self.supabase_service.client

    def get_published_blogs(self) -> List[Dict[str, Any]]:
        res = self.client.table("blogs").select("*").eq("is_published", True).order("created_at", desc=True).execute()
        return res.data or []

    def get_all_blogs_admin(self) -> List[Dict[str, Any]]:
        res = self.client.table("blogs").select("*").order("created_at", desc=True).execute()
        return res.data or []

    def get_blog_by_slug(self, slug: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("blogs").select("*").eq("slug", slug).execute()
        if res.data:
            return res.data[0]
        return None

    def get_blog_by_id(self, blog_id: str) -> Optional[Dict[str, Any]]:
        try:
            res = self.client.table("blogs").select("*").eq("id", blog_id).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            print(f"[BlogService] Error fetching blog by id '{blog_id}': {e}")
        return None

    def create_blog(self, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.client.table("blogs").insert(data).execute()
        return res.data[0] if res.data else {}

    def update_blog(self, blog_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        res = self.client.table("blogs").update(data).eq("id", blog_id).execute()
        return res.data[0] if res.data else {}

    def delete_blog(self, blog_id: str) -> bool:
        try:
            self.client.table("blogs").delete().eq("id", blog_id).execute()
            return True
        except Exception as e:
            print(f"[BlogService] Error deleting blog '{blog_id}': {e}")
            return False
