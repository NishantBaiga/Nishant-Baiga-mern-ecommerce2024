import express from "express";
import { getUserProfile, updateUserPassword, updateUserProfile } from "../../controllers/shop/handeProfile.controller.js";

const router = express.Router();

router.get("/get/:id", getUserProfile);
router.put("/update", updateUserProfile);
router.put("/password", updateUserPassword);

// router.get('/reviews/:id', getUserReviewById);
// router.put('/reviews/:id', updateUserReview);
// router.delete('/reviews/:id', deleteUserReview);

// router.get('/wishlist', getUserWishlist);
// router.put('/wishlist', updateUserWishlist);

// router.get('/notifications', getUserNotifications);
// router.put('/notifications', updateUserNotifications);

export default router;
