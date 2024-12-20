import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/features-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [deleteLoadingState, setDeleteLoadingState] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(id) {
    setCurrentDeleteId(id);
  }

  function handleConfirmDeleteFeatureImage() {
    setDeleteLoadingState(true);
    dispatch(deleteFeatureImage(currentDeleteId)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
        dispatch(getFeatureImages());
      }
      setDeleteLoadingState(false);
      setCurrentDeleteId(null);
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-10">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Dialog
                  open={currentDeleteId === featureImgItem._id}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) setCurrentDeleteId(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                      className="w-full mt-2"
                      disabled={deleteLoadingState}
                      variant="outline"
                    >
                      {deleteLoadingState ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[400px] bg-white p-5 rounded-lg">
                    <DialogTitle>Confirm Delete Feature Image</DialogTitle>
                    <div className="mt-4">
                      Are you sure you want to delete this feature image?
                    </div>
                    <div className="mt-5 text-right">
                      <Button
                        onClick={() => setCurrentDeleteId(null)}
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleConfirmDeleteFeatureImage}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
