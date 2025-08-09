import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-6 lg:px-0 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <aside>
          <h1 className="text-2xl font-bold mb-3">
            Items
            <span className="text-green-500">Tracker</span>
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Helping you reconnect with what matters — report lost items, find
            what's been found, and support your community.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title mb-4 text-lg font-semibold text-gray-800">
            Services
          </h6>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/found-lost-items"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                Find Your Lost Items
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <h6 className="footer-title mb-4 text-lg font-semibold text-gray-800">
            Company
          </h6>
          <ul className="space-y-2">
            <li>
              <Link
                to="/aboutus"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <a className="link link-hover text-gray-600 hover:text-green-500 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-600 hover:text-green-500 transition-colors">
                Jobs
              </a>
            </li>
            <li>
              <a className="link link-hover text-gray-600 hover:text-green-500 transition-colors">
                Press kit
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <h6 className="footer-title mb-4 text-lg font-semibold text-gray-800">
            Legal
          </h6>
          <ul className="space-y-2">
            <li>
              <Link
                to="/terms"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                Terms of use
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="link link-hover text-gray-600 hover:text-green-500 transition-colors"
              >
                Cookie policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ItemsTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
