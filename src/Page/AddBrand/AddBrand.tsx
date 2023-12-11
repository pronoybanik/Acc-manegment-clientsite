import { useEffect, useState } from "react";
import { useCreateBrandMutation } from "../../Features/Brands/BrandsAPi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import Errors from "../../Shared/Errors/Errors";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const AddBrand = () => {
  const [createBrand, { isSuccess, isLoading, isError, error }] =
    useCreateBrandMutation();
  const [selectedFileCount, setSelectedFileCount] = useState(0);
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
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      const count = files.length;
      setSelectedFileCount(count);
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      alert(" Brand is created");
      navigate("/brands");
    }
  }, [isSuccess, isError, navigate]);

  const handleCreateBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      brandName: { value: string };
      location: { value: string };
      brandImage: { files: FileList };
      description: { value: string };
    };

    const brandName = target.brandName.value;
    const location = target.location.value;
    const brandImage = target.brandImage.files[0];
    const description = target.description.value;

    const formData = new FormData();
    formData.append("image", brandImage);

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
      const brandImageUrl = imgData.data.url;
      createBrand({
        name: brandName,
        description: description,
        location: location,
        image: brandImageUrl,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12 mt-4">
            <p className="text-3xl my-2">Create Brand </p>

            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleCreateBrand} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Brand Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Brand Name"
                  type="text"
                  name="brandName"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="location">
                    Location
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="location"
                    type="text"
                    name="location"
                  />
                </div>

                <div className="mt-1 flex items-center space-x-4">
                  <label className="bg-blue-500 text-xs  hover:bg-blue-600 text-white rounded-lg px-4 py-3 cursor-pointer">
                    Upload Brand Image
                    <input
                      type="file"
                      className="hidden"
                      id="nationalIdImageURL"
                      required
                      name="nationalIdImageURL"
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

              <div>
                <label className="sr-only" htmlFor="message">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Description Brand"
                  name="description"
                ></textarea>
              </div>

              <div>{isError && <Errors>{getErrorText(error)}</Errors>}</div>

              <div className="mt-4">
                <PrimaryButton>
                  {isLoading ? (
                    <div className="animate-pulse">Loading..</div>
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

export default AddBrand;
