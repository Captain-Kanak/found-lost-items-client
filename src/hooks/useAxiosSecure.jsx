import axios from "axios";
// import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://find-lost-items-server-psi.vercel.app",
});

const useAxiosSecure = () => {
  // const { user } = useAuth();

  return instance;
};

export default useAxiosSecure;
