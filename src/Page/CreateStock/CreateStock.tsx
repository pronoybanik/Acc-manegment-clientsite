import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { useGetAllSupplierQuery } from "../../Features/Supplier/Supplier";
import { useCreateStockMutation } from "../../Features/Stock/Stock";
import { useNavigate } from "react-router-dom";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type BrandData = {
  _id: string;
  name: string;
  description: string;
  email: string;
  location: string;
  products: {
    brand: {
      name: string;
      id: string;
    };
    _id: string;
    name: string;
    description: string;
    unit: string;
    imageURLs: string[];
    category: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status: string;
  createdAt: string;
  price: number;
  updatedAt: string;
  image: string;
};

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

const CreateStock = () => {
  const { data: brandData, isLoading: brandIsLoading } = useGetBrandQuery({});
  const { data, isLoading } = useGetAllSupplierQuery({});
  const [selectedFileCount, setSelectedFileCount] = React.useState(0);
  const [createStock, { isSuccess, error, isError }] = useCreateStockMutation();
  const navigate = useNavigate();

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

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement; // Cast to HTMLInputElement
    const files = inputElement.files; // Access the files property

    if (files) {
      const count = files.length;
      setSelectedFileCount(count);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      alert("stock create ");
      navigate("/managerDashBoard/allStock");
    }
  }, [isSuccess, navigate]);

  const handleStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      productName: { value: string };
      category: { value: string };
      quantity: { value: string };
      unit: { value: string };
      option: { value: string };
      option1: { value: string };
      price: { value: number };
      description: { value: string };
      productImage: { files: FileList };
    };

    const productName = target.productName.value;
    const category = target.category.value;
    const quantity = target.quantity.value;
    const unit = target.unit.value;
    const BrandId = target.option.value;
    const supplierId = target.option1.value;
    const description = target.description.value;
    const ProductPrice = target.price.value;
    const productImage = target.productImage.files[0];

    const formData = new FormData();
    formData.append("image", productImage);

    const url =
      "https://api.imgbb.com/1/upload?key=99f58a547dc4b1d269148eb1b605ef29";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const imgData = await response.json();
      const productImageUrl = imgData.data.url;
      createStock({
        name: productName,
        description: description,
        brand: {
          id: BrandId,
        },
        supplied: {
          id: supplierId,
        },
        price: ProductPrice,
        category: category,
        unit: unit,
        imageURLs: productImageUrl,
        quantity,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className=" gap-x-16 gap-y-8 ">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleStore} action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Product Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Product Name"
                  type="text"
                  name="productName"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="quantity">
                    quantity
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Quantity"
                    type="number"
                    name="quantity"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="unit">
                    unit
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="unit"
                    type="text"
                    name="unit"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="price">
                    price
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="price"
                    type="number"
                    name="price"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="category">
                    category
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="category"
                    type="text"
                    name="category"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs" htmlFor="category">
                  Supplier Name:
                </label>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 text-center">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    data?.data?.map((data: UserData, index: number) => (
                      <div key={data?._id}>
                        <input
                          className="peer sr-only"
                          id={`option1${index + 1}`}
                          type="radio"
                          name="option1"
                          defaultValue={data?._id}
                        />
                        <label
                          htmlFor={`option1${index + 1}`}
                          className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                        >
                          <div className="text-sm flex gap-2">
                            {data?.name}{" "}
                            <div className="font-semibold">
                              ( {data?.brand?.id?.name})
                            </div>
                          </div>
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs" htmlFor="category">
                  Brand Name:
                </label>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 text-center">
                  {brandIsLoading ? (
                    <div>Loading...</div>
                  ) : (
                    brandData?.data?.brands.map(
                      (data: BrandData, index: number) => (
                        <div key={data?._id}>
                          <input
                            className="peer sr-only"
                            id={`option${index + 1}`}
                            type="radio"
                            name="option"
                            defaultValue={data?._id}
                          />
                          <label
                            htmlFor={`option${index + 1}`}
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                          >
                            <span className="text-sm"> {data?.name} </span>
                          </label>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="description">
                  description
                </label>

                <textarea
                  className="w-full rounded-lg pb-10 border-gray-200 p-3 text-sm"
                  placeholder="description"
                  name="description"
                ></textarea>
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="productImage"
                >
                  Upload Product Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer">
                    Browse
                    <input
                      type="file"
                      className="hidden"
                      id="productImage"
                      required
                      name="productImage"
                      onChange={handleFileChange}
                      multiple // Allow multiple file selection
                    />
                  </label>
                  <span className="text-gray-500">
                    {selectedFileCount === 1
                      ? "1 file selected"
                      : `${selectedFileCount} files selected`}
                  </span>
                </div>
              </div>
              <div>{isError && <Errors>{getErrorText(error)}</Errors>}</div>

              <div className="mt-4">
                <PrimaryButton>Submit</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateStock;
