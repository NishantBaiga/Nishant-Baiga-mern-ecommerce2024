import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

//auth middleware
const protectedRoute = async (req, res, next) => {
    try {
      // console.log(req.cookies, "cookies in auth middleware");
      const token = req.cookies.accessToken;
      // console.log(token, "token in auth middleware");
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized - no access token provided",
          success: false,
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded, "decoded in auth middleware");
  
      const user = await User.findById(decoded._id).select("-password").exec();
      // console.log(user, "user in auth middleware");
  
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token", success: false });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log("error in auth middleware:", error.message);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(401).json({ message: error.message, success: false });
    }
  };
  const adminRoute = async (req, res, next) => {
    try {
      if (req.user && req.user.role === "admin") {
        next();
      } else {
        res
          .status(403)
          .json({ message: "Forbidden - Admin access required", success: false });
      }
    } catch (error) {
      console.log("error in admin route middleware:", error.message);
      res.status(500).json({ message: error.message, success: false });
    }
  };


  export { protectedRoute, adminRoute };