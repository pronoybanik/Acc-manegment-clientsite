import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetUserQuery } from "../../Features/Login/LoginApi";

const ManagerNavBar = () => {
  const [bar, setBar] = useState(true);
  const { data } = useGetUserQuery({});

  return (
    <section>
      <div
        onClick={() => setBar(!bar)}
        className="cursor-pointer ml-2 w-14  my-2 border-4 p-0"
      >
        <img src="https://img.icons8.com/?size=50&id=1056&format=png" alt="" />
      </div>

      <section className={bar ? "grid grid-cols-4" : ""}>
        <div className="ml-2">
          {bar === true ? (
            <div className="flex h-[800px] flex-col justify-between border bg-white">
              <div className="px-4 py-6">
                <div className="flex gap-4">
                  <span className="cursor-pointer grid h-10 w-52 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    <div className="flex gap-1 font-serif ">
                      <p className="lg:text-xl md:text-lg text-sm font-semibold text-[#88B644]">
                        Foodie
                      </p>
                      <p className="lg:text-2xl md:text-lg text-sm font-semibold text-[#88B644]">
                        .
                      </p>
                      <p className="lg:text-2xl md:text-lg text-sm font-semibold text-[#98cb4c]">
                        Haven
                      </p>
                    </div>
                  </span>
                </div>

                <ul className="mt-6 space-y-1">
                  <li>
                    <Link
                      to="/managerDashBoard/allBrand"
                      className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      All Brands
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/managerDashBoard/allOrder"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      All Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/managerDashBoard/allUser"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      All User
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/managerDashBoard/allSupplier"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      All supplier
                    </Link>
                  </li>

                  <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <span className="text-sm font-medium"> Stock </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>

                      <ul className="mt-2 space-y-1 px-4">
                        <li>
                          <Link
                            to="/managerDashBoard/createStock"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            create stock
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/managerDashBoard/allStock"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            All Stock
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>

                  <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <span className="text-sm font-medium"> Account </span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>

                      <ul className="mt-2 space-y-1 px-4">
                        <li>
                          <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            Details
                          </a>
                        </li>

                        <li>
                          <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            Security
                          </a>
                        </li>

                        <li>
                          <form action="/logout">
                            <button
                              type="submit"
                              className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                            >
                              Logout
                            </button>
                          </form>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>

              <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                >
                  <img
                    alt="Man"
                    src={data?.data?.imageURL}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-xs">
                      <strong className="block font-medium">
                        {data?.data?.firstName} {data?.data?.lastName}
                      </strong>

                      <span> {data?.data?.email}</span>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ) : null}
        </div>

        <div className=" col-span-3 ml-4">
          <Outlet />
        </div>
      </section>
    </section>
  );
};

export default ManagerNavBar;
