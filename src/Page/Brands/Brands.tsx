import React from "react";
import {
  useGetBrandNameQuery,
  useGetBrandPaginationQuery,
} from "../../Features/Brands/BrandsAPi";
import BrandCard from "../../Components/BrandCard/BrandCard";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import BrandPagination from "../../Components/BrandPagination/BrandPagination";
import { useSelector } from "react-redux";
import { Store } from "../../App/Store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

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

type RootState = ReturnType<typeof Store.getState>;

const Brands = () => {
  // const { data, isLoading, isError, error } = useGetBrandQuery({});
  const { pageNumber } = useSelector((state : RootState) => state?.productFilter);
  const limit = 3;

  const { data, isLoading, error, isError } = useGetBrandPaginationQuery({
    pageNumber,
    limit,
  });

  const [brandName, setBrandName] = React.useState<string>("");
  const { data: brandNameData } = useGetBrandNameQuery(brandName);

  const getErrorText = (
    error: FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (
      error &&
      "data" in error &&
      error.data &&
      typeof error.data === "object"
    ) {
      if ("error" in error.data && typeof error.data.error === "string") {
        return error.data.error || "An error occurred";
      }
    }
    return "An error occurred";
  };

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{getErrorText(error)}</Errors>;
  }
  if (!isLoading && !isError && data?.data?.brands?.length === 0) {
    // Updated condition
    content = <Errors>{"There are no Brands"}</Errors>; // Updated message
  }
  if (
    !isLoading &&
    !isError &&
    data?.status === "success" &&
    data?.data?.brands?.length > 0
  ) {
    content =
      brandName === ""
        ? data?.data?.brands?.map((d: BrandData) => (
            <BrandCard key={d?._id} BrandData={d} />
          ))
        : brandNameData?.data?.brands?.map((d: BrandData) => (
            <BrandCard key={d?._id} BrandData={d} />
          ));
  }

  return (
    <section>
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1600)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20  sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l">
          {" "}
        </div>

        <div className="flex  items-center justify-center h-full">
          <div className="relative">
            <p className="text-white max-w-screen-sm text-center lg:text-4xl md:text-3xl text-2xl font-semibold mt-4  sm:text-xl/relaxed">
              Farmers' Market Treasures Fresh, Flavorful, and Just for You
            </p>
          </div>
        </div>
      </div>

      <div className="my-14">
        <div className="lg:text-5xl text-3xl flex items-center justify-center  font-serif">
          Our Brand
        </div>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 lg:mt-4 mt-2"></p>
      </div>

      {/* Brand section */}

      <section>
        <div className="mx-auto max-w-screen-2xl px-4  sm:px-6  lg:px-8">
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
                <p className="text-center border-b-2 w-36 mx-auto ">
                  Filtering Brand
                </p>
                {data?.data?.brands.map((d: BrandData, index: number) => (
                  <div
                    key={d?._id}
                    onClick={() => setBrandName(d?.name)}
                    className="bg-slate-50 cursor-pointer hover:bg-slate-100 mt-2 py-2 ps-4 font-medium rounded-lg"
                  >
                    {index + 1}. {d.name}
                  </div>
                ))}
                <div
                  onClick={() => setBrandName("")}
                  className="bg-slate-50 cursor-pointer text-center hover:bg-slate-100 mt-2 py-2 ps-4 font-medium rounded-lg"
                >
                  See All Brand
                </div>
              </div>
            </div>

            <div className="mt-4 col-span-3">
              <div className="flex gap-2"></div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {content}
              </div>
            </div>
          </div>
          <BrandPagination
            currentPage={data?.data?.currentPage}
            pageNumber={data?.data?.numberOfPage}
          />
        </div>
      </section>
    </section>
  );
};

export default Brands;
