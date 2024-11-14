import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black px-12">
        <div className=" flex max-w-md  space-y-6 text-center text-primary">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            welcome to ecommerce shop
          </h1>
        </div>
      </div>
      <div className=" flex flex-1 items-center justify-center bg-red px-4 py-12 sm:px-6 lg:px-8  ">
         <Outlet/>
      </div>
    </div>
  );
};

export default Authlayout;
