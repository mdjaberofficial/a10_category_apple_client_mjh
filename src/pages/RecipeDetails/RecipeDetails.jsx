import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

const RecipeDetails = () => {
  // Grab the dynamic ID from the URL (e.g., /recipe/3)
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the single recipe from your backend:
    // fetch(`YOUR_API_URL/recipes/${id}`)
    
    fetch('http://localhost:3000/recipes')
      .then((res) => res.json())
      .then((data) => {
        // Find the specific recipe that matches the ID from the URL
        const foundRecipe = data.find((r) => r._id === id);
        setRecipe(foundRecipe);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Handle the case where a user types an invalid ID into the URL
  if (!recipe) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Recipe Not Found</h2>
        <p className="text-gray-600 mb-8 text-lg">The recipe you are looking for might have been removed or doesn't exist.</p>
        <Link 
          to="/all-recipes" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
        >
          Browse All Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-5xl mx-auto px-4">
      {/* Back Navigation */}
      <Link 
        to="/all-recipes" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition duration-300"
      >
        <span className="mr-2">←</span> Back to All Recipes
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Hero Image Section */}
        <div className="w-full h-72 md:h-[450px] relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl text-lg font-bold text-red-500 shadow-lg flex items-center gap-2">
            ❤️ {recipe.likeCount} Likes
          </div>
        </div>

        <div className="p-8 md:p-12">
          
          {/* Recipe Header & Meta Data */}
          <div className="mb-10 border-b border-gray-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {recipe.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 text-sm md:text-base">
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold border border-blue-100 flex items-center gap-2">
                🌍 {recipe.cuisineType}
              </span>
              <span className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full font-bold border border-orange-100 flex items-center gap-2">
                ⏱️ {recipe.preparationTime} mins
              </span>
              {recipe.categories.map((cat, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-bold border border-gray-200 flex items-center gap-2">
                  🏷️ {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Recipe Content: Ingredients & Instructions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Column: Ingredients */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  🛒 Ingredients
                </h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 font-bold text-lg">•</span>
                      <span className="text-gray-700 font-medium leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Instructions */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                👨‍🍳 Instructions
              </h3>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                {/* If instructions contain line breaks, this maps them into distinct paragraphs. 
                  If it's one block of text, it simply renders as one paragraph.
                */}
                {recipe.instructions.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
