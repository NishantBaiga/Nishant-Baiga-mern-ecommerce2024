import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShopOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="sm:max-w-[600px]">
      <div className="grid  gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Id</p>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <Label>{orderDetails?._id}</Label>
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate}</Label>
          </div>
          
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 transition-colors hover:bg-opacity-80 ${
                  orderDetails?.orderStatus === "confirm"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
      
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-4 ">
              <h1 className="text-lg font-bold capitalize">Order Details</h1>
            </div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="capitalize text-lg font-bold">shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
