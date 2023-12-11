import { useEffect } from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { useCreateStoreMutation } from "../../Features/Store/store";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const AddStore = () => {
  const { data } = useGetUserQuery({});

  const [createStore, { isSuccess, isLoading, isError, error }] =
    useCreateStoreMutation();

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

  useEffect(() => {
    if (isSuccess) {
      alert("Store Create");
    }
  }, [isSuccess]);

  const handleCreateStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      contactNumber: { value: string };
      description: { value: string };
    };

    const storeName = target.name.value;
    const description = target.description.value;
    const managerName = data?.data?.firstName + "" + data?.data?.lastName;
    const contactNumber = target.contactNumber.value;
    const id = data?.data?._id;
    createStore({
      storeName,
      description,
      manager: {
        managerName,
        contactNumber,
        id,
      },
    });
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="text-3xl my-2">Add Store </p>
            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>

            <div className="mt-8">
              <a href="" className="text-2xl font-bold text-pink-600">
                0151 475 4450
              </a>

              <address className="mt-2 not-italic">
                282 Kevin Brook, Imogeneborough, CA 58517
              </address>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleCreateStore} action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Store Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Store Name"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="category">
                    contactNumber
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="contact Number"
                    type="number"
                    id="contactNumber"
                    name="contactNumber"
                  />
                </div>
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

              {isError ? <Errors>{getErrorText(error)} </Errors> : null}
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

export default AddStore;
