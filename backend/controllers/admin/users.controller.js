
import User from "../../models/user.model.js";

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}).exec();
      res.status(200).json({ users });
    } catch (error) {
      console.log("error in get all users controller:", error.message);
      res.status(500).json({ message: error.message, success: false });
    }
  };

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "User id is required" });
      }

      const user = await User.findByIdAndDelete(id).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("error in delete user controller:", error.message);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  export { getAllUsers, deleteUser };
