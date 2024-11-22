import cartModel from "../../models/cart.model.js";
import productModel from "../../models/product.model.js";
const addToCart = async (req, res) => {
  // console.log("add to cart controller getting inputs", req.body);

  try {
    const { userId, productId, quantity } = req.body;
    // Validate inputs
    if (!userId || !productId || quantity <= 0) {
      console.log("Invalid data provided in add to cart controller");
      return res.status(400).json({ message: "Invalid data provided" });
    } else {
      console.log(
        userId,
        typeof userId,
        productId,
        typeof productId,
        quantity,
        typeof quantity
      );
    }

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      console.log("Product not found in add to cart controller");
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create a cart for the user
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({
        userId,
        items: [],
      });
    }

    // Check if the product is already in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      // Add new product to the cart
      cart.items.push({ productId, quantity });
    } else {
      // Update quantity of existing product
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // Save the cart
    await cart.save();

    res.status(200).json({
      message: "Product Added To Cart Successfully",
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error in add to cart controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const fetchCartItems = async (req, res) => {
  //console.log("fetch cart item controller getting inputs", req.params);

  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "user id is required" });
    } else {
      console.log(
        "fetch cart item controller getting inputs",
        userId,
        typeof userId
      );
    }

    const cart = await cartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      console.log("cart not found in fetch cart items controller");
      return res.status(404).json({ message: "cart not found" });
    }

    const validItems = cart.items.filter((producItem) => producItem.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "cart items fetched successfully",
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in fetch cart items controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateCartItems = async (req, res) => {
  // console.log(`update cart item controller getting inputs`, req.body);

  try {
    const { userId, productId, quantity } = req.body;

    //input validation
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ message: "invalid data provided" });
    } else {
      console.log(
        "update cart item controller getting inputs",
        userId,
        typeof userId,
        productId,
        typeof productId,
        quantity,
        typeof quantity
      );
    }

    const cart = await cartModel.findOne({ userId });

    // check if cart exists
    if (!cart) {
      console.log("cart not found in update cart items controller");
      return res.status(404).json({ message: "cart not found" });
    }

    //check if product exists in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    //check if product exists
    if (findCurrentProductIndex === -1) {
      console.log("product not found in cart in update cart items controller");
      return res.status(404).json({ message: "product not found in cart" });
    }


    //update quantity
    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();


    //populate
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    //  check if product exists
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart items Updated Successfully",
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in update cart items controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    // console.log("delete cart item controller getting inputs",req.params);

    const { userId, productId } = req.params;

    if (!userId || !productId) {
      console.log("invalid data provided in delete cart items controller");
      return res.status(400).json({ message: "invalid data provided" });
    } else {
      console.log(
        "delete cart item controller getting inputs",
        userId,
        typeof userId,
        productId,
        typeof productId
      );
    }

    const cart = await cartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      console.log("cart not found in delete cart items controller");
      return res.status(404).json({ message: "cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart Item Removed Successfully",
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error in delete cart items controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};
export { addToCart, deleteCartItems, updateCartItems, fetchCartItems };
