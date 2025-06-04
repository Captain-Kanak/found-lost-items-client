import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import SocialSignIn from "../components/SocialSignIn/SocialSignIn";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // get form data
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // sign in user with email & password
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);

        navigate("/");
        Swal.fire({
          title: "Welcome Back",
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
  };

  return (
    <div className="py-6">
      <form onSubmit={handleSignIn}>
        <h1 className="text-center text-2xl font-bold">Login Your Account</h1>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs mx-auto border p-4 mt-5">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter Password"
          />

          <button className="btn btn-neutral mt-4">Login</button>
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

export default SignIn;
