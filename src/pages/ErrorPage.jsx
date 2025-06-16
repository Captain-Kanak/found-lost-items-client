import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
        Please check the URL or go back to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
