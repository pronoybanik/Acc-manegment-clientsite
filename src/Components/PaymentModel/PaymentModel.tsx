import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { useCreateOrderPaymentMutation } from "../../Features/Orders/OrdersApi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";

interface checkOutProps {
  closeForm: () => void;
}

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

interface OrderData {
  _id: string;
  productId: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PriceData {
  totalPriceWithVat: number;
}

const PaymentModel: React.FC<
  checkOutProps & { priceData: PriceData; orderData: OrderData }
> = ({ closeForm, priceData, orderData }) => {
  const { data } = useGetUserQuery({});
  const [createOrderPayment, { data: orderPayment }] =
    useCreateOrderPaymentMutation();

  if (orderPayment?.url) {
    alert("please pay your Bill");
    window.location.replace(orderPayment?.url || undefined);
  }

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      shippingAddress: { value: string };
      presentAddress: { value: string };
    };

    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const shippingAddress = target.shippingAddress.value;
    const presentAddress = target.presentAddress.value;
    // const saveOrderData = orderData?.data;

    createOrderPayment({
      priceData,
      orderData,
      firstName,
      lastName,
      email,
      shippingAddress,
      presentAddress,
    });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto  ">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Add your login form content here */}

          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <button
                className="text-gray-600 hover:text-gray-800 absolute top-4 right-4"
                onClick={closeForm}
              >
                Close
              </button>

              <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Please Pay Your Bill
                  </h1>

                  <p className="mt-4 text-gray-500">Total Price:{priceData}</p>
                </div>

                <section>
                  <form onSubmit={handlePayment} action="">
                    <div className="flex gap-4 mb-2">
                      {/* first Name */}
                      <div>
                        <label htmlFor="firstName" className="sr-only">
                          First Name
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="First Name"
                            disabled
                            value={data?.data?.firstName}
                            name="firstName"
                          />
                        </div>
                      </div>
                      {/* last Name */}
                      <div>
                        <label htmlFor="lastName" className="sr-only">
                          Last Name
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Last Name"
                            disabled
                            value={data?.data?.lastName}
                            name="lastName"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Email  */}
                    <div className="mb-2">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>

                      <div className="relative">
                        <input
                          type="email"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter email"
                          disabled
                          value={data?.data?.email}
                          name="email"
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    {/* shipping Address */}
                    <div className="mb-2">
                      <label htmlFor="shippingAddress" className="sr-only">
                        shipping Address
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Shipping Address"
                          disabled
                          value={data?.data?.shippingAddress}
                          name="shippingAddress"
                        />
                      </div>
                    </div>
                    {/* present Address */}
                    <div className="mb-2">
                      <label htmlFor="email" className="sr-only">
                        present Address
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Present Address"
                          disabled
                          value={data?.data?.presentAddress}
                          name="presentAddress"
                        />
                      </div>
                    </div>

                    <PrimaryButton>pay</PrimaryButton>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModel;
