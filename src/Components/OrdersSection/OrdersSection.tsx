import { useEffect } from "react";
import { useDeleteOrderPaymentMutation } from "../../Features/Orders/OrdersApi";
import OrderSItem from "../OrderSItem/OrderSItem";

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

const OrdersSection = ({ orderInfo }: { orderInfo: UserData }) => {
  // delete funsanality
  const [deleteOrderPayment, { isSuccess }] = useDeleteOrderPaymentMutation();
  const handleDelete = (id: string) => {
    if (id) {
      deleteOrderPayment(id);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      alert("Delete Orders");
    }
  }, [isSuccess]);

  const {
    _id,
    email,
    firstName,
    lastName,
    paymentStatus,
    presentAddress,
    orderData,
    shippingAddress,
    priceData,
    shippingStatus,
  } = orderInfo;

  return (
    <div
      className="relative w-screen max-w-sm border border-gray-800 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex justify-center items-center">
        <div className=" px-2">
          <p className="font-medium text-center border-b-2 border-gray-600  w-32 mx-auto mb-2 uppercase">
            Beyer Info:
          </p>
          <p className="font-medium ">Email: {email}</p>
          <p className="font-medium ">
            Name: {firstName} {lastName}
          </p>
          <p className="font-medium flex  gap-2">
            Payment status: <p className="text-red-600">{paymentStatus}</p>
          </p>
          <p className="font-medium  flex gap-2">
            Total Price: <p>{priceData} TK</p>
          </p>
          <p className="font-medium">presentAddress: {presentAddress} </p>
          <p className="font-medium">shippingAddress: {shippingAddress} </p>
        </div>
      </div>
      <button
        onClick={() => handleDelete(_id)}
        className="absolute end-4 top-4 text-gray-800 transition hover:scale-110"
      >
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <div>
          <p className="font-medium text-center border-b-2 border-gray-600  w-40 mx-auto mb-2 uppercase">
            Order Products
          </p>
        </div>

        {orderData.map((data) => (
          <OrderSItem key={data?._id} orderItemData={data} />
        ))}

        <div className="space-y-4 text-center">
          <div className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400">
            <div>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer border items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium">
                    Change Shipping Status
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href=""
                      className="block border rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Shipping 
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block border rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                     Delivered
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>

          {/* <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a> */}

          <p className="inline-block font-bold text-red-500 text-sm underline underline-offset-4 transition hover:text-gray-600">
            Shipping Status:- {shippingStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
