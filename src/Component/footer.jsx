import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo Section */}
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left space-y-2 md:space-y-0 mb-4 md:mb-0">
          <img
            className="w-12 h-12 md:w-16 md:h-16 mr-0 md:mr-4 rounded-full"
            src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg"
            alt="Logo"
          />
          <h1 className="text-xl md:text-2xl font-bold">TripVerse</h1>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row text-center md:text-left space-y-2 md:space-y-0 md:space-x-6 md:pr-12">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            Packages
          </a>
          <a href="#" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 justify-center md:justify-start">
          <a href="#" aria-label="Twitter">
            <img
              className="w-6 h-6 md:w-8 md:h-8"
              src="https://static-00.iconduck.com/assets.00/twitter-icon-2048x1691-4lpbyo0r.png"
              alt="Twitter"
            />
          </a>
          <a href="#" aria-label="Facebook">
            <img
              className="w-6 h-6 md:w-8 md:h-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskbpEX-jqvW2ZslvzHgvtEKykib-oCRvCPA&s"
              alt="Facebook"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              className="w-6 h-6 md:w-8 md:h-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s"
              alt="Instagram"
            />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-6 space-y-1 text-sm md:text-base">
        <h2>© 2024 TRAVIGO PVT. LTD. All rights reserved.</h2>
        <p>Country: India, USA, UAE</p>
      </div>
    </footer>
  );
};

export default Footer;
