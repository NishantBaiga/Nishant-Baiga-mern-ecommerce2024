import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Handles image upload to cloudinary
 
async function ImageUploadUtil(file) {
    try {
        if (!file) {
            throw new Error("No image file provided");
        }   
        let result = await cloudinary.uploader.upload(file, {
            resource_type: 'auto',
        })
        return result;
    } catch (error) {
        console.error("Error uploading image to cloudinary:", error);
        throw error;
    }
}

// create multer storage
const storage = new multer.memoryStorage();
// create multer middleware
const upload = multer({ storage});

export { upload, ImageUploadUtil };


