import axios from "axios";

const instance = axios.create({
  baseURL: "https://find-lost-items-server-psi.vercel.app",
  // baseURL: "http://localhost:3000",
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
