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
  const [orderListSorted, setOrderListSorted] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (orderList) {
      const sortedOrderList = [...orderList].sort((a, b) =>
        sortType === "asc"
          ? new Date(a.orderDate) - new Date(b.orderDate)
          : new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrderListSorted(sortedOrderList);
    }
  }, [orderList, sortType]);

  const handleFecthOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  const handleSortOrders = (e) => {
    setSortType(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
        <CardDescription>Manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4 ">
          <select
            className="bg-transparent border-none outline-none capitalize text-sm font-semibold"
            onChange={handleSortOrders}
            value={sortType}
          >
            <option value="asc">Sort By Date Ascending</option>
            <option value="desc">Sort By Date Descending</option>
          </select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Time</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderListSorted && orderListSorted.length > 0 ? (
              orderListSorted.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(order?.orderDate))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 transition-colors hover:bg-opacity-80 capitalize ${
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
                        <ShopOrderDetails orderDetails={orderDetails} />
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

