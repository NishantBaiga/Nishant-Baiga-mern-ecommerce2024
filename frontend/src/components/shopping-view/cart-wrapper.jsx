import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContent from "./cart-item-content";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems , setOpenCartSheet }) => {
  //console.log(cartItems, "cartItems:");
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,0
        )
      : 0;

  return (
    <SheetContent className="w-full max-w-xs overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (

            <UserCartItemContent  key={item?._id} cartItem={item}  />
              // <div key={item?._id}>
              //   <UserCartItemContent  key={item?._id} cartItem={item}  />
              //   <Separator className="bg-black mt-2" />
              // </div>
            ))
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span>${totalCartAmount}</span>
        </div>
      </div>
      <Button onClick={() =>{
         navigate("/shop/checkout");
         setOpenCartSheet(false);
      }} className="w-full mt-8">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
