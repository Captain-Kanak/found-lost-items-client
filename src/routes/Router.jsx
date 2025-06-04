import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../navigations/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/signIn",
        Component: SignIn,
      },
    ],
  },
]);
