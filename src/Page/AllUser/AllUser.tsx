import React from "react";
import { useGetAllUserQuery } from "../../Features/Login/LoginApi";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";

const AllUser = () => {
  const { data, isError, error, isLoading } = useGetAllUserQuery({});

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
  if (!isLoading && !isError && data.data.length > 0) {
    content = data?.data?.map((userData) => (
      <tr key={userData._id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {userData.firstName}
          {userData.lastName}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData.email}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData.role}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData.status}
        </td>
      </tr>
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
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">{content}</tbody>
      </table>
    </div>
  );
};

export default AllUser;
