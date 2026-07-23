import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";

import {
  createKundli,
  createPaidKundli,
  getPaidKundlis,
} from "../controllers/kundliController.js";

const router = express.Router();

// --- PUBLIC / USER ROUTES ---
router.post("/", createKundli);


// --- ADMIN ROUTES ---
/* RESTRICTED: Super Admin Only
   Blog admins should not have access to paid Kundli records.
*/
router.get("/paid", protectAdmin(["super-admin"]), getPaidKundlis);

export default router;