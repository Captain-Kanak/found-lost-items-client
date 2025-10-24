import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://find-lost-items-server-psi.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      if (user && !config.headers.Authorization) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for token refresh
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If the error is 401 (Unauthorized) and it hasn't been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark as retried to prevent infinite loops

        try {
          // Force token refresh
          const newToken = await user.getIdToken(true);
          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return instance(originalRequest);
        } catch (refreshError) {
          console.error(
            "Failed to refresh token or user not logged in:",
            refreshError
          );
          // If token refresh fails, or user is truly unauthorized/logged out
          // You might want to log the user out and redirect to login
          if (signOutUser) {
            await signOutUser();
            navigate("/login");
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
