import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ShopOrderDetails from "./orderdetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);


  function handleFecthOrderDetails(orderId) {
    dispatch(getOrderDetails(orderId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);
  // console.log(orderList, "orderList");
  // console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
        <CardDescription>Manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 transition-colors hover:bg-opacity-80 ${
                        order?.orderStatus === "confirm"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : order?.orderStatus === "rejected"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-black text-white hover:bg-black/90"
                      }`}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                      className="fixed inset-0 z-[100]"
                    >
                      <DialogContent className="m-auto max-w-[480px] w-full bg-white ">
                        {/* <ShopOrderdetails views /> */}
                        <DialogTitle className="sr-only">
                          Order Details
                        </DialogTitle>
                        <ShopOrderDetails  orderDetails={orderDetails} />
                      </DialogContent>

                      {/* <ShopOrderdetails views button /> */}
                      <DialogTrigger
                        asChild
                        onClick={() => handleFecthOrderDetails(order?._id)}
                      >
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1 className="text-center font-bold text-3xl">
                No orders found
              </h1>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
