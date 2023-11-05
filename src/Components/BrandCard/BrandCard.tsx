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
};

const BrandCard = ({ productData }: { productData: product }) => {
  console.log(productData);
  const { _id, name, description } = productData;
  const slicedDescription = description.slice(0, 110);
  return (
    <div>
      <li>
        <Link to={_id} className="group block overflow-hidden">
          <img
            src="http:string"
            alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hove:string"
          />

          <div className="relative bg-white pt-3">
            <h3 className="text-xs text-gray-700 group-hove:string">{name}</h3>

            <p className="mt-2">
              <span className="sr-only"> Regular Price </span>

              <span className="tracking-wider text-gray-900 text-xs">
                {slicedDescription}....
              </span>
            </p>
          </div>
        </Link>
      </li>
    </div>
  );
};

export default BrandCard;
