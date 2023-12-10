import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import OrdersSection from "../../Components/OrdersSection/OrdersSection";
import { useGetAllPaymentQuery } from "../../Features/Orders/OrdersApi";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import { SerializedError } from "@reduxjs/toolkit";

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

const AllOrder = () => {
  const { data, isLoading, isError, error } = useGetAllPaymentQuery({});


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
    content = <Errors>{"There are no payment"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    data.status === "success" &&
    data.data.length > 0
  ) {
    content = data?.data?.map((orderData: UserData) => (
      <OrdersSection key={orderData?._id} orderInfo={orderData} />
    ));
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {content}
    </section>
  );
};

export default AllOrder;
