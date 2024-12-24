import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// Component for handling product image uploads with drag-and-drop, file input, and Cloudinary upload functionality
const ProductImageUpload = ({
  imageFile,              // holds the file selected for upload
  setImageFile,           // function to update the imageFile state
  uploadedImageUrl,       // URL of the uploaded image to display after upload
  setUploadedImageUrl,    // function to update the uploadedImageUrl
  setImageLoadingState,   // function to toggle loading spinner during image upload
  imageLoadingState,      // boolean indicating if the image is being uploaded
  isEditMode              // flag to disable input when editing an existing product
}) => {
  const inputRef = useRef(null); // reference for the file input to clear it when needed

  // Handles file selection through file input and sets imageFile state with the selected file
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  // Prevents default behavior and allows copy effect when dragging over the drop area
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  // Handles file drop on the drop area and sets the dropped file to imageFile
  function handleDrop(event) {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  // Removes the selected image, resets imageFile and clears the file input value
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // Uploads the image to Cloudinary, updating the loading state and URL upon success
  async function uploadImageToCloudinary() {
    setImageLoadingState(true); // Start loading spinner
    const data = new FormData();
    data.append("my_image", imageFile); // Append the image file to form data
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/upload-image`, // API endpoint for image upload
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url); // Set URL of uploaded image
      setImageLoadingState(false); // Stop loading spinner
    }
  }

  // Automatically triggers the upload to Cloudinary when a new imageFile is selected
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-m mx-auto mt-4">
      <Label className="w-full max-w-m mx-auto ">Upload Image</Label>
      <div
        onDragOver={handleDragOver} // Handles drag-over event for drop area
        onDrop={handleDrop}         // Handles drop event for file drop
        className={`${
          isEditMode ? "pointer-events-none opacity-50" : "" // Disable input in edit mode
        }border-2 border-dashed rounded-lg p-4 mt-3`}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef} // Reference to clear input field
          name="my_image"
          onChange={handleImageFileChange} // Handles file selection
          className="hidden"
          disabled={isEditMode} // Disable input when in edit mode
        />
        {/* Display different UI states based on the imageFile and imageLoadingState */}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="cursor-pointer flex  flex-col justify-center items-center w-full h-32 border-2 border-dashed rounded-lg"
          >
            <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Click To Upload Image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 w-45 bg-gray-100 text-muted-foreground" />
        ) : (
          <div className=" flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="h-10 w-10 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon "
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage} // Removes the selected image
              >
                <XIcon className="w-4 h-4 ml-2" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
