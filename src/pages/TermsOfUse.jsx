import React from "react";

const TermsOfUse = () => {
  return (
    <main className="p-6 my-12 bg-white rounded-lg shadow-md">
      <div className="max-w-2xl mx-auto mb-6">
        <h1 className="text-4xl font-bold mb-2 text-center">Terms of Use</h1>
        <p className="text-center">
          Welcome to ItemsTracker. By accessing or using our website, you agree
          to comply with and be bound by the following terms and conditions.
          Please read them carefully.
        </p>
      </div>
      <section className="space-y-6 text-gray-700">
        <h2 className="text-2xl font-semibold">1. Use of the Website</h2>
        <p>
          You agree to use the website only for lawful purposes and in a way
          that does not infringe the rights of, restrict or inhibit anyone
          else's use and enjoyment of the website.
        </p>

        <h2 className="text-2xl font-semibold">2. Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and
          software, is the property of ItemsTracker or its content suppliers and
          is protected by intellectual property laws.
        </p>

        <h2 className="text-2xl font-semibold">3. Limitation of Liability</h2>
        <p>
          ItemsTracker shall not be liable for any direct, indirect, incidental,
          or consequential damages resulting from the use or inability to use
          the website or its content.
        </p>

        <h2 className="text-2xl font-semibold">4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will
          be posted on this page, and your continued use of the site constitutes
          acceptance of any changes.
        </p>

        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us
          at support@itemstracker.com.
        </p>
      </section>
    </main>
  );
};

export default TermsOfUse;
