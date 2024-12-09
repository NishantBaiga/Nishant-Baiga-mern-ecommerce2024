import { useState, useEffect } from "react";
import bannerOne from "../../assets/images/banner-1.webp";
import bannerTwo from "../../assets/images/banner-2.webp";
import bannerThree from "../../assets/images/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  BabyIcon,
  CloudLightningIcon,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/features-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "@/components/shopping-view/product-details";
import { use } from "react";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: <ShirtIcon /> },
  { id: "women", label: "Women", icon: <CloudLightningIcon /> },
  { id: "kids", label: "Kids", icon: <BabyIcon /> },
  { id: "accessories", label: "Accessories", icon: <WatchIcon /> },
  { id: "footwear", label: "Footwear", icon: <WatchIcon /> },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: <ShirtIcon /> },
  { id: "adidas", label: "Adidas", icon: <ShirtIcon /> },
  { id: "puma", label: "Puma", icon: <ShirtIcon /> },
  { id: "levi", label: "Levi's", icon: <ShirtIcon /> },
  { id: "zara", label: "Zara", icon: <ShirtIcon /> },
  { id: "h&m", label: "H&M", icon: <ShirtIcon /> },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const navigate = useNavigate();
  const{toast}=useToast();

  const { user } = useSelector((state) => state.auth);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  const prevSlide = () => {
    setIsFadeOut(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === 0 ? featureImageList.length - 1 : prev - 1
      );
      setIsFadeOut(false);
    }, 500);
  };

  const nextSlide = () => {
    setIsFadeOut(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === featureImageList.length - 1 ? 0 : prev + 1
      );
      setIsFadeOut(false);
    }, 500);
  };


  
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }


  useEffect(()=>{
    if(productDetails!==null) setOpenDetailsDialog(true);
  },[productDetails]);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadeOut(true);
      setTimeout(() => {
        setCurrentSlide((prev) =>
          prev === featureImageList.length - 1 ? 0 : prev + 1
        );
        setIsFadeOut(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: {} }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(productList, "productList");
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* home banner */}
      <div className="relative w-full h-[600px] overflow-hidden transition-opacity duration-500">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem, index) => (
              <img
                key={index}
                src={featureImageItem.image}
                alt={featureImageItem.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{
                  opacity: isFadeOut || currentSlide !== index ? 0 : 1,
                  position: currentSlide === index ? 'relative' : 'absolute'
                }}
              />
            ))
          : null}
        <Button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2"
        >
          <ArrowLeftIcon className="rotate-180" />
        </Button>
      </div>

      {/* shop by category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <div key={category.id}>
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(category, "category")
                  }
                  className="cursor-pointer hover:shadow-xl transition-shadow duration-300 hover:scale-105  hover:brightness-95"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <h2 className="text-xl font-bold mb-1">{category.label}</h2>
                    <div className="h-12 w-12 flex items-center justify-center">
                      {category.icon}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* shop by brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="font-bold">{brandItem.label}</span>
                  <div className="h-12 w-12 flex items-center justify-center">
                    {brandItem.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList && productList.length > 0
              ? productList.slice(0, 5).map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        ProductDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;

