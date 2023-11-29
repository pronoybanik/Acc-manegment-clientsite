import React, { useState, useEffect } from "react";
import OurProductItem from "../../Components/OurProductItem/OurProductItem";
import {
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

const priceFilters = {
  id: "size",
  name: "price",
  options: [
    {
      label: "Price: Low to High",
      value: "price",
      checked: false,
    },
    {
      label: "Price: High to Low",
      value: "-price",
      checked: false,
    },
  ],
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
  const dispatch = useDispatch();
  const { category, price } = useSelector((state) => state?.productFilter);
  console.log(category);

  const { data, isLoading, isError, error } = useGetProductsQuery({});
  const { data: filterCategory } = useGetProductsCategoryQuery(category);
  const { data: allFilter } = useGetProductsFilersQuery({ category, price });
  console.log(allFilter);

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
      category === ""
        ? data?.data?.products.map((d: productData) => {
            return <OurProductItem key={d?._id} data={d}></OurProductItem>;
          })
        : filterCategory?.data?.products.map((d: productData) => {
            return <OurProductItem key={d?._id} data={d}></OurProductItem>;
          });
  }

  // let content = null;

  // if (isLoading) {
  //   content = <Loading />;
  // } else if (isError) {
  //   content = <Errors>{error?.data?.error}</Errors>;
  // } else if (data.status === "success" && data.data.products.length === 0) {
  //   content = <Errors>{"There are no products"}</Errors>;
  // } else if (
  //   category === "" &&
  //   data.status === "success" &&
  //   data.data.products.length > 0
  // ) {
  //   content = data.data.products.map((d: productData) => (
  //     <OurProductItem key={d?._id} data={d}></OurProductItem>
  //   ));
  // } else if (
  //   filterCategory &&
  //   filterCategory.status === "success" &&
  //   filterCategory.data.products.length > 0
  // ) {
  //   content = filterCategory.data.products.map((d: productData) => (
  //     <OurProductItem key={d?._id} data={d}></OurProductItem>
  //   ));
  // } else if (
  //   allFilter &&
  //   allFilter.status === "success" &&
  //   allFilter.data.products.length > 0
  // ) {
  //   content = allFilter.data.products.map((d: productData) => (
  //     <OurProductItem key={d?._id} data={d}></OurProductItem>
  //   ));
  // }

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

        <div className="grid grid-cols-3 gap-4">
          <div className="hidden space-y-4 lg:block">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                All Brand Collection
              </h2>

              <p className="mt-4 max-w-sm text-gray-800">
                Harvesting Success: Cultivating Quality, Nurturing Community.
                Discover the freshest produce straight from local farms. Join
                our farmers' market for a vibrant celebration of flavor,
                sustainability, and farm-to-table goodness
              </p>
            </div>

            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium">
                      {" "}
                      product Category{" "}
                    </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <div>
                        {productFilters.options.map((option) => (
                          <li key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              type="checkbox"
                              onChange={(e) =>
                                setCategoryData(e.target.defaultValue)
                              }
                              defaultChecked={option.checked}
                              className="h-4 w-4 text-black rounded border-gray-300 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-black ">
                              {option.label}
                            </label>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                </details>

                {/* <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> products Price </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        The highest price is $600
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between gap-4">
                        <label
                          htmlFor="FilterPriceFrom"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">$</span>

                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="From"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>

                        <label
                          htmlFor="FilterPriceTo"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">$</span>

                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="To"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </details> */}

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> price </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        0 Selected{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        {priceFilters.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              type="checkbox"
                              onChange={(e) =>
                                setPriceData(e.target.defaultValue)
                              }
                              defaultChecked={option.checked}
                              className="h-4 w-4 text-black rounded border-gray-300 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-black ">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="mt-4 col-span-2">
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
