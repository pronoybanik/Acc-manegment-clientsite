import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SupplierItem from "../../Components/SupplierItem/SupplierItem";
import { useGetAllSupplierQuery } from "../../Features/Supplier/Supplier";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import { SerializedError } from "@reduxjs/toolkit";

interface Supplier {
  _id: string;
}

interface Brand {
  id: {
    _id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    products: string[];
    status: string;
    suppliers: Supplier[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  location: string;
  imageURL: string;
  nationalIdImageURL: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brand: Brand;
}

const AllSupplier = () => {
  const {
    data: supplierData,
    isLoading,
    isError,
    error,
  } = useGetAllSupplierQuery({});

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
  if (!isLoading && !isError && supplierData.data.length === 0) {
    content = <Errors>{"There are no supplier"}</Errors>;
  }
  if (
    !isLoading &&
    !isError &&
    supplierData.status === "success" &&
    supplierData.data.length > 0
  ) {
    content = supplierData?.data?.map((data: UserData) => (
      <SupplierItem key={data?._id} data={data}></SupplierItem>
    ));
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
      {content}
    </section>
  );
};

export default AllSupplier;
