import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accountImage from "../../assets/images/account.jpg";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
import EditProfile from "@/components/shopping-view/edit-profile";
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
    <div className="relative h-[300px] w-full overflow-hidden">
      <img
        src={accountImage}
        className="h-full w-full object-cover object-center"
      />
    </div>
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="editProfile">Edit Profile</TabsTrigger>
          </TabsList>
          {/* shopping orders */}
          <TabsContent value="orders">
            <ShoppingOrders />
          </TabsContent>
          {/* address */}
          <TabsContent value="address">
            <Address />
          </TabsContent>
          {/* edit profile */}
          <TabsContent value="editProfile"> 
            <EditProfile/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
  );
};

export default ShoppingAccount;
