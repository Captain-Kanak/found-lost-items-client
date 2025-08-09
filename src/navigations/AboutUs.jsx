import React from "react";

const AboutUs = () => {
  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Welcome to <span className="font-semibold">Find & Return</span>, your trusted
        online platform dedicated to helping people find lost items and return them to their rightful owners.
      </p>

      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Losing something valuable or sentimental can be stressful and upsetting. Our mission is to make
        the process of finding lost belongings easier, faster, and more reliable through the power of community and technology.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>
          <strong>Post Lost or Found Items:</strong> Users can quickly post details about items they lost or found, including description, location, and contact info.
        </li>
        <li>
          <strong>Community Assistance:</strong> Other users browse posted items and report when they find something or recognize an owner.
        </li>
        <li>
          <strong>Secure Recovery Process:</strong> We facilitate communication and recovery confirmation to ensure items are returned safely.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        We believe in building a trustworthy community where everyone plays a part in helping each other. 
        Our platform is simple, user-friendly, and secure — designed with privacy and ease of use in mind.
      </p>

      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Join thousands of users who have successfully reunited with their lost belongings and contributed to making their community safer and more caring.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Whether you have lost something or found an item, your participation matters. Sign up today and be part of a growing network that turns lost items into found stories.
      </p>

      <p className="text-center text-gray-600 italic">
        “Together, we can help bring lost things back home.”
      </p>
    </div>
  );
};

export default AboutUs;
