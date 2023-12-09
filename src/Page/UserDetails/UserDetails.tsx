import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";

const UserDetails = () => {
  return (
    <section>
      <p className="text-3xl mb-6 text-center font-bold uppercase border-b-4 w-96 mx-auto">
        {" "}
        Manager Profile
      </p>
      <div className="flex justify-center my-2">
        <img
          className="h-56 w-56 rounded-full"
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>

      <div className="flex justify-end mr-2  my-2">
        <PrimaryButton>Edit Profile</PrimaryButton>
      </div>

      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>
            <dd className="text-gray-700 sm:col-span-2">Mr</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">John Frusciante</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Occupation</dt>
            <dd className="text-gray-700 sm:col-span-2">Guitarist</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Salary</dt>
            <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Bio</dt>
            <dd className="text-gray-700 sm:col-span-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
              facilis debitis explicabo doloremque impedit nesciunt dolorem
              facere, dolor quasi veritatis quia fugit aperiam aspernatur neque
              molestiae labore aliquam soluta architecto?
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default UserDetails;
