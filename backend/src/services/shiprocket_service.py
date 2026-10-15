import os
import time
import requests
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional
from src.utils.logger import log_info, log_error, log_warning, log_success

class ShiprocketService:
    _instance = None
    _token: Optional[str] = None
    _token_expires_at: float = 0

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ShiprocketService, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        self.base_url = os.getenv("SHIPROCKET_API_BASE_URL", "https://apiv2.shiprocket.in/v1/external").rstrip("/")
        self.email = os.getenv("SHIPROCKET_API_EMAIL", "")
        self.password = os.getenv("SHIPROCKET_API_PASSWORD", "")
        self.pickup_location = os.getenv("SHIPROCKET_PICKUP_NICKNAME", "warehouse")

    # ================= 1. AUTHENTICATION & TOKEN LIFECYCLE =================

    def get_auth_token(self) -> str:
        """Authenticates with Shiprocket API v2 and caches JWT token for 9 days."""
        current_time = time.time()
        if ShiprocketService._token and current_time < ShiprocketService._token_expires_at:
            return ShiprocketService._token

        log_info(f"[Shiprocket] Authenticating with email {self.email}...")
        login_url = f"{self.base_url}/auth/login"
        payload = {
            "email": self.email,
            "password": self.password
        }

        try:
            res = requests.post(login_url, json=payload, headers={"Content-Type": "application/json"}, timeout=15)
            if not res.ok:
                log_error(f"[Shiprocket] Authentication failed: {res.status_code} {res.text}")
                raise RuntimeError(f"Shiprocket login failed ({res.status_code}): {res.text}")

            data = res.json()
            token = data.get("token")
            if not token:
                raise RuntimeError(f"Shiprocket login response missing token: {data}")

            ShiprocketService._token = token
            # Cache for 9 days (token valid for 10)
            ShiprocketService._token_expires_at = current_time + (9 * 24 * 3600)
            log_success("[Shiprocket] Authentication token obtained & cached successfully.")
            return token
        except Exception as e:
            log_error(f"[Shiprocket] Login error: {e}")
            raise

    def request(self, path: str, method: str = "GET", body: Optional[Dict[str, Any]] = None, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Makes an authorized request to Shiprocket API v2 with automatic 401 retry."""
        token = self.get_auth_token()
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        url = f"{self.base_url}{path}"

        res = requests.request(method, url, json=body, params=params, headers=headers, timeout=20)

        # Invalidate cached token on 401 and retry once
        if res.status_code == 401:
            log_warning("[Shiprocket] Token expired (401). Refreshing token and retrying...")
            ShiprocketService._token = None
            ShiprocketService._token_expires_at = 0
            token = self.get_auth_token()
            headers["Authorization"] = f"Bearer {token}"
            res = requests.request(method, url, json=body, params=params, headers=headers, timeout=20)

        if not res.ok:
            error_msg = f"[Shiprocket] Request {method} {path} failed ({res.status_code}): {res.text}"
            log_error(error_msg)
            raise RuntimeError(error_msg)

        try:
            return res.json()
        except Exception:
            return {"raw": res.text, "status_code": res.status_code}

    # ================= 2. SERVICEABILITY & COURIER RATES =================

    def get_serviceability(
        self,
        delivery_pincode: str,
        weight_kg: float = 0.5,
        length_cm: float = 20.0,
        breadth_cm: float = 15.0,
        height_cm: float = 8.0,
        is_cod: bool = False,
        pickup_pincode: str = "110024"
    ) -> List[Dict[str, Any]]:
        """Checks available courier companies, rates, and estimated transit days."""
        params = {
            "pickup_postcode": pickup_pincode,
            "delivery_postcode": delivery_pincode,
            "weight": str(weight_kg),
            "length": str(length_cm),
            "breadth": str(breadth_cm),
            "height": str(height_cm),
            "cod": "1" if is_cod else "0"
        }
        data = self.request("/courier/serviceability/", method="GET", params=params)
        return data.get("data", {}).get("available_courier_companies", [])

    # ================= 3. ADHOC ORDER CREATION =================

    def create_adhoc_order(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Creates an adhoc shipping order in Shiprocket with idempotency check."""
        order_id = str(payload.get("order_id", ""))
        if order_id:
            try:
                search_res = self.request(f"/orders", method="GET", params={"search": order_id})
                orders_list = search_res.get("data", [])
                if isinstance(orders_list, list) and len(orders_list) > 0:
                    for existing in orders_list:
                        if existing.get("channel_order_id") == order_id or str(existing.get("order_id")) == order_id:
                            log_info(f"[Shiprocket] Order {order_id} already exists (ID: {existing.get('id')}). Reusing existing record.")
                            shipments = existing.get("shipments", [])
                            shipment_id = existing.get("shipment_id") or (shipments[0].get("id") if shipments else None)
                            return {
                                "order_id": existing.get("id") or existing.get("order_id"),
                                "shipment_id": shipment_id,
                                "status": existing.get("status"),
                                "is_duplicate": True
                            }
            except Exception as search_err:
                log_warning(f"[Shiprocket] Idempotency check failed (proceeding to create): {search_err}")

        log_info(f"[Shiprocket] Creating adhoc order for {order_id}...")
        return self.request("/orders/create/adhoc", method="POST", body=payload)

    # ================= 4. AWB ASSIGNMENT & PICKUP =================

    def assign_awb(self, shipment_id: int, courier_id: int) -> Dict[str, Any]:
        """Assigns an Air Waybill (AWB) to the created shipment."""
        log_info(f"[Shiprocket] Assigning AWB for shipment {shipment_id} with courier {courier_id}...")
        return self.request("/courier/assign/awb", method="POST", body={
            "shipment_id": int(shipment_id),
            "courier_id": int(courier_id)
        })

    def schedule_pickup(self, shipment_id: int, pickup_date_iso: Optional[str] = None) -> Dict[str, Any]:
        """Schedules courier pickup from registered warehouse."""
        body = {"shipment_id": [int(shipment_id)]}
        if pickup_date_iso:
            body["pickup_date"] = [pickup_date_iso]
        log_info(f"[Shiprocket] Scheduling pickup for shipment {shipment_id}...")
        return self.request("/courier/generate/pickup", method="POST", body=body)

    # ================= 5. LABELS, INVOICES & MANIFESTS =================

    def get_label_url(self, shipment_id: int) -> Optional[str]:
        """Generates thermal barcoded shipping label PDF."""
        res = self.request("/courier/generate/label", method="POST", body={"shipment_id": [int(shipment_id)]})
        return res.get("label_url")

    def get_invoice_url(self, shiprocket_order_id: int) -> Optional[str]:
        """Generates GST Commercial Tax Invoice PDF."""
        res = self.request("/orders/print/invoice", method="POST", body={"ids": [int(shiprocket_order_id)]})
        return res.get("invoice_url")

    def get_manifest_url(self, shipment_id: int) -> Optional[str]:
        """Generates courier handover manifest PDF."""
        res = self.request("/manifests/generate", method="POST", body={"shipment_id": [int(shipment_id)]})
        return res.get("manifest_url")

    # ================= 6. TRACKING & CANCELLATION =================

    def track_awb(self, awb_code: str) -> Dict[str, Any]:
        """Tracks parcel status in real time via AWB code."""
        return self.request(f"/courier/track/awb/{awb_code.strip()}", method="GET")

    def cancel_order(self, shiprocket_order_id: int) -> Dict[str, Any]:
        """Cancels an un-dispatched order in Shiprocket."""
        return self.request("/orders/cancel", method="POST", body={"ids": [int(shiprocket_order_id)]})

    # ================= 7. END-TO-END AUTOMATED FULFILLMENT =================

    def fulfill_store_order(self, order: Dict[str, Any]) -> Dict[str, Any]:
        """
        Orchestrates full automated dispatch for a store order:
        1. Formats adhoc payload with metric units & product dimensions
        2. Creates order in Shiprocket
        3. Queries best available courier
        4. Assigns AWB & schedules warehouse pickup
        5. Generates thermal label & invoice URLs
        """
        order_db_id = str(order.get("id") or order.get("_id") or f"ORD-{int(time.time())}")
        customer_name = order.get("customer_name") or order.get("customerName") or "Valued Devotee"
        name_parts = customer_name.strip().split(" ", 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""

        phone = str(order.get("phone") or "9999999999").replace("+91", "").replace(" ", "").replace("-", "").strip()
        email = str(order.get("email") or "orders@astrosavvysingh.com").strip()
        address = str(order.get("address") or "India").strip()
        city = str(order.get("city") or "New Delhi").strip()
        state = str(order.get("state") or "Delhi").strip()
        pincode = str(order.get("pincode") or "110001").strip()

        # Product details & dimensions
        prod_name = order.get("product_name") or order.get("productName") or "Sacred Puja Offering"
        category = str(order.get("product_category") or order.get("category") or "potli").lower()
        price = float(order.get("product_price") or order.get("price") or 1100.0)

        # Intelligent metric dimensions and HSN based on sacred product category
        if "rudraksha" in category:
            hsn = "711790"
            sku = "RUD-" + "".join([c for c in prod_name if c.isalnum()][:8]).upper()
            length, breadth, height, weight = 15.0, 10.0, 5.0, 0.25 # 250 grams
        elif "bracelet" in category:
            hsn = "711790"
            sku = "BRAC-" + "".join([c for c in prod_name if c.isalnum()][:8]).upper()
            length, breadth, height, weight = 16.0, 12.0, 6.0, 0.30 # 300 grams
        else: # potli or puja boxes
            hsn = "62149090"
            sku = "POTLI-" + "".join([c for c in prod_name if c.isalnum()][:8]).upper()
            length, breadth, height, weight = 24.0, 18.0, 8.0, 0.50 # 500 grams

        # Current timestamp in IST
        ist_now = datetime.now(timezone(timedelta(hours=5, minutes=30))).strftime("%Y-%m-%d %H:%M")
        customer_order_ref = f"ASV-{order_db_id[:8].upper()}"

        adhoc_payload = {
            "order_id": customer_order_ref,
            "order_date": ist_now,
            "pickup_location": self.pickup_location,
            "channel_id": "",
            "comment": "Sacred Devotional Puja Shipment",
            "billing_customer_name": first_name,
            "billing_last_name": last_name,
            "billing_address": address,
            "billing_address_2": "",
            "billing_city": city,
            "billing_pincode": pincode,
            "billing_state": state,
            "billing_country": "India",
            "billing_email": email,
            "billing_phone": phone,
            "shipping_is_billing": True,
            "order_items": [
                {
                    "name": prod_name,
                    "sku": sku,
                    "units": 1,
                    "selling_price": price,
                    "discount": 0,
                    "tax": 0,
                    "hsn": hsn
                }
            ],
            "payment_method": "COD" if (str(order.get("payment_status", "")).lower() == "cod" or str(order.get("payment_method", "")).lower() == "cod") else "Prepaid",
            "shipping_charges": 0.0,
            "giftwrap_charges": 0.0,
            "transaction_charges": 0.0,
            "total_discount": 0.0,
            "sub_total": price,
            "length": length,
            "breadth": breadth,
            "height": height,
            "weight": weight
        }

        # 1. Create order
        order_res = self.create_adhoc_order(adhoc_payload)
        sr_order_id = order_res.get("order_id")
        shipment_id = order_res.get("shipment_id")

        if not shipment_id:
            raise RuntimeError(f"Shiprocket order created but missing shipment_id: {order_res}")

        # 2. Check serviceability & select courier
        couriers = self.get_serviceability(
            delivery_pincode=pincode,
            weight_kg=weight,
            length_cm=length,
            breadth_cm=breadth,
            height_cm=height
        )

        assigned_awb = None
        courier_name = None
        if couriers:
            # Pick courier with top rating / lowest rate
            best_courier = sorted(couriers, key=lambda c: (float(c.get("rate", 9999)), -float(c.get("rating", 0))))[0]
            courier_id = best_courier.get("courier_company_id")
            courier_name = best_courier.get("courier_name")

            # 3. Assign AWB
            awb_res = self.assign_awb(shipment_id, courier_id)
            assigned_awb = (
                awb_res.get("response", {}).get("data", {}).get("awb_code") or
                awb_res.get("awb_code")
            )

        # 4. Schedule pickup (next day)
        next_day = (datetime.now(timezone(timedelta(hours=5, minutes=30))) + timedelta(days=1)).strftime("%Y-%m-%d")
        try:
            self.schedule_pickup(shipment_id, pickup_date_iso=next_day)
        except Exception as pk_err:
            log_warning(f"[Shiprocket] Pickup scheduling notice: {pk_err}")

        # 5. Generate Label & Invoice URLs
        label_url = None
        invoice_url = None
        try:
            label_url = self.get_label_url(shipment_id)
        except Exception as lbl_err:
            log_warning(f"[Shiprocket] Label URL generation notice: {lbl_err}")

        try:
            if sr_order_id:
                invoice_url = self.get_invoice_url(sr_order_id)
        except Exception as inv_err:
            log_warning(f"[Shiprocket] Invoice URL generation notice: {inv_err}")

        return {
            "success": True,
            "order_id": customer_order_ref,
            "shiprocket_order_id": str(sr_order_id) if sr_order_id else None,
            "shipment_id": str(shipment_id),
            "awb_code": assigned_awb,
            "courier_name": courier_name,
            "label_url": label_url,
            "invoice_url": invoice_url,
            "status": "shipped"
        }
