import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://find-lost-items-server-psi.vercel.app",
  // baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
