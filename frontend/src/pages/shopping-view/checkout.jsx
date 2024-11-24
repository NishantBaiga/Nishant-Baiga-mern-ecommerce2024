import Address from "@/components/shopping-view/address";
import img from "../../assets/images/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemContent from "@/components/shopping-view/cart-item-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);



const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        quantity: item.quantity,
        title,
      })),
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>${totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              onClick={() => handleInitiatePaypalPayment}
              variant="outline"
              className="w-full"
            >
              Checkout To Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
