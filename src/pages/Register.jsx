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

    // get form data
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation rules
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      return setErrorMessage(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!hasLowerCase) {
      return setErrorMessage(
        "Password must contain at least one lowercase letter."
      );
    }

    if (!isLongEnough) {
      return setErrorMessage("Password must be at least 6 characters long.");
    }

    // create user
    createUser(email, password)
      .then(() => {
        const userInfo = {
          displayName: name,
          photoURL: photo,
        };

        updateUserProfile(userInfo)
          .then(() => {
            form.reset(); // Clear form
            navigate("/");
            Swal.fire({
              title: "Account Created Successfully!",
              icon: "success",
              timer: 1000,
              didOpen: () => {
                Swal.showLoading();
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Profile Update Failed!",
              text: error.message,
              icon: "error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed!",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>Register - App</title>
      </Helmet>
      <form onSubmit={handleRegister}>
        <h1 className="text-center text-2xl font-bold">Create a New Account</h1>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs mx-auto border p-4 mt-5">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Enter Name"
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter Email"
          />

          <label className="label">Photo</label>
          <input
            type="url"
            name="photo"
            className="input"
            placeholder="Enter Photo URL"
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter Password"
          />

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p className="text-center text-red-500">{errorMessage}</p>
      </form>
      <div className="w-xs mx-auto divider">OR</div>
      <SocialSignIn />
      <div className="mt-3 flex items-center gap-1 justify-center w-xs mx-auto font-medium">
        <p>Already Have an Account?</p>
        <Link to="/signin" className="underline">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Register;
