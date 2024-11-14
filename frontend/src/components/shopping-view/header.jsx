import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "@/store/authSlice";

// Menu Items
function MenuItems() {
  return (
    <nav className="flex flex-col mt-5 mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row   ">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          className="text-sm font-medium text-muted-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}



// Header Right Content
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);// Get user data from the Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle logout
  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* user cart */}
      <Button variant="outline" size="icon" className="mt-3">
        <ShoppingCart className="h-6 w-6 bg-white text-black " />
        <span className="sr-only">user cart</span>
      </Button>
      {/* user profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mt-3">
          <Avatar>
            <AvatarFallback className="bg-black text-white font-extrabold border border-white ">
              {user?.userName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* dropdown menu */}
        <DropdownMenuContent side="right" className="w-56 bg-white shadow-lg">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* account */}
          <DropdownMenuItem onClick={() => navigate("account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* logout */}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full  border-b bg-background">
      <div className="flex h-16 item-center  justify-between px-4 md:px-6 ">
        {/* logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          {/* menu button for mobile */}
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden h-8 w-8 my-auto"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          {/* menu for mobile */}
          <SheetContent side="right" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>


          {/* menu for desktop */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          
          {/* header right content for desktop */}
            <div className="hidden lg:block">
              <HeaderRightContent />
            </div>
          
        </Sheet>
      </div>
    </header>
  );
};

export default ShoppingHeader;
