import React, { useState } from "react";
import { useCreateAccountMutation } from "../../Features/Register/RegisterApi";

interface LoginProps {
  closeForm: () => void;
}

const Register: React.FC<LoginProps> = ({ closeForm }) => {

  const [selectedFileCount, setSelectedFileCount] = useState(0);
  const [createAccount] = useCreateAccountMutation();

  // image file counter
  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      const count = files.length;
      setSelectedFileCount(count);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      shippingAddress: { value: string };
      presentAddress: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      profileImage: { files: FileList };
    };

    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const shippingAddress = target.shippingAddress.value;
    const presentAddress = target.presentAddress.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;
    const imageURL = target.profileImage.files[0];

    const formData = new FormData();
    formData.append("image", imageURL);

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
      const profileImageUrl = imgData.data.url;
      createAccount({
        firstName,
        lastName,
        email,
        shippingAddress,
        presentAddress,
        password,
        confirmPassword,
        imageURL: profileImageUrl,
      });

      alert("Account Register");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto  ">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Add your login form content here */}

          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <button
                className="text-gray-600 hover:text-gray-800 absolute top-4 right-4"
                onClick={closeForm}
              >
                Close
              </button>

              <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Get started today!
                  </h1>

                  <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    libero nulla eaque error neque ipsa culpa autem, at itaque
                    nostrum!
                  </p>
                </div>

             <section>
             <form onSubmit={handleRegister} action="">
                  <div className="flex gap-4 mb-2">
                    {/* first Name */}
                    <div>
                      <label htmlFor="firstName" className="sr-only">
                        First Name
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="First Name"
                          name="firstName"
                        />
                      </div>
                    </div>
                    {/* last Name */}
                    <div>
                      <label htmlFor="lastName" className="sr-only">
                        Last Name
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Last Name"
                          name="lastName"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Email  */}
                  <div className="mb-2">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        name="email"
                      />

                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* shipping Address */}
                  <div className="mb-2">
                    <label htmlFor="shippingAddress" className="sr-only">
                      shipping Address
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Shipping Address"
                        name="shippingAddress"
                      />
                    </div>
                  </div>
                  {/* present Address */}
                  <div className="mb-2">
                    <label htmlFor="email" className="sr-only">
                      present Address
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Present Address"
                        name="presentAddress"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mb-2 ">
                    {/* password */}
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Password
                      </label>

                      <div className="relative">
                        <input
                          type="password"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                    </div>
                    {/* confirmPassword */}
                    <div>
                      <label htmlFor="confirmPassword" className="sr-only">
                        confirm Password
                      </label>

                      <div className="relative">
                        <input
                          type="password"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                        />
                      </div>
                    </div>
                  </div>
                  {/* profile Image */}
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="productImage"
                    >
                      Upload Product Image
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <label className="bg-[#98CB4C] hover:bg-[#a1d84f] text-white rounded-lg px-4 py-2 cursor-pointer">
                        Browse
                        <input
                          type="file"
                          className="hidden"
                          id="profileImage"
                          name="profileImage"
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

                  <button
                    type="submit"
                    className="block w-full rounded-lg bg-[#98CB4C] px-5 py-3 text-sm font-medium text-white"
                  >
                    Sign in
                  </button>
                </form>
             </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
