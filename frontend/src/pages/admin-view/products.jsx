import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "../../components/admin-view/product-tile";

// Initial form data structure with default values
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  // State to control visibility of product creation/edit dialog
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  // Holds current form data values for adding/editing a product
  const [formData, setFormData] = useState(initialFormData);

  // State to store the image file selected for upload
  const [imageFile, setImageFile] = useState(null);

  // Holds the URL of the uploaded image after successful upload
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Indicates if image is uploading; controls the loading spinner
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Stores the ID of the product currently being edited; null if adding a new product
  const [currentEditedId, setCurrentEditedId] = useState(null);

  // Get product list from Redux store
  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();
  const { toast } = useToast();

  // Function to handle form submission for adding or editing a product
  function onSubmit(event) {
    event.preventDefault();

    if (currentEditedId !== null) {
      // Dispatch edit action if editing an existing product
      dispatch(
        editProduct({
          id: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts()); // Refresh product list after edit
          setFormData(initialFormData); // Reset form data
          setOpenCreateProductsDialog(false); // Close dialog
          setCurrentEditedId(null); // Clear edit ID
        }
      });
    } else {
      // Dispatch add action if adding a new product
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts()); // Refresh product list after adding
          setOpenCreateProductsDialog(false); // Close dialog
          setImageFile(null); // Clear selected image
          setFormData(initialFormData); // Reset form data
          toast({
            title: "Product added successfully",
          });
        }
      });
    }
  }

  // Function to handle product deletion
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh product list after deletion
      }
    });
  }

  // Function to validate form, ensuring all fields (except averageReview) are filled
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  // Fetch all products on initial component load
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log( formData,productList, uploadedImageUrl,);

  return (
    <Fragment>
      {/* Button to open the dialog for adding a new product */}
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Display list of all products in grid format */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData} // Pass function to set form data
                setOpenCreateProductsDialog={setOpenCreateProductsDialog} // Open dialog in edit mode
                setCurrentEditedId={setCurrentEditedId} // Set current edited product ID
                product={productItem} // Product data to display
                handleDelete={handleDelete} // Delete handler
              />
            ))
          : null}
      </div>

      {/* Dialog for creating or editing a product */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false); // Close dialog
          setCurrentEditedId(null); // Reset edited ID
          setFormData(initialFormData); // Reset form data
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/* Product image upload component */}
          <ProductImageUpload
            // Passes the selected image file for upload
            imageFile={imageFile}
            // Allows updating the image file selected for upload
            setImageFile={setImageFile}
            // URL of the uploaded image to be displayed after upload
            uploadedImageUrl={uploadedImageUrl}
            // Allows updating the uploaded image URL after successful upload
            setUploadedImageUrl={setUploadedImageUrl}
            // Controls the loading spinner state during image upload
            setImageLoadingState={setImageLoadingState}
            // Shows the loading spinner while image is being uploaded
            imageLoadingState={imageLoadingState}
            // Determines if the component is in edit mode (based on currentEditedId)
            isEditMode={currentEditedId !== null}
          />

          {/* Form to input product details */}
          <div className="py-6">
            <CommonForm
              // Triggered when form is submitted
              onSubmit={onSubmit}
              // Data of form elements, holding values of each field
              formData={formData}
              // Allows updating form field values
              setFormData={setFormData}
              // Sets button text conditionally based on edit mode
              buttonText={currentEditedId !== null ? "Edit" : "Add New Product"}
              // Configuration of form elements, defining fields and settings
              formControls={addProductFormElements}
              // Disables the submit button if form validation fails
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
