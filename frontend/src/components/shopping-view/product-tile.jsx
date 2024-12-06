import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-xl">
      <div onClick={()=>handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-white hover:bg-gray-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock <= 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {product?.totalStock} left
            </Badge>
          ) : null}
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4 ">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
       
      </div>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => handleAddToCart(product?._id, product?.totalStock)}
          className="w-full"
          disabled={product?.totalStock === 0}
        >
          {product?.totalStock === 0 ? "Out Of Stock" : "Add To Card"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
