import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../navigations/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import FoundLostItems from "../navigations/FoundLostItems";
import AddLostFoundItem from "../pages/AddLostFoundItem";
import ItemDetails from "../pages/ItemDetails";
import PrivateRouter from "./PrivateRouter";
import MyItems from "../pages/MyItems";
import RecoveredItems from "../pages/RecoveredItems";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      {
        path: "/found-lost-items",
        Component: FoundLostItems,
      },
      {
        path: "/items/:id",
        loader: ({ params }) =>
          fetch(
            `https://find-lost-items-server-psi.vercel.app/items/${params.id}`
          ),
        Component: ItemDetails,
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
        path: "/addItems",
        element: (
          <PrivateRouter>
            <AddLostFoundItem />
          </PrivateRouter>
        ),
      },
      {
        path: "/allRecovered",
        element: (
          <PrivateRouter>
            <RecoveredItems />
          </PrivateRouter>
        ),
      },
      {
        path: "/myItems",
        element: (
          <PrivateRouter>
            <MyItems />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
