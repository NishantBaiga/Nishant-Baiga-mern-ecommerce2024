import React, { useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "@/components/common/form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialformData = {
  status: "",
};
const AdminOrderDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialformData);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialformData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <div className="sm:max-w-[600px]">
      <div className="grid  gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label>
            <Badge
              className={`py-1 px-3 capitalize ${
                orderDetails?.orderStatus === "confirm"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black text-white"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </Label>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-4 ">
              <h1 className="text-lg font-bold capitalize">Order Details</h1>
            </div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails?.cartItems.map((item) => (
                  <li className="flex items-center justify-between" key={item._id}>
                    <span className="capitalize">Product: {item.title}</span>
                    <span className="capitalize">Quantity: {item.quantity}</span>
                    <span className="capitalize">Price: ${item.price}</span>
                  </li>
                ))
              ) : (
                <li className="text-center">No Items in this order</li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="text-lg font-bold capitalize">shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span className=" capitalize">{user?.userName}</span>
              <span className="capitalize">
                {orderDetails?.addressInfo?.address}
              </span>
              <span className="capitalize">
                {orderDetails?.addressInfo?.city}
              </span>
              <span className="capitalize">
                {orderDetails?.addressInfo?.pincode}
              </span>
              <span className="capitalize">
                {orderDetails?.addressInfo?.phone}
              </span>
              <span className="capitalize">
                {orderDetails?.addressInfo?.notes}
              </span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsView;
