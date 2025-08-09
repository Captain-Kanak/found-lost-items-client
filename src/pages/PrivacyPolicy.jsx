import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="p-6 my-12 bg-white rounded-lg shadow-md">
      <div className="max-w-2xl mx-auto mb-6">
        <h1 className="text-4xl font-bold mb-2 text-center">Privacy Policy</h1>
        <p className="text-center">
          At ItemsTracker, your privacy is important to us. This policy explains
          how we collect, use, and protect your personal information when you
          use our website.
        </p>
      </div>
      <section className="space-y-6 text-gray-700 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          contact details, and any information you provide when reporting or
          searching for lost items.
        </p>

        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p>
          Your information is used to provide and improve our services,
          communicate with you, and ensure a safe and trustworthy community
          platform.
        </p>

        <h2 className="text-2xl font-semibold">3. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your data from
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information to third parties.
          Information may be shared only as required by law or to protect the
          rights and safety of our community.
        </p>

        <h2 className="text-2xl font-semibold">5. Cookies and Tracking</h2>
        <p>
          Our website may use cookies and similar technologies to enhance user
          experience. You can manage your cookie preferences through your
          browser settings.
        </p>

        <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold">7. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at support@itemstracker.com.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
