import React from 'react';

import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="space-y-16 mb-16">
      
      {/* 1. Hero / Banner Section */}
      <section className="bg-blue-50 rounded-2xl p-8 md:p-16 text-center mt-8 shadow-sm">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Discover the Joy of <span className="text-blue-600">Cooking</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore thousands of delicious recipes, save your favorites, and share your own culinary creations with our growing community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/all-recipes" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md"
          >
            Explore Recipes
          </Link>
          <Link 
            to="/add-recipe" 
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-sm"
          >
            Add a Recipe
          </Link>
        </div>
      </section>

      {/* 2. Categories / Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Breakfast', 'Lunch', 'Dinner', 'Desserts'].map((category, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition duration-300 rounded-xl p-6 text-center cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition duration-300">
                {index === 0 ? '🍳' : index === 1 ? '🥗' : index === 2 ? '🍝' : '🍰'}
              </div>
              <h3 className="text-xl font-semibold text-gray-700">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action / Newsletter Section */}
      <section className="bg-gray-800 text-white rounded-2xl p-10 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
          Get the latest recipes, cooking tips, and food news delivered directly to your inbox every week.
        </p>
        <form 
          className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shrink-0"
          >
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
};

export default Home;
