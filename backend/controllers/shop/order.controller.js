import orderModel from "../../models/orders.model.js";
import paypal from "../../config/paypal.js";
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
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

    if (
      !userId ||
      !cartItems ||
      !addressInfo ||
      !orderStatus ||
      !paymentMethod ||
      !paymentStatus ||
      !totalAmount ||
      !orderDate ||
      !orderUpdateDate ||
      !paymentId ||
      !payerId
    ) {
      return res.status(400).json({ message: "All fields are required" });
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
          return_url: "http://localhost:3000/shop/success",
          cancel_url: "http://localhost:3000/shop/cancel",
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

    const request = new paypal.payment.create(
      create_payment_json,
      async (error, paymentInfo) => {
        if (error) {
          console.error("error in add address controller:", error);
          return res.status(500).json({ message: error.message });
        } else {
          const newlyCreatedOrder = new orderModel({
            userId,
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
            paymentId: paymentInfo.id,
            payerId: paymentInfo.payer.payer_id,
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
      }
    );
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ message: error.message });
  }
};


const capturePayment = async (req, res) => {
  try {
    
  } catch (error) {
  console.error("error in add address controller:", error);
  
  }
}
export default { createOrder };
