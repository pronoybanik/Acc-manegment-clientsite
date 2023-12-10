import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useLoginAccountMutation,
} from "../../Features/Login/LoginApi";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import Errors from "../../Shared/Errors/Errors";

interface LoginProps {
  closeForm?: () => void;
}

const LogIn: React.FC<LoginProps> = ({ closeForm }) => {
  const [
    loginAccount,
    { data: loginData, isLoading: loginLoading, error: loginError },
  ] = useLoginAccountMutation();

  const { data } = useGetUserByIdQuery(loginData?.data?.user?._id);
  const navigate = useNavigate();

  const location = useLocation();
  const navigateForm = location.state?.from?.pathname || "/";

  // Error HandleIng...
  let content = null;
  if (loginLoading) {
    content = <p>Loading..</p>;
  }
  if (!loginLoading && loginError?.data?.status === "fail") {
    content = <Errors>{loginError?.data?.error}</Errors>;
  }
  if (!loginLoading && !loginError && data?.status === "success") {
    setTimeout(() => {
      alert("Login SuccessFull");
      navigate(navigateForm, { replace: true });
      window.location.reload();
    }, 1000);
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    loginAccount({
      email,
      password,
    });
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
                className="text-gray-600 shadow-2xl hover:text-gray-800 absolute top-4 right-4"
                onClick={closeForm}
              >
                Close
              </button>

              <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl pb-4">
                    please Login Your Account!
                  </h1>
                </div>

                <form
                  action=""
                  onSubmit={handleLogin}
                  className="mx-auto mb-0 mt-8 max-w-2xl space-y-4"
                >
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        className="w-full border-2 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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

                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        className="w-full border-2 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                        name="password"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {content}

                  <div className="flex justify-center">
                    <PrimaryButton>
                      {loginLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <div>Sing in</div>
                      )}{" "}
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
