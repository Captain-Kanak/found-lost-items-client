import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../navigations/Home.jsx";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import FoundLostItems from "../navigations/FoundLostItems";
import AddLostFoundItem from "../pages/AddLostFoundItem";
import ItemDetails from "../pages/ItemDetails";
import PrivateRouter from "./PrivateRouter";
import MyItems from "../pages/MyItems";
import RecoveredItems from "../pages/RecoveredItems";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../navigations/AboutUs";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CookiePolicy from "../pages/CookiePolicy";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile.jsx";

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
        path: "aboutus",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "terms",
        Component: TermsOfUse,
      },
      {
        path: "privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "cookies",
        Component: CookiePolicy,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
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
