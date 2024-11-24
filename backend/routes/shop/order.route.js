import { createOrder } from "../../controllers/shop/order.controller.js";
import express from "express";

const router = express.Router();


router.post("/create", createOrder);

export default router;