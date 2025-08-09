import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import { FiPlusCircle, FiArchive, FiUser, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOutUser().catch(console.error);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("#userAvatar")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      {["/", "/found-lost-items", "/aboutus"].map((path, i) => {
        const titles = ["Home", "All Items", "About Us"];
        return (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `relative px-3 py-2 font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-green-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {titles[i]}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-0 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg lg:text-2xl font-extrabold text-gray-900 select-none hover:text-green-600 transition-colors duration-300"
        >
          Items<span className="text-green-600">Tracker</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-lg">{links}</ul>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Auth Buttons and User */}
        <div className="flex items-center space-x-4 relative">
          {user ? (
            <>
              {/* Avatar + Dropdown */}
              <div className="relative">
                <img
                  id="userAvatar"
                  onClick={() => setOpen(!isOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-green-600 hover:ring-green-400 
                  transition-all"
                  src={user?.photoURL || "https://i.ibb.co/XkzcZ8mD/user.png"}
                  alt={user?.displayName || "User Avatar"}
                  title={user?.displayName || "User"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://i.ibb.co/XkzcZ8mD/user.png";
                  }}
                />
                {/* Dropdown below avatar */}
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 top-full mt-2 w-60 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl 
                    shadow-xl flex flex-col p-4 gap-3 transform origin-top-right transition-all duration-250 ease-out ${
                      isOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                  <Link
                    to="/addItems"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium"
                  >
                    <FiPlusCircle size={20} /> Add Lost & Found Item
                  </Link>
                  <Link
                    to="/allRecovered"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium"
                  >
                    <FiArchive size={20} /> All Recovered Items
                  </Link>
                  <Link
                    to="/myItems"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium"
                  >
                    <FiUser size={20} /> Manage My Items
                  </Link>

                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 border border-green-600 text-green-600 rounded-md px-4 py-2 
                    font-semibold hover:bg-green-600 hover:text-white transition cursor-pointer"
                    title="Sign Out"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button
                  className="border border-green-600 text-green-600 rounded-md px-4 py-2 font-semibold
                 hover:bg-green-600 hover:text-white transition cursor-pointer"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="border border-green-600 text-green-600 rounded-md px-4 py-2 font-semibold
                 hover:bg-green-600 hover:text-white transition cursor-pointer"
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="lg:hidden bg-white shadow-md rounded-b-lg py-4 flex flex-col space-y-2 px-6">
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
