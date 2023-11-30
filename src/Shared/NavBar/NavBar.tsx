import React from "react";
import Login from "../../Page/Login/Login";
import Register from "../../Page/Register/Register";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../Features/Login/LoginSlice";
import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);

  const dispatch = useDispatch();

  const { data } = useGetUserQuery({});

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    window.location.reload();
  };

  const closeLoginForm = () => {
    setShowLoginModal(false);
  };
  const closeRegisterForm = () => {
    setShowRegisterModal(false);
  };

  const menuItem = (
    <>
      <li>
        <Link
          to="/"
          className="cursor-pointer  leading-2  text-white relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          className="cursor-pointer  leading-2  text-white relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
          to="/brands"
        >
          Brands
        </Link>
      </li>

      <li>
        <Link
          className="cursor-pointer  leading-2  text-white relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
          to="/allProducts"
        >
          all Products
        </Link>
      </li>

      <li>
        <Link
          className="cursor-pointer  leading-2  text-white relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
          to="/addCard"
        >
          Order Products
        </Link>
      </li>

      <li>
        <Link
          className="cursor-pointer  leading-2  text-white relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-[#98CB4C] before:transition hover:before:scale-x-100"
          to="/managerDashBoard"
        >
          Manager DashBoard
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-[#000000] sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block">
              <span className="sr-only">Home</span>
              <div className="flex gap-1 font-serif ">
                <p className="lg:text-2xl md:text-lg text-sm font-semibold text-[#88B644]">
                  Foodie
                </p>
                <p className="lg:text-2xl md:text-lg text-sm font-semibold text-[#88B644]">
                  .
                </p>
                <p className="lg:text-2xl md:text-lg text-sm font-semibold text-[#98cb4c]">
                  Haven
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">{menuItem}</ul>
            </nav>
          </div>

          <div className="flex items-center gap-4 ">
            <div className="flex gap-2">
              {!data?.data?.email ? (
                <>
                  <button
                    className="text-white"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </button>

                  <p className="text-white mt-2">/</p>

                  <button
                    className="text-white"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="text-white bg-black px-5 py-2"
                >
                  Logout
                </button>
              )}

              {showLoginModal && <Login closeForm={closeLoginForm} />}
              {showRegisterModal && <Register closeForm={closeRegisterForm} />}
              {/* {data?.data?.email ? (
               
              ) : null} */}
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
