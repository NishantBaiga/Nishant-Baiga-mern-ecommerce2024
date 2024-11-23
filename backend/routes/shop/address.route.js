import express from "express";
import { addAddress, editAddress, fetchallAddress, deleteAddress } from "../../controllers/shop/address.controller.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchallAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router;
