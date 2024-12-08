import React, { useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "@/components/common/form";


const initialformData = {
  status: "",
}
const AdminOrderDetailsView = () => {

const [formData,setFormData]= useState(initialformData);

function handleUpdateStatus(e){
  e.preventDefault();
  console.log(formData);
}

  return (
    <div className="sm:max-w-[600px]">
      <div className="grid  gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Id</p>
            <Label>#123</Label>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Date</p>
            <Label>#123</Label>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Status</p>
            <Label>#123</Label>
          </div>
          <div className="flex items-center justify-between mt-4 ">
            <p className="font-medium">Order Price</p>
            <Label>#123</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-4 ">
              <h1 className="text-lg font-bold">Order Details</h1>
            </div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>product name</span>
                <span>price</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="">shipping address</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>name</span>
              <span>address</span>
              <span>pincode</span>
              <span>phone</span>
              <span>city</span>
              <span>notes</span>

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
