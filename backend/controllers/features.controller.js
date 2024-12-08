import featuresModel from "../models/features.model.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new featuresModel({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await featuresModel.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Image id is required",
      });
    }
    const image = await featuresModel.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image with the given id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export { addFeatureImage, getFeatureImages, deleteFeatureImage };
