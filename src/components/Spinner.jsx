import React from "react";

const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 z-50">
      {/* Animated Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Spinner;
