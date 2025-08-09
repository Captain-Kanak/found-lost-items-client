import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    setTimeout(() => {
      setStatus({ type: "success", message: "Thank you for subscribing!" });
      setEmail("");
    }, 1000);
  };

  return (
    <section
      data-aos="fade-right"
      className="my-10 py-16 px-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl shadow-2xl"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-10 text-center">
        <h2 className="text-3xl font-semibold mb-3 relative inline-block">
          Stay in the Loop
          <span className="block w-16 h-1 bg-green-500 rounded-full mx-auto mt-1"></span>
        </h2>
        <p className="text-gray-600 mb-8">
          Join our newsletter to get the latest updates and exclusive offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
          noValidate
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        {status && (
          <p
            className={`mt-6 text-sm ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
            role="alert"
          >
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
