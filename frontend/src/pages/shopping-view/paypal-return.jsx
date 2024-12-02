import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
const  dispatch = useDispatch();
const location = useLocation();
const params = new URLSearchParams(location.search);
const paymentId = params.get("paymentId");
const payerId = params.get("PayerID");


useEffect(()=>{
if(paymentId && payerId){
  const getCurrentOrderId = JSON.parse(localStorage.getItem("currentOrderId"));
  dispatch(capturePayment({paymentId,payerId,orderId:getCurrentOrderId})).then((data)=>{
    if(data.payload?.success){
      sessionStorage.removeItem("currentOrderId");
      window.location.href="/shop/payment-success"
    }
  });
}

},[paymentId,payerId,dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Paypal Return</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturn;