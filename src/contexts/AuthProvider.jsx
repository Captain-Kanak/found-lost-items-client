import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
// import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // firebase auth functions
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(false);
    return signOut(auth);
  };

  const googleSignIn = () => {
    setLoading(false);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (userInfo) => {
    setLoading(false);
    return updateProfile(auth.currentUser, userInfo);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // if (currentUser?.email) {
      //   const userData = { email: currentUser.email };
      //   axios
      //     .post("http://localhost:3000/jwt", userData, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const contexts = {
    loading,
    user,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
