import { useEffect } from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useDeleteSupplierMutation } from "../../Features/Supplier/Supplier";

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

const SupplierItem = ({ data }: { data: UserData }) => {
  const [deleteSupplier, { isSuccess }] = useDeleteSupplierMutation();

  const {
    _id,
    brand,
    contactNumber,
    email,
    emergencyContactNumber,
    status,
    imageURL,
    name,
  } = data;

  const handleDelete = (id: string) => {
    if (id) {
      deleteSupplier(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Delete Supplier");
    }
  }, [isSuccess]);

  const descriptionSlice = brand?.id?.description.slice(0, 250);

  return (
    <div>
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {name}
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-600">{email}</p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Contact Number: {contactNumber}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Emergency Contact: {emergencyContactNumber}
            </p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt="Paul Clapton"
              src={imageURL}
              className="h-16 w-16 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="w-full text-sm text-gray-500">{descriptionSlice}</p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              Brand: {brand?.id?.name}
            </dt>
            <dd className="text-xs text-gray-500"> status: {status}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              Location: {brand?.id?.location}
            </dt>
          </div>
          <div
            onClick={() => handleDelete(_id)}
            className="flex items-end   -mb-2  lg:ml-28"
          >
            <PrimaryButton>Delete</PrimaryButton>
          </div>
        </dl>
      </a>
    </div>
  );
};

export default SupplierItem;
