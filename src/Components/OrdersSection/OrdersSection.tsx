import { useEffect } from "react";
import {
  useDeleteOrderPaymentMutation,
  useEditOrderPaymentMutation,
} from "../../Features/Orders/OrdersApi";
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

  const [deleteOrderPayment, { isSuccess }] = useDeleteOrderPaymentMutation();
  const [editOrderPayment, { isSuccess: editOrderSuccess }] =
    useEditOrderPaymentMutation();

  const handleDelete = (id: string) => {
    if (id) {
      deleteOrderPayment(id);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productStatus = e.target.value;
    const orderId = orderInfo?._id;

    if (productStatus && orderId) {
      editOrderPayment({
        orderId,
        data: {
          shippingStatus: productStatus,
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Delete Order");
    } else if (editOrderSuccess) {
      alert("change product status");
    } else {
      console.log("No Change");
    }
  }, [isSuccess, editOrderSuccess]);

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
            <select
              onChange={handleStatusChange}
              className="h-8 w-72 my-2 rounded border-gray-200 bg-gray-50 p-0 text-center text-lg text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              id="nameSelect"
              name="selectedName"
            >
              <option className="bg-gray-300">Change product status</option>
              <option className="font-semibold" value="processing">
                processing
              </option>
              <option className="font-semibold" value="shipped">
                shipped
              </option>
              <option className="font-semibold" value="delivered">
                delivered
              </option>
            </select>
          </div>

          <p className="inline-block font-bold text-red-500 text-sm underline underline-offset-4 transition hover:text-gray-600">
            Shipping Status:- {shippingStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
