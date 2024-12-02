import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-200 ease-in-out ${
        selectedId?._id === addressInfo?._id
          ? "bg-gray-200 border-red-900 border-[4px]"
          : "bg-white border-black"
      } hover:bg-gray-100 hover:shadow-md hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50`}
    
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;


