import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// Menu Items
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "shop"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  
  return (
    <nav className="flex flex-col mt-5 mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row   ">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          onClick={() => handleNavigate(item)}
          key={item.id}
          className="text-lg font-medium text-muted-foreground cursor-pointer"
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

// Header Right Content
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth); // Get user data from the Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  // Function to handle logout
  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, []);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* user cart */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="mt-3 h-8 w-8 "
        >
          <ShoppingCart />
          <span className="sr-only">user cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
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
    <header className="sticky top-0 z-40 w-full  border-b bg-background  shadow-md">
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
