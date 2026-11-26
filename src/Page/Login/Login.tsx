import React from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "../../Features/Login/LoginApi";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface LoginProps {
  closeForm?: () => void;
}

const LogIn: React.FC<LoginProps> = ({ closeForm }) => {
  const [
    loginAccount,
    { isLoading: loginLoading, error: loginError, isError, isSuccess },
  ] = useLoginAccountMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateForm = location.state?.from?.pathname || "/";

  React.useEffect(() => {
    if (!isSuccess) return;

    closeForm?.();
    navigate(navigateForm, { replace: true });
  }, [closeForm, isSuccess, navigate, navigateForm]);

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

  let content = null;
  if (loginLoading) {
    content = <p>Loading..</p>;
  }
  if (!loginLoading && isError && loginError) {
    content = <Errors>{getErrorText(loginError)}</Errors>;
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

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#181d1a]/55 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <section
          aria-labelledby="login-title"
          aria-modal="true"
          className="relative my-6 w-full max-w-md overflow-hidden rounded-3xl bg-[#fff] shadow-[0_24px_64px_-12px_rgba(31,36,33,0.28)]"
          role="dialog"
        >
          <div className="h-1.5 bg-gradient-to-r from-[#2c694e] via-[#a93102] to-[#e6a05b]" />
          <button
            aria-label="Close login form"
            className="absolute right-5 top-5 rounded-full p-2 text-[#59413a] transition hover:bg-[#f0f5f0] hover:text-[#a93102] focus:outline-none focus:ring-2 focus:ring-[#a93102]/30"
            onClick={closeForm}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" strokeWidth="1.8" />
            </svg>
          </button>

          <div className="px-6 pb-8 pt-9 sm:px-10 sm:pb-10">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbeee8] font-serif text-lg font-bold text-[#a93102]">
                FH
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2c694e]">
                Welcome back
              </p>
              <h1 id="login-title" className="font-serif text-3xl font-bold tracking-tight text-[#181d1a]">
                Sign in to Foodie Haven
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#59413a]">
                Your favorite artisan finds are just around the table.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-[#181d1a]">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#e1bfb6]/60 bg-[#fdfbf7] px-4 py-3 text-sm text-[#181d1a] outline-none transition placeholder:text-[#8d7169] focus:border-[#a93102] focus:ring-4 focus:ring-[#a93102]/10"
                  id="login-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-[#181d1a]">
                  Password
                </label>
                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#e1bfb6]/60 bg-[#fdfbf7] px-4 py-3 text-sm text-[#181d1a] outline-none transition placeholder:text-[#8d7169] focus:border-[#a93102] focus:ring-4 focus:ring-[#a93102]/10"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                />
              </div>

              <div aria-live="polite">
                {content}
              </div>
              <button
                aria-busy={loginLoading}
                className="flex w-full items-center justify-center rounded-xl bg-[#a93102] px-5 py-3.5 text-sm font-bold text-white shadow-[0_6px_16px_-4px_rgba(169,49,2,0.35)] transition hover:-translate-y-0.5 hover:bg-[#8f2a05] focus:outline-none focus:ring-4 focus:ring-[#a93102]/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
              >
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-[#59413a]">
              A better pantry starts with the people who make it.
            </p>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
};

export default LogIn;
