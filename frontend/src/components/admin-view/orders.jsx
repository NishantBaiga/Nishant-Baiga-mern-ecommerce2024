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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersViews = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [orderListSorted, setOrderListSorted] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const [statusFilter, setStatusFilter] = useState(null); // For sub-status filtering
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    if (orderList) {
      let sortedOrderList = [...orderList];
      if (sortType === "asc" || sortType === "desc") {
        sortedOrderList.sort((a, b) =>
          sortType === "asc"
            ? new Date(a.orderDate) - new Date(b.orderDate)
            : new Date(b.orderDate) - new Date(a.orderDate)
        );
      } else if (sortType === "status" && statusFilter) {
        sortedOrderList = sortedOrderList.filter(
          (order) => order.orderStatus.toLowerCase() === statusFilter
        );
      }
      setOrderListSorted(sortedOrderList);
    }
  }, [orderList, sortType, statusFilter]);

  const handleFecthOrderDetails = (orderId) => {
    dispatch(getOrderDetailsForAdmin(orderId));
  };

  const handleSortOrders = (e) => {
    setSortType(e.target.value);
    if (e.target.value !== "status") {
      setStatusFilter(null); // Reset status filter when switching to date sorting
    }
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardDescription>Manage Orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4 space-x-4">
          <select
            className="bg-transparent border-none outline-none capitalize text-sm font-semibold"
            onChange={handleSortOrders}
            value={sortType}
          >
            <option value="asc">Newest</option>
            <option value="desc">Oldest</option>
            <option value="status">Sort by Status</option>
          </select>
          {sortType === "status" && (
            <select
              className="bg-transparent border-none outline-none capitalize text-sm font-semibold"
              onChange={handleStatusFilter}
              value={statusFilter || ""}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in process">In Process</option>
              <option value="in shipping">In Shipping</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
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
                <TableRow key={order?._id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    {new Date(order?.orderDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
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
                      <DialogContent className="m-auto max-w-[480px] w-full bg-white">
                        <DialogTitle className="sr-only">
                          Order Details
                        </DialogTitle>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </DialogContent>
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
              <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl sm:display-inline md:display-block">
                No orders found
              </h1>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersViews;
