import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/configDb.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// using cors connect backend with frontend
app.use(
  cors({
    origin: ["http://localhost:5173"], //frontend url
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

//importing routes

// auth route
import authRoute from "./routes/auth.route.js";
app.use("/api/auth", authRoute);

// admin routes
import adminProductsRouter from "./routes/admin/products.route.js";
import adminOrderRouter from "./routes/admin/order.route.js";
import adminUsersRouter from "./routes/admin/users.route.js";
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/users", adminUsersRouter);

// shop routes
import shopProductsRouter from "./routes/shop/products.route.js";
app.use("/api/shop/products", shopProductsRouter);

import shopCartRouter from "./routes/shop/cart.route.js";
app.use("/api/shop/cart", shopCartRouter);

import shopAddressRouter from "./routes/shop/address.route.js";
app.use("/api/shop/address", shopAddressRouter);

import shopOrderRouter from "./routes/shop/order.route.js";
app.use("/api/shop/order", shopOrderRouter);

import shopSearchRouter from "./routes/shop/search.route.js";
app.use("/api/shop/search", shopSearchRouter);

import shopReviewRouter from "./routes/shop/review.route.js";
app.use("/api/shop/review", shopReviewRouter);

// common routes
import featureRouter from "./routes/features.route.js";
app.use("/api/common/feature", featureRouter);

app.listen( process.env.PORT, () => {
  connectDB();
  console.log(`server is running on port ${process.env.PORT}`);
});
