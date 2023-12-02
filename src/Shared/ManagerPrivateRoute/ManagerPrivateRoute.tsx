import React from "react";
import { useGetUserQuery } from "../../Features/Login/LoginApi";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

interface ManagerPrivateRouteProps {
  children: React.ReactNode;
}

const ManagerPrivateRoute: React.FC<ManagerPrivateRouteProps> = ({
  children,
}) => {
  const { data, isLoading } = useGetUserQuery({});
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }
  if (data?.data?.role === "storeManager") {
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

export default ManagerPrivateRoute;
