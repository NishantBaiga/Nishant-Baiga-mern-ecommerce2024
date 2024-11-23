import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/configDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// using cors connect backend with frontend
app.use(cors({
    origin: ["http://localhost:5173"],//frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "cache-control","expires","pragma","x-xsrf-token","x-requested-with"],
    credentials: true
}));


//importing routes
import authRoute from "./routes/auth.route.js";
//using routes
app.use("/api/auth", authRoute);

//importing admin routes
import adminProductsRouter from "./routes/admin/products.route.js";
//admin routes
app.use("/api/admin/products", adminProductsRouter)

import shopProductsRouter from "./routes/shop/products.route.js";
//shop routes   
app.use("/api/shop/products", shopProductsRouter);

import shopCartRouter from "./routes/shop/cart.route.js";
//shop routes   
app.use("/api/shop/cart", shopCartRouter);

import shopAddressRouter from "./routes/shop/address.route.js";
//shop routes   
app.use("/api/shop/address", shopAddressRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});
