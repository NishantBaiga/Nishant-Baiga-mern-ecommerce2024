import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/configDb.js";

dotenv.config();
const app = express();
// using cors connect backend with frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "expires",
      "pragma",
      "x-xsrf-token",
      "x-requested-with",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//importing routes
// auth route
import authRoute from "./routes/auth.route.js";
app.use("/api/auth", authRoute);

// importing admin routes
import adminProductsRouter from "./routes/admin/products.route.js";
import adminOrderRouter from "./routes/admin/order.route.js";
import adminUsersRouter from "./routes/admin/users.route.js";

// using admin routes
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/users", adminUsersRouter);

// importing shop routes
import shopProductsRouter from "./routes/shop/products.route.js";
import shopCartRouter from "./routes/shop/cart.route.js";
import shopAddressRouter from "./routes/shop/address.route.js";
import shopOrderRouter from "./routes/shop/order.route.js";
import shopSearchRouter from "./routes/shop/search.route.js";
import shopReviewRouter from "./routes/shop/review.route.js";
import shopManageProfileRouter from "./routes/shop/handleProfile.route.js"; 

// using shop routes
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/profile", shopManageProfileRouter);

// common routes
import featureRouter from "./routes/features.route.js";
app.use("/api/common/feature", featureRouter);

app.listen( process.env.PORT, () => {
  connectDB();
  console.log(`server is running on port ${process.env.PORT}`);
});
