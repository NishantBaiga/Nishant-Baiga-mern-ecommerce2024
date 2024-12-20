import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addProductReview, getProductReviews } from "@/store/shop/review-slice";

const ProductDetails = ({ open, setOpen, ProductDetails }) => {
  //console.log(ProductDetails, "ProductDetails");
  // console.log(open, "open");
  // console.log(setOpen, "setOpen");
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { reviewList } = useSelector((state) => state.shopReview);
  const { cartItems } = useSelector((state) => state.shopCart);

  console.log(reviewList, "reviewList");

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    //console.log(getCurrentProductId, "getCurrentProductId");

    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: "Only 5 items can be added for this product",
            className: "bg-red-500 text-white",
            duration: 2000,
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
      }
    });
  }

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: ProductDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getProductReviews(ProductDetails?._id));
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
        setReviewMsg("");
        setRating(0);
      } else if (
        data?.payload?.error === "You already reviewed this product!"
      ) {
        toast({
          title: "You already reviewed this product.",
          className: "bg-red-500 text-white",
          duration: 3000,
        });
      } else if (data?.payload?.error) {
        toast({
          title: "Failed to add review. Please try again.",
          className: "bg-red-500 text-white",
          duration: 3000,
        });
      }
    });
  }

  useEffect(() => {
    if (ProductDetails !== null)
      dispatch(getProductReviews(ProductDetails?._id));
  }, [ProductDetails]);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  const averageReview =
    reviewList && reviewList.length > 0
      ? reviewList.reduce(
          (sum, reviewItem) => sum + reviewItem.reviewValue,
          0
        ) / reviewList.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:maw-w-[80vw lg:max-w-[70vw] bg-slate-200 shadow-lg">
        <div className=" relative overflow-hidden  ">
          <img
            src={ProductDetails?.image}
            alt={ProductDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-all hover:scale-105"
          />
        </div>

        <div className="">
          <div>
            <h1 className="text-2xl font-bold text-black capitalize ">
              {ProductDetails?.title}
            </h1>
            <h2 className="text-xl text-black ">{ProductDetails?.category}</h2>
            <p className="text-muted-foreground text-black">
              {ProductDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary text-black ${
                ProductDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${ProductDetails?.price}
            </p>

            <div>
              {ProductDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground ">
                  ${ProductDetails?.salePrice}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <StarRatingComponent rating={averageReview} readonly />
            <span className="text-sm text-muted-foreground">
              {averageReview.toFixed(1)}
            </span>
          </div>

          <div className="mt-5 mb-5">
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                handleAddToCart(ProductDetails?._id, ProductDetails?.totalStock)
              }
              disabled={ProductDetails?.totalStock === 0}
            >
              {ProductDetails?.totalStock === 0
                ? "Out of Stock"
                : "Add To Cart"}
            </Button>
          </div>
          <Separator className="my-4 bg-black" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
            <div className="grid gap-6">
              {reviewList && reviewList?.data?.length > 0 ? (
                reviewList?.data?.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback className="text-black border border-black">
                        {reviewItem?.userName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">
                          {reviewItem?.userName || "Anonymous"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent
                          rating={reviewItem?.reviewValue || 0}
                        />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMessage || "No Review"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
