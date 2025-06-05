import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import SocialSignIn from "../components/SocialSignIn/SocialSignIn";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // get form data
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // create user with email & password
    createUser(email, password)
      .then(() => {
        // create user info for update profile
        const userInfo = {
          displayName: name,
          photoURL: photo,
        };

        // update user profile
        updateUserProfile(userInfo)
          .then(() => {
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
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-6">
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
