import React from "react";
import { useGetStockQuery } from "../../Features/Stock/Stock";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";

const AllStock = () => {
  const { data, isLoading, isError, error } = useGetStockQuery({});
  

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{error?.data?.error}</Errors>;
  }
  if (!isLoading && !isError && data.data.length === 0) {
    content = <Errors>{"There are no Video"}</Errors>;
  }
  if (!isLoading && !isError && data?.data?.stocks?.length > 0) {
    content = (
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {data?.data?.stocks?.map((d) => (
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
