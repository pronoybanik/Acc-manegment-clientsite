import React, { useState, useEffect } from "react";
import OurProductItem from "../../Components/OurProductItem/OurProductItem";
import {
  useGetProductsByNameQuery,
  useGetProductsCategoryQuery,
  useGetProductsFilersQuery,
  useGetProductsQuery,
} from "../../Features/Products/ProductApi";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCategory,
  clearPrice,
  setCategory,
  setPrice,
} from "../../Features/Products/ProductSlice";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";

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

const productFilters = {
  id: "product",
  name: "products",
  options: [
    { value: "", label: "All", checked: false },
    {
      value: "rice",
      label: "Rice",
      checked: false,
    },
    {
      value: "oil",
      label: "Oil",
      checked: false,
    },
  ],
};

const AllProducts = () => {
  const [categoryData, setCategoryData] = useState("");
  const [priceData, setPriceData] = useState("");
  const [brandName, setBrandName] = React.useState<string>("");

  const dispatch = useDispatch();

  const { category } = useSelector((state) => state?.productFilter);
  // console.log(category);

  const {
    data: allProduct,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({});
  const { data: filterCategory } = useGetProductsCategoryQuery(brandName);
  // const { data: allFilter } = useGetProductsFilersQuery({ category, price });
  console.log(filterCategory);

  // if (brandNameData) {
  //   setBrandNameData("");
  // }
  useEffect(() => {
    // Dispatch actions to update Redux state based on component state
    if (categoryData) {
      dispatch(setCategory(categoryData));
    } else {
      dispatch(clearCategory());
    }

    if (priceData) {
      dispatch(setPrice(priceData));
    } else {
      dispatch(clearPrice());
    }
  }, [dispatch, categoryData, priceData]);

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{error?.data?.error}</Errors>;
  }
  if (!isLoading && !isError && allProduct.data.products.length === 0) {
    content = <Errors>{"There are no products"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    allProduct.status === "success" &&
    allProduct.data.products.length > 0
  ) {
    content =
      brandName === ""
        ? allProduct?.data?.products.map((d: productData) => {
            return <OurProductItem key={d?._id} data={d}></OurProductItem>;
          })
        : filterCategory?.data?.products.map((d: productData) => {
            return <OurProductItem key={d?._id} data={d}></OurProductItem>;
          });
  }

  return (
    <section>
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.pexels.com/photos/7341749/pexels-photo-7341749.jpeg?auto=compress&cs=tinysrgb&w=1600)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20  sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l">
          {" "}
        </div>

        <div className="flex  items-center justify-center h-full">
          <div className="relative">
            <p className="text-white max-w-screen-lg text-center lg:text-4xl md:text-3xl text-2xl font-semibold mt-4  sm:text-xl/relaxed">
              Rooted in Quality, Grown with Care: Elevate Your Meals with Our
              Farm-Fresh Offerings
            </p>
          </div>
        </div>
      </div>

      {/* Brand section */}

      <div className="w-10/12 mx-auto  ">
        <div className="my-14">
          <div className="lg:text-5xl text-3xl flex items-center justify-center  font-serif">
            Our Products
          </div>
          <p className="border-b-2 border-[#98CB4C] mx-auto w-14 lg:mt-4 mt-2"></p>
        </div>

        <div className="mt-8 block lg:hidden">
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="hidden space-y-4 lg:block ">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                All product Collection
              </h2>

              <p className="mt-4 max-w-sm text-gray-800">
                Harvesting Success: Cultivating Quality, Nurturing Community.
                Discover the freshest produce straight from local farms. Join
                our farmers' market for a vibrant celebration of flavor,
                sustainability, and farm-to-table goodness
              </p>
            </div>

            <div>
              <p className="text-center border-b-2 w-36 mx-auto ">
                Filtering Products
              </p>
              <div className="mt-1 space-y-2">
                {productFilters?.options.map((option, index: number) => (
                  <div
                    onClick={() => setBrandName(option?.value)}
                    className="bg-slate-50 cursor-pointer hover:bg-slate-100 mt-2 py-2 ps-4 font-medium rounded-lg"
                  >
                    <div className="flex gap-2">
                      <div className="-mt-1 text-lg">{index + 1}.</div>
                      <div>{option.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 col-span-3">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
