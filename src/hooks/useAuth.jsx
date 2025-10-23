"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosPublic from "./useAxiosPublic";

const useAuth = () => {
  const context = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const {
    user: firebaseUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    signOutUser,
  } = context;

  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch DB user whenever Firebase user changes
  useEffect(() => {
    const fetchDbUser = async () => {
      try {
        setDbLoading(true);
        setError(null);

        if (!firebaseUser?.email) {
          setDbUser(null);
          setDbLoading(false);
          return;
        }

        // Fetch DB user
        const res = await axiosPublic.get(`/users?email=${firebaseUser.email}`);

        setDbUser(res.data);
      } catch (err) {
        console.error("Error fetching DB user:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setDbLoading(false);
      }
    };

    fetchDbUser();
  }, [axiosPublic, firebaseUser]);

  return {
    user: firebaseUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    signOutUser,

    // DB user, loading and error
    dbUser,
    dbLoading,
    error,
  };
};

export default useAuth;
