import express from "express";
import {
  Login,
  Logout,
  Register,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/check-auth", protectedRoute, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "user authenticated successfully",
    user
  });
});
export default router;
