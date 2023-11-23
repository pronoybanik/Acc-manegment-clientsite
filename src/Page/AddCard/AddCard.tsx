import React, { useEffect, useState } from "react";
import { useGetOrderQuery } from "../../Features/Orders/OrdersApi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import PaymentModel from "../../Components/PaymentModel/PaymentModel";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";

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

const AddCard = () => {
  const { data: orderData, isLoading, isError, error } = useGetOrderQuery({});

  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkOut, setCheckOut] = useState(false);

  const userItem = localStorage.getItem("userId");
  const userId = userItem ? JSON.parse(userItem) : null;

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
      console.log("No user ID or order data found.");
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
      console.log("No order data found.");
    }
  }, [order]);
  const totalPriceWithVat = totalPrice + 100;

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{error?.toString()}</Errors>;
  }
  if (!isLoading && !isError && order.length === 0) {
    content = <Errors>{"There are no Product"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    orderData.status === "success" &&
    order.length > 0
  ) {
    content = (
      <>
        <ul className="space-y-4">
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
                      <dt className="inline">Unit:</dt>
                      <dd className="inline">{data?.productId?.unit}</dd>
                    </div>

                    <div>
                      <dt className="inline">price:</dt>
                      <dd className="inline">
                        {data?.productId?.price * data?.quantity}
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
                      className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </form>

                  <button className="text-gray-600 transition hover:text-red-600">
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

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>
                      TK:{" "}
                      {/* {orderData?.data?.reduce((data: OrderItem) =>
                        data?.userId === userId ? { totalPrice } : "0"
                      )} */}
                      {totalPrice}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>DaleyBry charge</dt>
                    <dd>TK: 100</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>TK: {totalPriceWithVat}</dd>
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

                <div
                  onClick={() => setCheckOut(true)}
                  className="flex justify-end"
                >
                  <PrimaryButton>Checkout</PrimaryButton>
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
    </section>
  );
};

export default AddCard;
