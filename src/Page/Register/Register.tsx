import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCreateAccountMutation } from "../../Features/Register/RegisterApi";
import Errors from "../../Shared/Errors/Errors";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface LoginProps {
  closeForm: () => void;
}

const Register: React.FC<LoginProps> = ({ closeForm }) => {
  const [selectedFileCount, setSelectedFileCount] = useState(0);
  const [createAccount, { isSuccess, isLoading, isError, error }] =
    useCreateAccountMutation();
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

  // image file counter
  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      const count = files.length;
      setSelectedFileCount(count);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeForm();
      navigate("/");
    }
  }, [closeForm, isSuccess, navigate]);

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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const inputClassName =
    "w-full rounded-xl border border-[#e1bfb6]/60 bg-[#fdfbf7] px-4 py-3 text-sm text-[#181d1a] outline-none transition placeholder:text-[#8d7169] focus:border-[#a93102] focus:ring-4 focus:ring-[#a93102]/10";
  const labelClassName = "mb-2 block text-sm font-semibold text-[#181d1a]";

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#181d1a]/55 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <section
          aria-labelledby="register-title"
          aria-modal="true"
          className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-[#fff] shadow-[0_24px_64px_-12px_rgba(31,36,33,0.28)]"
          role="dialog"
        >
          <div className="h-1.5 bg-gradient-to-r from-[#2c694e] via-[#a93102] to-[#e6a05b]" />
          <button
            aria-label="Close registration form"
            className="absolute right-5 top-5 rounded-full p-2 text-[#59413a] transition hover:bg-[#f0f5f0] hover:text-[#a93102] focus:outline-none focus:ring-2 focus:ring-[#a93102]/30"
            onClick={closeForm}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" strokeWidth="1.8" />
            </svg>
          </button>

          <div className="px-6 pb-8 pt-8 sm:px-10 sm:pb-10">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbeee8] font-serif text-lg font-bold text-[#a93102]">
                FH
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2c694e]">
                Join our table
              </p>
              <h1 id="register-title" className="font-serif text-3xl font-bold tracking-tight text-[#181d1a]">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#59413a]">
                Meet the makers behind your next favorite meal.
              </p>
            </div>

            <form onSubmit={handleRegister} className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClassName}>
                  First name
                </label>
                <input
                  autoComplete="given-name"
                  className={inputClassName}
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClassName}>
                  Last name
                </label>
                <input
                  autoComplete="family-name"
                  className={inputClassName}
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="register-email" className={labelClassName}>
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className={inputClassName}
                  id="register-email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="shippingAddress" className={labelClassName}>
                  Shipping address
                </label>
                <input
                  autoComplete="shipping street-address"
                  className={inputClassName}
                  id="shippingAddress"
                  name="shippingAddress"
                  placeholder="Where should we deliver?"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="presentAddress" className={labelClassName}>
                  Present address
                </label>
                <input
                  autoComplete="street-address"
                  className={inputClassName}
                  id="presentAddress"
                  name="presentAddress"
                  placeholder="Your current address"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="register-password" className={labelClassName}>
                  Password
                </label>
                <input
                  autoComplete="new-password"
                  className={inputClassName}
                  id="register-password"
                  name="password"
                  placeholder="Create a password"
                  type="password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClassName}>
                  Confirm password
                </label>
                <input
                  autoComplete="new-password"
                  className={inputClassName}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  type="password"
                />
              </div>

              <div className="sm:col-span-2" aria-live="polite">
                {isError && <Errors>{getErrorText(error)}</Errors>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="profileImage" className={labelClassName}>
                  Profile photo
                </label>
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[#e1bfb6] bg-[#fdfbf7] p-3">
                  <label
                    className="cursor-pointer rounded-lg bg-[#2c694e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24563f] focus-within:ring-4 focus-within:ring-[#2c694e]/20"
                    htmlFor="profileImage"
                  >
                    Choose photo
                    <input
                      accept="image/*"
                      className="sr-only"
                      id="profileImage"
                      name="profileImage"
                      onChange={handleFileChange}
                      required
                      type="file"
                      multiple
                    />
                  </label>
                  <span className="text-sm text-[#59413a]">
                    {selectedFileCount === 1
                      ? "1 file selected"
                      : `${selectedFileCount} files selected`}
                  </span>
                  <span className="w-full text-xs text-[#8d7169]">
                    Add a photo so your community can put a face to your name.
                  </span>
                </div>
              </div>

              <button
                aria-busy={isLoading}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#a93102] px-5 py-3.5 text-sm font-bold text-white shadow-[0_6px_16px_-4px_rgba(169,49,2,0.35)] transition hover:-translate-y-0.5 hover:bg-[#8f2a05] focus:outline-none focus:ring-4 focus:ring-[#a93102]/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                type="submit"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-[#59413a]">
              Thoughtfully sourced. Happily shared.
            </p>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
};

export default Register;
