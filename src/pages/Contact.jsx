import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Message received! Our team will respond shortly.");
    setLoading(false);
    e.target.reset();
  };

  return (
    <div className="min-h-screen py-12 flex flex-col justify-center">
      <Helmet>
        <title>Contact Us - ItemsTracker</title>
      </Helmet>

      <h1 className="text-center text-3xl font-extrabold text-indigo-700 mb-2 drop-shadow-md">
        Contact Us
      </h1>
      <p className="text-center text-indigo-500 text-lg mb-10 max-w-xl mx-auto">
        Have a question or want to share details? Fill out the form below and
        we’ll get back to you soon.
      </p>

      <form
        onSubmit={handleContactSubmit}
        className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 transition"
            placeholder="Enter your name"
            defaultValue={user?.displayName || ""}
            required
            readOnly
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 transition"
            placeholder="Enter your email"
            defaultValue={user?.email || ""}
            required
            readOnly
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 px-4 py-3 transition resize-none"
            placeholder="Write your message..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } transition text-white font-semibold rounded-lg py-3 shadow-md shadow-indigo-300/50`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
