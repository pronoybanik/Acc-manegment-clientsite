import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { data, isLoading } = useGetUserQuery({});

  return (
    <section>
      <p className="text-3xl mb-6 text-center font-bold uppercase border-b-4 w-96 mx-auto">
        Manager Profile
      </p>
      <div className="flex justify-center my-2">
        <img
          className="h-56 w-56 rounded-full"
          src={data?.data?.imageURL}
          alt=""
        />
      </div>

      <Link to={`/managerDashBoard/userDetails/${data?.data?._id}`} className="flex justify-end mr-2  my-2">
        <PrimaryButton>Edit Profile</PrimaryButton>
      </Link>

      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        {!isLoading ? (
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name:</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.data?.firstName} {data?.data?.lastName}{" "}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email:</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.data?.email}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Role:</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.data?.role}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Status:</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.data?.status}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">presentAddress:</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {data?.data?.presentAddress}
              </dd>
            </div>
          </dl>
        ) : null}
      </div>
    </section>
  );
};

export default UserDetails;
