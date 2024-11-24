import CommonForm from "@/components/common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./addressCard";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address = ({setCurrentSelectedAddress}) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currenteditedId, setCurrenteditedId] = useState(null);
  const{toast}= useToast();
  function handleManageAddress(e) {
    e.preventDefault();

    if(addressList.length >= 2 && currenteditedId === null){  
      toast({
        title: "You can add only 2 addresses",
        variant: "destructive",
       })
      return;
    }

    currenteditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currenteditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddresses(user?.id));
            setFormData(initialFormData);
            setCurrenteditedId(null);
            toast({
              title: data?.payload?.message,
              className: "bg-white text-black",
            })
          }
          console.log(data, "edit address response");
        })
      :
    dispatch(addAddress({ ...formData, userId: user?.id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        })
      }
      console.log(data, "add address response");
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        toast({
          title: data?.payload?.message,
          className: "bg-white text-black",
        })
      }
      console.log(data, "delete address response");
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrenteditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAddresses(user?.id));
  }, []);

  // console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                //   selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currenteditedId !==null ? "Edit Address" : "Add Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currenteditedId !== null ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
