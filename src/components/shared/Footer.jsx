import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span>🍽️ RecipeBook</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Discover, share, and save your favorite recipes. Your ultimate digital cookbook for everyday meals and special occasions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/all-recipes" className="hover:text-white transition duration-300">All Recipes</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition duration-300">Register</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect With Us</h3>
            <p className="text-gray-400 mb-4">
              Email: hello@recipebook.com<br />
              Phone: +1 234 567 890
            </p>
            <div className="flex gap-4">
              {/* Dummy Social Links - You can replace the hrefs with your actual social links */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-400 transition duration-300">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition duration-300">
                <span className="sr-only">Instagram</span>
                📸
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RecipeBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
