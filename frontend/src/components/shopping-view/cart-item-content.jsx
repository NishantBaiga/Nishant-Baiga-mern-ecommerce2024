import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center mt-2   gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            ).toFixed(2)}
          </p>

          <Trash2
            onClick={() => handleCartItemDelete(cartItem)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCartItemContent;
