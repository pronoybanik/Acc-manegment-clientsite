import { useEffect, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllPaymentQuery,
  useGetOrderQuery,
} from "../../Features/Orders/OrdersApi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import PaymentModel from "../../Components/PaymentModel/PaymentModel";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Product {
  brand: {
    id: string;
  };
  _id: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  imageURLs: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderItem {
  _id: string;
  productId: Product;
  quantity: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderData {
  productId: string;
  userId: string;
  quantity: number;
  _id: string;
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  orderData: OrderData[];
  paymentStatus: string;
  presentAddress: string;
  priceData: number;
  shippingAddress: string;
  shippingStatus: string;
  __v: number;
  _id: string;
}

interface ProductData {
  _id: string;
  createdAt: string;
  productId: {
    brand: {
      id: string;
    };
    category: string;
    createdAt: string;
    description: string;
    imageURLs: string;
    name: string;
    price: number;
    unit: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  quantity: number;
  updatedAt: string;
  userId: string;
  __v: number;
}


const AddCard = () => {
  const [deleteOrder, { isSuccess }] = useDeleteOrderMutation();
  const { data: orderData, isLoading, isError, error } = useGetOrderQuery({});
  const { data } = useGetAllPaymentQuery({});

  
  const [order, setOrder] = useState<ProductData[]>([]);
  console.log("test1",order);

  const [orderStatus, setOrderStatus] = useState<
    UserData | Record<string, never>
  >({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [checkOut, setCheckOut] = useState(false);

  const userItem = localStorage.getItem("userId");
  const userId = userItem ? JSON.parse(userItem) : null;

  useEffect(() => {
    if (data?.data) {
      data.data.map((d: UserData) => setOrderStatus(d));
    }
  }, [data]);

  // close module handler
  const closeLoginForm = () => {
    setCheckOut(false);
  };

  useEffect(() => {
    if (userId && orderData) {
      const orderItems = orderData?.data?.filter(
        (data: OrderItem) => data?.userId === userId
      );
      setOrder(orderItems);
    } else {
      console.log("No order data found.");
    }
  }, [userId, orderData, setOrder]);

  useEffect(() => {
    if (order) {
      const newTotalPrice = order?.reduce(
        (acc: number, product: OrderItem) =>
          acc + product?.productId?.price * product?.quantity,
        0
      );
      setTotalPrice(newTotalPrice);
    } else {
      // Handle the case where orderData or orderData.data is not available
    }
  }, [order]);
  const totalPriceWithVat = totalPrice + 100;

  const handleOrderDelete = (id: string) => {
    if (id) {
      deleteOrder(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("order Delete");
    }
  }, [isSuccess]);

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
  if (!isLoading && !isError && order.length === 0) {
    content = <Errors>{"There are no order"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    orderData.status === "success" &&
    order.length > 0
  ) {
    content = (
      <>
        <ul className="space-y-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {order?.map((data: OrderItem) =>
            data?.userId === userId ? (
              <li key={data?._id} className="flex items-center gap-4">
                <img
                  src={data?.productId?.imageURLs}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">
                    {data?.productId?.name}
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline text-sm">Unit:</dt>
                      <dd className="inline text-sm ">
                        {data?.productId?.unit}
                      </dd>
                    </div>

                    <div>
                      <dt className="inline text-sm">price:</dt>
                      <dd className="inline font-mono text-sm ml-2 font-semibold">
                        {data?.productId?.price * data?.quantity}Tk
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <form>
                    <label htmlFor="Line1Qty" className="sr-only">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={data?.quantity}
                      id="Line1Qty"
                      className="h-8 w-12 rounded border-gray-200 font-medium bg-gray-200 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </form>

                  {orderStatus?.shippingStatus === "processing" ||
                  orderStatus?.shippingStatus === "shipped" ||
                  orderStatus?.shippingStatus === "delivered" ? null : (
                    <button
                      onClick={() => handleOrderDelete(data?._id)}
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ) : null
          )}
        </ul>
      </>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="font-serif text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            {content}

            <div className="border-t-2 border-gray-200 mt-10">
              <div className="my-4">
                <div>
                  <h2 className="sr-only">Steps</h2>

                  <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
                    <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
                      <li
                        className={`relative flex justify-start ${
                          orderStatus?.shippingStatus === "processing"
                            ? "text-blue-600"
                            : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`absolute -bottom-[1.75rem] start-0 rounded-full ${
                            orderStatus?.shippingStatus === "processing"
                              ? "bg-blue-600"
                              : "bg-slate-300"
                          } text-white`}
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>

                        <span className="hidden sm:block"> processing </span>

                        <svg
                          className="h-6 w-6 sm:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                          />
                        </svg>
                      </li>

                      <li
                        className={`relative flex justify-center  ${
                          orderStatus?.shippingStatus === "shipped"
                            ? "text-blue-700"
                            : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full ${
                            orderStatus?.shippingStatus === "shipped"
                              ? "bg-blue-700"
                              : "bg-slate-200"
                          } text-white`}
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>

                        <span className="hidden sm:block"> shipped </span>

                        <svg
                          className="mx-auto h-6 w-6 sm:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </li>

                      <li
                        className={`relative flex justify-end  ${
                          orderStatus?.shippingStatus === "delivered"
                            ? "text-blue-700"
                            : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`absolute -bottom-[1.75rem] end-0 rounded-full ${
                            orderStatus.shippingStatus === "delivered"
                              ? "bg-blue-600"
                              : "bg-slate-200"
                          } text-white`}
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>

                        <span className="hidden sm:block"> Delivered </span>

                        <svg
                          className="h-6 w-6 sm:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end  ">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="font-sans">TK:{totalPrice}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>DaleyBry charge</dt>
                      <dd className="font-sans">TK: 100</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd className="font-sans">TK: {totalPriceWithVat}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">
                        2 Discounts Applied
                      </p>
                    </span>
                  </div>

                  <div className="flex justify-end">
                    {orderStatus?.shippingStatus === "processing" ||
                    orderStatus?.shippingStatus === "shipped" ||
                    orderStatus?.shippingStatus === "delivered" ? (
                      <button className="relative cursor-pointer  text-white px-10   py-2 my-1   bg-no-repeat text-xl bg-slate-400 disabled   font-serif rounded-lg ">
                        Disable
                      </button>
                    ) : (
                      <div onClick={() => setCheckOut(true)}>
                        <PrimaryButton>Check Out</PrimaryButton>
                      </div>
                    )}
                  </div>

                  {checkOut && (
                    <PaymentModel
                      orderData={order}
                      priceData={totalPriceWithVat}
                      closeForm={closeLoginForm}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCard;
