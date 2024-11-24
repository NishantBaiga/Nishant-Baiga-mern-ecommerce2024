import paypal from "paypal-rest-sdkv2";
import dotenv from "dotenv";
dotenv.config();

 paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});


export default paypal;