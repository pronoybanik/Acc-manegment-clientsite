import React from "react";
import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data, isLoading } = useGetUserQuery({});
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }
  if (data?.data?.role === "buyer") {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    ></Navigate>
  );
};

export default PrivateRoute;
