import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetails = ({ open, setOpen, ProductDetails }) => {
  console.log(ProductDetails, "ProductDetails");
  // console.log(open, "open");
  // console.log(setOpen, "setOpen");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  ${ProductDetails?.salePrice}{" "}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-0.5">
          <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <span className="text-sm text-muted-foreground">(4.5)</span>
          </div>

          <div className="mt-5 mb-5">
            <Button variant="outline" className="w-full">
              Add To Cart
            </Button>
          </div>
          <Separator className="my-4 bg-black" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-8 h-8 bg-gray-300 border border-black">
                  <AvatarFallback className="text-sm">SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">John Doe</h3>
                  </div>
                  <div className="flex item-center gap-0.5">
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
                <Input type="text" placeholder="Add a review" />
                <Button>Submit</Button> 
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
