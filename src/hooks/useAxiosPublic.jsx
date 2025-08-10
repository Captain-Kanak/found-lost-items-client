import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "https://find-lost-items-server-psi.vercel.app",
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
