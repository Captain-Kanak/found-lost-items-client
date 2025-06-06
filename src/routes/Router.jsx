import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../navigations/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import FoundLostItems from "../navigations/FoundLostItems";
import AddLostFoundItem from "../pages/AddLostFoundItem";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/found-lost-items",
        Component: FoundLostItems,
      },
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/add-lost-found-item",
        element: <AddLostFoundItem />,
      },
    ],
  },
]);
