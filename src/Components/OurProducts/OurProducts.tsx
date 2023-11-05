import React from "react";
import image from "../../Images/home page image/pexels-pixabay-219794-removebg-preview.png";
import { useGetProductsQuery } from "../../Features/Products/ProductApi";

type productData = {
  _id: string;
  brand: {
    name: string;
    _id: string;
  };
  category: string;
  description: string;
  imageURLs: [string];
  name: string;
  unit: string;
};

// You can then use the 'riceProduct' object in your JavaScript code as needed.

const OurProducts = () => {
  const { data } = useGetProductsQuery({});
  console.log(data?.data);

  return (
    <section className="lg:mx-40">
      <div className="my-10">
        <p className="text-center font-bold font-serif text-4xl">
          Our Products
        </p>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 mt-4"></p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-4">
        <div>
          <div className="bg-gray-100">
            <p className="text-center my-4 font-serif text-2xl font-semibold">
              Healthy Foods
            </p>
            <p className="text-sm text-center font-light mx-10 my-6">
              Orci condimentum et a fringilla urna. Integer tincidunt fusce eu
              ipsum
            </p>
            <img className=" w-full mt-2 rounded-lg my-8 " src={image} alt="" />
          </div>
          <div className="bg-gray-100">
            <p className="text-center my-4 font-serif text-2xl font-semibold">
              Healthy Foods
            </p>
            <p className="text-sm text-center font-light mx-10 my-6">
              Orci condimentum et a fringilla urna. Integer tincidunt fusce eu
              ipsum
            </p>
            <img className=" w-full mt-2 rounded-lg my-8 " src={image} alt="" />
          </div>
        </div>
        <div className="h-32 rounded-lg  lg:col-span-3">
          <div className="flex gap-4">
            <p>card1</p>/<p>card2</p>/<p>card3</p>/
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data?.data?.map((d: productData) => (
              <div>
                <a key={d?._id} href="#" className="group block">
                  <img
                    src={d?.imageURLs[0]}
                    alt=""
                    className="h-[300px] w-full object-cover "
                  />

                  <div className="mt-3 flex justify-between text-sm">
                    <div>
                      <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        {d?.category}
                      </h3>

                      <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quasi nobis, quia soluta quisquam voluptatem nemo.
                      </p>
                    </div>

                    <p className="text-gray-900">$299</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
