import Address from "@/components/shopping-view/address";
import img from "../../assets/images/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemContent from "@/components/shopping-view/cart-item-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const ShoppingCheckout = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalUrl } = useSelector((state) => state.shopOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const { toast } = useToast();


console.log(approvalUrl, "approvalUrl");

// cart items total amount
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
    // Check if the cart is not empty
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
        duration:2000,
      });

      return;
    }
    // Check if an address is selected
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
        duration:2000,
      });

      return;
    }

    // Check if the user is authenticated
    if (!user?.id) {
      console.error("User ID is missing.");
      return;
    }

    if (!currentSelectedAddress) {
      console.error("Address not selected.");
      return;
    }

    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      console.error("Cart is empty.");
      return;
    }

    // Create a new order
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "PAY123456789",
      payerId: "PAYER123456789",
    };

    console.log(orderData, "orderData nishanttt");

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
      }
    });
  }

  if (approvalUrl) {
    window.location.href = approvalUrl;
  } else {
    console.log("no approval url");
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
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
              onClick={handleInitiatePaypalPayment}
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
