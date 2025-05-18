import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenCustomer } from "../helper/useCookie";
import path from "../constants/path";

const withAuth = (Component: React.ComponentType<any>) => {
  const AuthRoute = () => {
    const token = getTokenCustomer();

    if (!token) {
      return <Navigate to={path.loginScreen} />;
    }
    return <Component />;
  };

  return AuthRoute;
};

export default withAuth;
