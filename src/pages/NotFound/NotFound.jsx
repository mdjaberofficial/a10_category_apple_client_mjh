import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 text-center">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      {/* Food-Themed Graphic/Emoji */}
      <div className="text-9xl mb-6 shadow-sm drop-shadow-md">
        🍳
      </div>
      
      {/* 404 Error Text */}
      <h1 className="text-7xl font-extrabold text-gray-800 mb-2">404</h1>
      <h2 className="text-3xl font-bold text-gray-600 mb-6">
        Oops! This recipe is missing.
      </h2>
      
      <p className="text-lg text-gray-500 mb-10 max-w-md">
        We searched the whole kitchen, but we couldn't find the page you're looking for. It might have been burnt, removed, or the URL is incorrect.
      </p>
      
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <span>👨‍🍳</span> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;