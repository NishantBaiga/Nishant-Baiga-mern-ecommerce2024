import express from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";
import { adminRoute, protectedRoute } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/get", protectedRoute,adminRoute, getAllOrdersOfAllUsers);
router.get("/details/:id",   getOrderDetailsForAdmin);
router.put("/update/:id",  updateOrderStatus);

export default router;
