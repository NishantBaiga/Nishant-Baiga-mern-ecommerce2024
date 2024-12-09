import orderModel from "../../models/orders.model.js";
import paypal from "../../config/paypal.js";
import cartModel from "../../models/cart.model.js";
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    if (!cartItems) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    if (!addressInfo) {
      return res.status(400).json({ message: "Address info is required" });
    }

    if (!orderStatus) {
      return res.status(400).json({ message: "Order status is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    if (!paymentStatus) {
      return res.status(400).json({ message: "Payment status is required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
    }

    if (!orderDate) {
      return res.status(400).json({ message: "Order date is required" });
    }

    if (!orderUpdateDate) {
      return res.status(400).json({ message: "Order update date is required" });
    }

    if (!paymentId) {
      return res.status(400).json({ message: "Payment ID is required" });
    }

    if (!payerId) {
      return res.status(400).json({ message: "Payer ID is required" });
    }

    /**
     * Generates a PayPal payment object for the transaction.
     *
     * The object includes the intent of the payment, payer details, redirect URLs,
     * and transaction details such as item list, amount, and description.
     *
     * @returns The PayPal payment object.
     */
    const create_payment_json = () => {
      return {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3000/shop/paypal-return",
          cancel_url: "http://localhost:3000/shop/paypal-cancel",
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: item.price,
                currency: "USD",
                quantity: item.quantity,
              })),
            },
            amount: { currency: "USD", total: totalAmount.toFixed(2) },
            description: "Order Payment",
          },
        ],
      };
    };

    // Create the PayPal payment
    paypal.payment.create(create_payment_json(), async (error, paymentInfo) => {
      if (error) {
        console.error("error in add address controller:", error);
        return res.status(500).json({ success: false, message: error.message });
      } else {
        const newlyCreatedOrder = new orderModel({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalLink = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          message: "New order created successfully",
          success: true,
          approvalLink,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    if (!paymentId || !payerId || !orderId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await productModel.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({
            success: false,
            message: `Not Enough Stock ${product.title}`,
          });
      }

      product.totalstock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;

    const cart = await cartModel.findByIdAndDelete(getCartId);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    await order.save();

    res.status(200).json({
      message: "Payment captured successfully",
      success: true,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }
    const orders = await orderModel.find({ userId });
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found" });
    }
    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Order id is required" });
    }
    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      message: "Order details fetched successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
