import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the data from the public/data folder
    fetch('http://localhost:3000/recipes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading recipes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">All Recipes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our complete collection of mouth-watering recipes. From quick breakfasts to decadent desserts, find your next favorite meal here.
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Recipe Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold text-gray-700 shadow-sm flex items-center gap-1">
                ❤️ {recipe.likeCount}
              </div>
            </div>

            {/* Recipe Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1" title={recipe.title}>
                  {recipe.title}
                </h3>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium border border-blue-100">
                  {recipe.cuisineType}
                </span>
                <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded-full font-medium border border-orange-100">
                  ⏱️ {recipe.preparationTime} mins
                </span>
              </div>

              {/* Categories */}
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                <span className="font-semibold">Categories:</span> {recipe.categories.join(', ')}
              </p>

              {/* View Details Button */}
              <Link 
                to={`/recipe/${recipe.id}`} 
                className="mt-auto block text-center bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white border border-gray-200 hover:border-blue-600 font-semibold py-2.5 rounded-lg transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Fallback */}
      {!loading && recipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No recipes found right now. 🍳</p>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;