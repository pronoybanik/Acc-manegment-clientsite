import React from "react";
import image from "../../Images/home page image/pexels-pixabay-219794-removebg-preview.png";
import { useGetProductsQuery } from "../../Features/Products/ProductApi";
import OurProductItem from "../OurProductItem/OurProductItem";

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

const OurProducts = () => {
  const { data } = useGetProductsQuery({});

  return (
    <section className="lg:mx-40">
      <div className="my-14">
        <div className="text-5xl flex items-center justify-center  font-serif">
          Our Products
        </div>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 mt-4"></p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-4  ">
        <div className="mr-4 ">
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

        <div className="h-32 rounded-lg  lg:col-span-3 mt-2">
          <div className="flex gap-4">
            <p className="cursor-pointer text-xl font-serif font-semibold leading-2  text-black relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100">
              ACI
            </p>
            /
            <p className="cursor-pointer text-xl font-serif font-semibold leading-2  text-black relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100">
              Fresh
            </p>
            /
            <p className="cursor-pointer text-xl font-serif font-semibold leading-2 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100">
              Rupchanda
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
            {data?.data?.map((d: productData) => (
              <OurProductItem key={d?._id} data={d}></OurProductItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
