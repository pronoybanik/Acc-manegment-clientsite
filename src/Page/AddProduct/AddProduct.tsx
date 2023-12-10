import React, { useEffect, useState } from "react";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { useCreateProductMutation } from "../../Features/Products/ProductApi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import Errors from "../../Shared/Errors/Errors";
import { useNavigate } from "react-router-dom";
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

const AddProduct = () => {
  const [selectedFileCount, setSelectedFileCount] = useState(0);
  const [createProduct, { isSuccess, isLoading, isError, error }] =
    useCreateProductMutation();
  const { data: brandData, isLoading: brandIsLoading } = useGetBrandQuery({});
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

  useEffect(() => {
    if (isSuccess) {
      alert(" Your product is Add");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      productName: { value: string };
      category: { value: string };
      unit: { value: string };
      option: { value: string };
      price: { value: number };
      description: { value: string };
      brandName: { value: string };
      productImage: { files: FileList };
    };

    const productName = target.productName.value;
    const category = target.category.value;
    const unit = target.unit.value;
    const BrandId = target.option.value;
    const BrandName = target.brandName.value;
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
      createProduct({
        name: productName,
        description: description,
        brand: {
          name: BrandName,
          id: BrandId,
        },
        price: ProductPrice,
        category: category,
        unit: unit,
        imageURLs: productImageUrl,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="text-3xl my-2 lg:mt-40">Create Product </p>
            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form
              onSubmit={handleCreateProduct}
              action=""
              className="space-y-4"
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  product Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Product Name"
                  type="text"
                  id="name"
                  name="productName"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="category">
                    category
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="category"
                    type="text"
                    id="category"
                    name="category"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="unit">
                    unit
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="unit"
                    type="text"
                    name="unit"
                    id="unit"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="price">
                    price
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="price"
                    type="text"
                    name="price"
                    id="price"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="price">
                    Brand Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Brand Name"
                    type="text"
                    name="brandName"
                    id="brandName"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 text-center">
                {brandIsLoading ? (
                  <div>Loading...</div>
                ) : (
                  brandData?.data?.brands.map((data: BrandData, index: number) => (
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
                  ))
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Description"
                  id="description"
                  name="description"
                ></textarea>
              </div>

              <div>{isError && <Errors>{getErrorText(error)}</Errors>}</div>

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

              {/* <div className="relative w-full">
                <label className="cursor-pointer bg-blue-500 text-white rounded-lg p-2 text-sm font-medium w-full block text-center">
                  Upload Product Image
                  <input
                    type="file"
                    className="hidden"
                    name="productImage"
                    id="productImage"
                  />
                </label>
              </div> */}

              <div className="mt-4">
                <PrimaryButton>
                  {isLoading ? (
                    <div className="animate-pulse">Loading...</div>
                  ) : (
                    <div>submit</div>
                  )}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
