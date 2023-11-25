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
  __v: number;
  _id: string;
}

const OrdersSection = ({ orderInfo }: { orderInfo: UserData }) => {
  const {
    email,
    firstName,
    lastName,
    paymentStatus,
    presentAddress,
    orderData,
    shippingAddress,
    priceData,
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
      <button className="absolute end-4 top-4 text-gray-800 transition hover:scale-110">
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
          <a
            href="#"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart (2)
          </a>

          <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
