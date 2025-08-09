import React from "react";

const Footer = () => {
  return (
    <div className="bg-white py-8 lg:py-14 px-4 lg:px-0">
      <footer className="footer sm:footer-horizontal text-base-content max-w-7xl mx-auto">
        <aside>
          <h1 className="text-xl font-bold">
            Items<span className="text-green-500">Tracker</span>
          </h1>
          <p>
            Helping you reconnect with what matters —
            <br />
            report lost items, find what's been found, and support your
            community.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Find Your Lost Items</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
