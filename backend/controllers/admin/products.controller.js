import Product from "../../models/product.model.js";
import { ImageUploadUtil } from "../../config/cloudinary.js";
import cloudinary from "cloudinary";

const handleImageUpload = async (req, res) => {
  try {
    // check if the image file is provided
    if (!req.file) {
      throw new Error("No image file provided");
    }
    // convert the image file to base64 string
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // create the data url for the image
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    // call the image upload utility function to upload the image to cloudinary
    const result = await ImageUploadUtil(url);
    // send the response back to the client
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(
      "error in handle image upload admin products controller:",
      error
    );
    res.status(500).json({ message: error.message, success: false });
  }
};

//add product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    res.status(201).json({
      message: `New product ${title} created successfully`,
      success: true,
    });
  } catch (error) {
    console.log("error in add product admin products controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// fetch all product
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find();

    res.status(200).json({
      message: "All products fetched successfully",
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log("error in fetch all product admin products controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findedProduct = await Product.findById(id);
    if (!findedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    findedProduct.title = title || findedProduct.title;
    findedProduct.description = description || findedProduct.description;
    findedProduct.category = category || findedProduct.category;
    findedProduct.brand = brand || findedProduct.brand;
    findedProduct.price = price === "" ? 0 : price || findedProduct.price;
    findedProduct.salePrice =
      salePrice == "" ? 0 : salePrice || findedProduct.salePrice;
    findedProduct.totalStock = totalStock || findedProduct.totalStock;
    findedProduct.image = image || findedProduct.image;

    await findedProduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in edit product admin products controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    // delete image from cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in delete product admin products controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
