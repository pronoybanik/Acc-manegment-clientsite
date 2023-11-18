import React from "react";
import { Link } from "react-router-dom";

type product = {
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

const BrandCard = ({ BrandData }: { BrandData: product }) => {
  const { _id, name, description, image, location, status } = BrandData;
  const slicedDescription = description.slice(0, 60);

  return (
    <Link to={_id} className="group block overflow-hidden">
      <img
        src={image}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="flex text-xl font-bold text-gray-900">
          Brand: <div className="ml-2">{name}</div>
        </h3>
        <h3 className="flex  mt-1 text-lg font-medium text-gray-900">
          Location: <div className="ml-2">{location}</div>
        </h3>
        <h3 className="flex  mt-1 text-sm font-medium text-gray-900">
          status: <div className="ml-2 text-red-600">{status}</div>
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">{slicedDescription}...</p>

      
      </div>
    </Link>
  );
};

export default BrandCard;
