import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getAllUsers, deleteUser } from "@/store/admin/users-slice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AllUsersList = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.adminUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers =
    userList && userList.users
      ? userList.users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowConfirmationDialog(true);
  };

  const handleConfirmDeleteUser = () => {
    dispatch(deleteUser(userToDelete._id));
    dispatch(getAllUsers());
    setShowConfirmationDialog(false);
  };

  return (
    <>
      <Input
        className="mb-4"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">All Users</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Manage All the Users
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">User Id</TableHead>
                <TableHead className="text-xs sm:text-sm">User Name</TableHead>
                <TableHead className="text-xs sm:text-sm">User Email</TableHead>
                <TableHead className="text-xs sm:text-sm">Role</TableHead>
                <TableHead className="text-xs sm:text-sm">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-xs sm:text-sm">
                      {user._id}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <Badge
                        className={`${
                          user.role === "admin"
                            ? "bg-green-500"
                            : "bg-blue-200"
                        } text-xs sm:text-sm`}
                        style={{ pointerEvents: "none" }}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogTitle>{user.name}</DialogTitle>
                          <p className="text-sm font-medium text-muted-foreground">
                            User Id: {user._id}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground">
                            Email: {user.email}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground">
                            Role: {user.role}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground break-all">
                            Password: {user.password}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground">
                            Date Created: {user.createdAt}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => handleDeleteUser(user)}
                          >
                            Delete User
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <h1 className="text-center font-bold text-sm sm:text-lg">
                  No users found
                </h1>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
      >
        <DialogContent className="bg-white">
          <DialogTitle>Confirm Delete User</DialogTitle>
          <p className="text-sm font-medium text-muted-foreground">
            Are you sure you want to delete user {userToDelete ? userToDelete.name : " "}?
          </p>
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setShowConfirmationDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={handleConfirmDeleteUser}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllUsersList;

