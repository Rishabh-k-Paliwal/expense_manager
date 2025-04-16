import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-900 mt-auto relative">
      {/* Footer content */}
      <div className="container mx-auto text-center">
        <p className="text-2xl text-white font-extrabold">
          <span className="text-[#FF5733]">Smart</span>
          <span className="text-white"> Spend</span>
        </p>
        <p className="text-gray-300 mt-4 text-lg font-medium">
          &copy; 2025 Budget Tracker. All rights reserved.
        </p>
        <p className="text-gray-300 mt-2 text-lg font-medium">
          Developed by Team MERN
        </p>
      </div>
    </footer>
  );
};

export default Footer;