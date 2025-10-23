import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import SocialSignIn from "../components/SocialSignIn/SocialSignIn";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(async () => {
        navigate(from, { replace: true });
        Swal.fire({
          title: "Welcome Back!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        // update user lastSignIn Time
        await axiosPublic.patch(`/users?email=${email}`, {
          lastSignIn: new Date().toISOString(),
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 lg:py-0">
      <Helmet>
        <title>Sign In - App</title>
      </Helmet>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl lg:shadow-lg p-4 lg:p-8 border border-white/40">
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Login to Your Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Sign In */}
        <SocialSignIn from={from} />

        {/* Register Link */}
        <p className="mt-5 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
