import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // user sign out sucessfully
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // close drop down when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // create nav-links
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/found-lost-items">Found Lost Items</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-16 relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <h1 className="text-xl font-bold">
          Items<span className="text-green-500">Tracker</span>
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2" ref={dropdownRef}>
            <img
              onClick={() => setOpen(!isOpen)}
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
              src={user?.photoURL || "https://i.ibb.co/XkzcZ8mD/user.png"}
              title={user?.displayName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.ibb.co/XkzcZ8mD/user.png";
              }}
            />
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-success"
            >
              <FaSignOutAlt />
              Sign Out
            </button>

            {/* profile picture drop down */}
            <div
              className={`absolute bg-base-200 p-2 right-4 lg:right-16 top-16 flex-col gap-1 rounded-lg ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              <Link
                onClick={() => setOpen(false)}
                className="cursor-pointer font-medium hover:underline"
              >
                Add Lost & Found Item
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="cursor-pointer font-medium hover:underline"
              >
                All Recovered Items
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="cursor-pointer font-medium hover:underline"
              >
                Manage My Items
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/signIn">
              <button className="btn btn-outline btn-success">SignIn</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline btn-success">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
