import React from "react";
import { Link } from "react-router-dom";

type productData = {
  _id: string;
  brand: {
    name: string;
    _id: string;
  };
  category: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
  price: number;
};

const OurProductItem = ({ data }: { data: productData }) => {
  

  return (
    <section className="border-2 p-4 mt-4 ">
      <Link
        key={data?._id}
        to={`/product/${data?._id}`}
        className="group block"
      >
        <img
          src={data?.imageURLs}
          alt=""
          className="h-80 object-contain w-full"
        />

        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {data?.category}
            </h3>

            <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">
              {data?.name}
            </p>
          </div>

          <p className="text-gray-900">price:{data?.price} TK</p>
        </div>
      </Link>
    </section>
  );
};

export default OurProductItem;
