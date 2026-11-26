import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Login from "../../Page/LogIn/LogIn";
import Register from "../../Page/Register/Register";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../Features/Login/LoginSlice";
import { useGetUserQuery } from "../../Features/Login/LoginApi";

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [mobileNavbar, setMobileNavBar] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { data } = useGetUserQuery({});

  React.useEffect(() => {
    setSearchText(searchParams.get("search") ?? "");
  }, [searchParams]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchText.trim();
    setMobileNavBar(false);
    navigate(
      query ? `/allProducts?search=${encodeURIComponent(query)}` : "/allProducts"
    );
  };

  const clearSearch = () => {
    setSearchText("");
    setMobileNavBar(false);
    navigate("/allProducts");
  };

  const searchForm = (className: string) => (
    <form
      role="search"
      onSubmit={submitSearch}
      className={`flex min-w-0 items-center rounded-full border border-haven-border bg-haven-muted px-4 py-2.5 transition focus-within:border-haven-primary/50 ${className}`}
    >
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
        aria-label="Search products"
        placeholder="Search artisan cheeses, heritage meats, chef spices..."
        className="min-w-0 flex-1 bg-transparent text-xs text-haven-ink outline-none placeholder:text-haven-mutedInk"
      />
      {searchText && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear product search"
          className="ml-2 px-1 text-base leading-none text-haven-mutedInk hover:text-haven-primary"
        >
          ×
        </button>
      )}
      <button
        type="submit"
        aria-label="Search products"
        className="ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-haven-primary text-base text-white transition hover:bg-haven-primaryHover"
      >
        <span aria-hidden="true">⌕</span>
      </button>
    </form>
  );

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    window.location.reload();
  };

  const closeLoginForm = () => setShowLoginModal(false);
  const closeRegisterForm = () => setShowRegisterModal(false);

  const navLinks = (
    <>
      <Link to="/" onClick={() => setMobileNavBar(false)} className="text-sm font-semibold text-haven-primary">Home</Link>
      <Link to="/allProducts" onClick={() => setMobileNavBar(false)} className="text-sm font-semibold text-haven-mutedInk transition hover:text-haven-primary">All products</Link>
      <Link to="/brands" onClick={() => setMobileNavBar(false)} className="text-sm font-semibold text-haven-mutedInk transition hover:text-haven-primary">Artisan brands</Link>
      <a href="/#feast-box" onClick={() => setMobileNavBar(false)} className="text-sm font-semibold text-haven-mutedInk transition hover:text-haven-primary">Chef specials</a>
      <Link to="/allProducts" onClick={() => setMobileNavBar(false)} className="text-sm font-semibold text-haven-mutedInk transition hover:text-haven-primary">Daily deals</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-haven-border bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-haven-green px-4 py-2 text-[10px] font-semibold text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <p>Free artisan delivery on your first order over $35 with code <strong className="text-haven-greenLight">WELCOMEHAVEN</strong></p>
          <p className="hidden sm:block">Farm-to-fork direct <span className="mx-2 opacity-50">|</span> Same-day cold-chain express</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link to="/" className="shrink-0 font-display text-lg font-bold tracking-tight text-haven-primary sm:text-xl">
          Foodie Haven
        </Link>
        {searchForm("hidden flex-1 lg:flex")}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-5">
            {navLinks}
          </nav>
          <div className="h-6 border-l border-haven-border" />
          {data?.data?.email ? (
            <button
              onClick={handleLogOut}
              className="rounded-lg bg-haven-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-haven-primaryHover"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => setShowLoginModal(true)} className="text-xs font-bold text-haven-mutedInk hover:text-haven-primary">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="rounded-lg bg-haven-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-haven-primaryHover">Join us</button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setMobileNavBar(!mobileNavbar)}
          aria-expanded={mobileNavbar}
          aria-label={mobileNavbar ? "Close navigation menu" : "Open navigation menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-haven-border text-haven-ink md:hidden"
        >
          <span aria-hidden="true">{mobileNavbar ? "×" : "☰"}</span>
        </button>
      </div>
      {mobileNavbar && (
        <div className="border-t border-haven-border bg-white px-5 py-4 md:hidden">
          {searchForm("mb-5 w-full")}
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {navLinks}
            {data?.data?.email ? (
              <button onClick={handleLogOut} className="self-start rounded-lg bg-haven-primary px-4 py-2 text-xs font-bold text-white">Logout</button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setShowLoginModal(true)} className="text-sm font-bold text-haven-primary">Login</button>
                <button onClick={() => setShowRegisterModal(true)} className="text-sm font-bold text-haven-primary">Register</button>
              </div>
            )}
          </nav>
        </div>
      )}
      {showLoginModal && <Login closeForm={closeLoginForm} />}
      {showRegisterModal && <Register closeForm={closeRegisterForm} />}
    </header>
  );
};

export default NavBar;
