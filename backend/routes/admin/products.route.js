import express from "express";
import {handleImageUpload, fetchAllProduct, addProduct, editProduct, deleteProduct} from "../../controllers/admin/products.controller.js";
import  {upload}  from "../../config/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_image"), handleImageUpload);
router.post("/add",   addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProduct);

export default router;