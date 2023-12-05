import React, { useEffect } from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import {
  useDeleteUserMutation,
  useEditUserMutation,
} from "../../Features/Login/LoginApi";

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

const UserItem = ({ userData }: { userData: UserDataType }) => {
  const [editUser, { isSuccess: editUserSuccess }] = useEditUserMutation();
  const [deleteUser, { isSuccess: deleteUserSuccess }] =
    useDeleteUserMutation();

  const handleUserDelete = (id: string) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (editUserSuccess) {
      alert("change status");
    } else if (deleteUserSuccess) {
      alert("Delete User");
    } else {
      console.log("No Change");
    }
  }, [editUserSuccess, deleteUserSuccess]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const userId = userData?._id;
    

    editUser({
      userId,
      data: {
        status: value,
      },
    });
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {userData?.firstName}
          {userData?.lastName}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData?.email}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData?.role}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {userData?.status}
        </td>
        <td>
          <select
            onChange={handleStatusChange}
            className="h-8 w-72 my-2 rounded border-gray-200 bg-gray-50 p-0 text-center text-lg text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            id="nameSelect"
            name="selectedName"
          >
            <option className="bg-gray-300">status</option>
            <option className="font-semibold" value="active">
              Active
            </option>
            <option className="font-semibold" value="inactive">
              inActive
            </option>
            <option className="font-semibold" value="blocked">
              Blocked
            </option>
          </select>
        </td>
        <td onClick={() => handleUserDelete(userData?._id)}>
          <PrimaryButton>Delete</PrimaryButton>
        </td>
      </tr>
    </>
  );
};

export default UserItem;
