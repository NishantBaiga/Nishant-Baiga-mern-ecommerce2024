import addressModel from "../../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId , address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newAddress = new addressModel({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({
      message: "New address created successfully",
      success: true,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    console.log("req.body", req.body);
    res.status(500).json({ message: error.message, success: false });
  }
};

const fetchallAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User id is required", success: false });
    }

    const addresses = await addressModel.find({ userId });

    res.status(200).json({
      message: "All addresses fetched successfully",
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({
          message: "User id and address id is required",
          success: false,
        });
    }

    const addressToUpdate = await addressModel.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!addressToUpdate) {
      return res
        .status(404)
        .json({ message: "Address not found", success: false });
    }

    res.status(200).json({
      message: "Address updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("error in edit address controller:", error);
    console.log("req.body", req.body);
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({
          message: "User id and address id is required",
          success: false,
        });
    }

    const addressToDelete = await addressModel.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!addressToDelete) {
      return res
        .status(404)
        .json({ message: "Address not found", success: false });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("error in add address controller:", error);
    console.log("req.body", req.body);
    res.status(500).json({ message: error.message, success: false });
  }
};

export { addAddress, editAddress, fetchallAddress, deleteAddress };
