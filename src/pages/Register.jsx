import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import SocialSignIn from "../components/SocialSignIn/SocialSignIn";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase)
      return setErrorMessage(
        "Password must contain at least one uppercase letter."
      );
    if (!hasLowerCase)
      return setErrorMessage(
        "Password must contain at least one lowercase letter."
      );
    if (!isLongEnough)
      return setErrorMessage("Password must be at least 6 characters long.");

    // Create user
    createUser(email, password)
      .then(() => {
        const userInfo = { displayName: name, photoURL: photo };
        updateUserProfile(userInfo)
          .then(() => {
            form.reset();
            navigate("/");
            Swal.fire({
              title: "🎉 Account Created Successfully!",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Profile Update Failed",
              text: error.message,
              icon: "error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Helmet>
        <title>Register - App</title>
      </Helmet>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/40">
        {/* Title */}
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Create a New Account
        </h1>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Enter photo URL"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-center text-red-500 font-medium">
              {errorMessage}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Sign In */}
        <SocialSignIn />

        {/* Sign In Link */}
        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
