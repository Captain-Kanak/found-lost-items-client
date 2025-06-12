import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (!user) {
    return <Navigate to="/signIn" state={location?.pathname} />;
  }

  return children;
};

export default PrivateRouter;
