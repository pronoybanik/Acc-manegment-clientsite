import { useGetStockQuery } from "../../Features/Stock/Stock";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Brand {
  id: string;
}

interface ProductType {
  brand: Brand;
  category: string;
  createdAt: string;
  description: string;
  imageURLs: string[];
  name: string;
  price: number;
  quantity: number;
  sellCount: number;
  status: string;
  supplied: {
    id: {
      brand: Brand;
      contactNumber: string;
      createdAt: string;
      email: string;
      emergencyContactNumber: string;
      imageURL: string;
      location: string;
      name: string;
      nationalIdImageURL: string;
      permanentAddress: string;
      presentAddress: string;
      status: string;
      updatedAt: string;
      __v: number;
      _id: string;
    };
  };
  unit: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const AllStock = () => {
  const { data, isLoading, isError, error } = useGetStockQuery({});
  

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
  if (!isLoading && !isError && data.data.length === 0) {
    content = <Errors>{"There are no Video"}</Errors>;
  }
  if (!isLoading && !isError && data?.data?.stocks?.length > 0) {
    content = (
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {data?.data?.stocks?.map((d: ProductType) => (
          <div
            key={d._id}
            className="mx-auto  bg-slate-100 max-w-screen-xl px-4 py-4"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className=" lg:mt-20 relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <img
                  alt="Party"
                  src={d?.imageURLs[0]}
                  className="absolute inset-0 h-96 w-96 object-cover"
                />
              </div>

              <div className="lg:py-24">
                <h2 className=" font-bold text-3xl">{d?.name}</h2>

                <div>
                  <p className="text-2xl mt-2 mb-1 font-medium ">
                    product Details:
                  </p>
                  <div className="flex gap-1">
                    <p className="font-sans">Total quantity: {d?.quantity}</p>
                    <p>{d?.unit}</p>
                  </div>
                  <div>
                    <p className="font-sans">price: {d?.price} Tk</p>
                  </div>
                  <div>
                    <p>Product Status: {d?.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-2xl mt-2 mb-1 font-medium ">
                    supplier Details:
                  </p>
                  <div className="flex">
                    <p>supplier Name: {d?.supplied?.id?.name}</p>
                  </div>
                  <div>
                    <p className="font-sans">
                      Email: {d?.supplied?.id?.email} Tk
                    </p>
                  </div>
                  <div>
                    <p className="font-sans">
                      contact Number : {d?.supplied?.id?.contactNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans">
                      supplier status : {d?.supplied?.id?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="">
      <div>
        <p className="text-3xl mb-6 text-center font-bold uppercase border-b-4 w-96 mx-auto">
          {" "}
          All stock List
        </p>
      </div>
      {content}
    </section>
  );
};

export default AllStock;
