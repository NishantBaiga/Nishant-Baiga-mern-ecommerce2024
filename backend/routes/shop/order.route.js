import { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails } from "../../controllers/shop/order.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router;