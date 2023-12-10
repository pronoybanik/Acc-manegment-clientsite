import React from "react";
import image from "../../Images/home page image/pexels-pixabay-219794-removebg-preview.png";
import {
  useGetProductsByNameQuery,
  useGetProductsQuery,
} from "../../Features/Products/ProductApi";
import OurProductItem from "../OurProductItem/OurProductItem";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { Link } from "react-router-dom";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type productData = {
  _id: string;
  brand: {
    name: string;
    _id: string;
  };
  price: number;
  category: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
};

type BrandData = {
  _id: string;
  name: string;
  description: string;
  email: string;
  location: string;
  products: {
    brand: {
      name: string;
      id: string;
    };
    _id: string;
    name: string;
    description: string;
    unit: string;
    imageURLs: string[];
    category: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  image: string;
};

const OurProducts = () => {
  const [brandNameData, setBrandNameData] = React.useState("");
  const brandDataInfo = brandNameData.toLowerCase();
  const { data, isLoading, isError, error } = useGetProductsQuery({});
  const { data: productName } = useGetProductsByNameQuery(brandDataInfo);
  const { data: brandData, isLoading: brandIsLoading } = useGetBrandQuery({});

  const getErrorText = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ("data" in error && error.data) {
      // Assuming error.data has a structure like { error: string }
      return error.data.error || "An error occurred";
    } else {
      // Handle other cases or return a default error message
      return "An error occurred";
    }
  };

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  // if (!isLoading && isError) {
  //   content = <Errors>{error?.data?.error}</Errors>;
  // }
  if (!isLoading && isError) {
    content = <Errors>{getErrorText(error)}</Errors>;
  }
  if (!isLoading && !isError && data.data.products.length === 0) {
    content = <Errors>{"There are no product"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    data.status === "success" &&
    data.data.products.length > 0
  ) {
    content =
      brandNameData != ""
        ? productName?.data?.products
            .slice(0, 6)
            .sort((a: productData, b: productData) => b.price - a.price)
            .map((d: productData) => (
              <OurProductItem key={d?._id} data={d}></OurProductItem>
            ))
        : data?.data?.products
            .slice(0, 6)
            .sort((a: productData, b: productData) => b.price - a.price)
            .map((d: productData) => (
              <OurProductItem key={d?._id} data={d}></OurProductItem>
            ));
  }

  return (
    <section className="w-10/12 mx-auto">
      <div className="my-14">
        <div className="lg:text-5xl text-3xl flex items-center justify-center  font-serif">
          Our Products
        </div>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 lg:mt-4 mt-2"></p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className=" mr-4 lg:block md:block hidden">
          <div className="bg-gray-100">
            <p className="text-center my-4 font-serif text-2xl font-semibold pt-10">
              Healthy Foods
            </p>
            <p className="text-sm text-center font-light mx-10 my-6">
              Orci condimentum et a fringilla urna. Integer tincidunt fusce eu
              ipsum
            </p>
            <img
              className=" w-full mt-2 rounded-lg my-8 object-cover "
              src={image}
              alt=""
            />
          </div>

          <div className="bg-gray-100">
            <p className="text-center my-4 font-serif text-2xl font-semibold pt-10">
              Healthy Foods
            </p>
            <p className="text-sm text-center font-light mx-10 my-6">
              Orci condimentum et a fringilla urna. Integer tincidunt fusce eu
              ipsum
            </p>
            <img className=" w-full mt-2 rounded-lg my-8 " src={image} alt="" />
          </div>
        </div>

        <div className="mt-4 col-span-2 ">
          <div className="flex gap-2">
            {brandIsLoading ? (
              <div className="text-xl ml-2 py-2">Loading..</div>
            ) : (
              brandData?.data?.brands.map((data: BrandData) => (
                <p
                  key={data?._id}
                  onClick={() => setBrandNameData(data?.name)}
                  className="cursor-pointer text-xl font-serif font-semibold leading-2  text-black relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
                >
                  {data?.name} /
                </p>
              ))
            )}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {content}
          </div>
        </div>
      </div>
      <Link
        to="/AllProducts"
        className="flex items-center justify-center lg:mt-1 md:mt-20 mt-10"
      >
        <PrimaryButton>See More Products</PrimaryButton>
      </Link>
    </section>
  );
};

export default OurProducts;
