import { useGetAllUserQuery } from "../../Features/Login/LoginApi";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import UserItem from "../../Components/UserItem/UserItem";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type UserDataType = {
  createdAt: string;
  email: string;
  firstName: string;
  imageURL: string;
  lastName: string;
  password: string;
  presentAddress: string;
  role: string;
  shippingAddress: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

const AllUser = () => {
  const { data, isError, error, isLoading } = useGetAllUserQuery({});

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
    content = <Errors>{"There are no user"}</Errors>;
  }
  if (!isLoading && !isError && data.data.length > 0) {
    content = data?.data?.map((userData: UserDataType) => (
      <UserItem key={userData?._id} userData={userData}></UserItem>
    ));
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Role
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              status Change
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Delate Account
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">{content}</tbody>
      </table>
    </div>
  );
};

export default AllUser;
