import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contexts = {
    user,
    setUser
  };

  return <AuthContext value={contexts}>{children}</AuthContext>;
};

export default AuthProvider;
