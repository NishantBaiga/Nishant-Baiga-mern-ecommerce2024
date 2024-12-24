import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("error in get user profile controller", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.pincode = req.body.pincode || user.pincode;
    const updatedUser = await user.save();
    res
      .status(200)
      .json({
        message: "User profile updated successfully",
        success: true,
        user: updatedUser,
      });
  } catch (error) {
    console.log("error in update user profile controller", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "User id not provided" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(req.body.oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Old password is incorrect", success: false });
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({
        message: "Password updated successfully",
        success: true,
      });
  } catch (error) {
    console.log("error in update password controller", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export { getUserProfile, updateUserProfile, updateUserPassword };

