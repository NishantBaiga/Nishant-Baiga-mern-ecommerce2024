import express from "express";
import { getUserProfile, updateUserPassword, updateUserProfile } from "../../controllers/shop/handeProfile.controller.js";
import { protectedRoute } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/get",protectedRoute, getUserProfile);
router.put("/update",protectedRoute, updateUserProfile);
router.put("/password", updateUserPassword);

// router.get('/reviews/:id', getUserReviewById);
// router.put('/reviews/:id', updateUserReview);
// router.delete('/reviews/:id', deleteUserReview);

// router.get('/wishlist', getUserWishlist);
// router.put('/wishlist', updateUserWishlist);

// router.get('/notifications', getUserNotifications);
// router.put('/notifications', updateUserNotifications);

export default router;
