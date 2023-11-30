import { useState, useEffect } from "react";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { useCreateSupplierMutation } from "../../Features/Supplier/Supplier";
import Errors from "../../Shared/Errors/Errors";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useGetUserQuery } from "../../Features/Login/LoginApi";

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

const AddSupplier = () => {
  const { data: brandData, isLoading: brandIsLoading } = useGetBrandQuery({});
  const { data } = useGetUserQuery({});

  const [createSupplier, { isSuccess, isLoading, isError, error }] =
    useCreateSupplierMutation();
  const [selectedFileCount, setSelectedFileCount] = useState(0);

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
    }
  }, [isSuccess]);

  const handleCreateSupplier = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      supplierName: { value: string };
      email: { value: string };
      contactNumber: { value: string };
      emergencyContactNumber: { value: string };
      presentAddress: { value: string };
      option: { value: string };
      location: { value: number };
      permanentAddress: { value: string };
      nationalIdImageURL: { files: FileList };
    };

    const name = target.supplierName.value;
    const email = target.email.value;
    const contactNumber = target.contactNumber.value;
    const emergencyContactNumber = target.emergencyContactNumber.value;
    const BrandId = target.option.value;
    const presentAddress = target.presentAddress.value;
    const permanentAddress = target.permanentAddress.value;
    const location = target.location.value;
    const nationalIdImageURL = target.nationalIdImageURL.files[0];

    console.log(
      name,
      email,
      contactNumber,
      emergencyContactNumber,
      BrandId,
      presentAddress,
      permanentAddress,
      location,
      nationalIdImageURL
    );

    const formData = new FormData();
    formData.append("image", nationalIdImageURL);

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
      const nationalImageUrl = imgData.data.url;

      createSupplier({
        name,
        email,
        brand: {
          id: BrandId,
        },
        contactNumber,
        emergencyContactNumber,
        presentAddress,
        permanentAddress,
        location,
        nationalIdImageURL: nationalImageUrl,
        imageURL: data?.data?.imageURL,
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
            <p className="text-3xl my-4 lg:mt-44">Create A Supplier: </p>
            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form
              onSubmit={handleCreateSupplier}
              action=""
              className="space-y-4"
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="supplier Name"
                  type="text"
                  id="name"
                  name="supplierName"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="name">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="supplier Email"
                  type="email"
                  id="name"
                  name="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="name">
                  contact Number
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="contact Number"
                  type="text"
                  id="name"
                  name="contactNumber"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="emergencyContactNumber">
                    emergency ContactNumber
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Emergency ContactNumber"
                    type="text"
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="presentAddress">
                    present Address
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Present Address"
                    type="text"
                    name="presentAddress"
                    id="presentAddress"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="location">
                    location
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="location"
                    type="text"
                    name="location"
                    id="location"
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
                  permanentAddress
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="permanentAddress"
                  id="permanentAddress"
                  name="permanentAddress"
                ></textarea>
              </div>

              <div>{isError && <Errors>{error?.data?.error}</Errors>}</div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="nationalIdImageURL"
                >
                  Upload Product Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer">
                    Browse
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

              {/* <div className="relative w-full">
                  <label className="cursor-pointer bg-blue-500 text-white rounded-lg p-2 text-sm font-medium w-full block text-center">
                    Upload Product Image
                    <input
                      type="file"
                      className="hidden"
                      name="nationalIdImageURL"
                      id="nationalIdImageURL"
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

export default AddSupplier;
