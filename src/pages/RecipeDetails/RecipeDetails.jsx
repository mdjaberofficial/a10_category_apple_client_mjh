import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router'; 
import { AuthContext } from '../../context/AuthContext'; 
import Swal from 'sweetalert2'; 
import { Helmet } from 'react-helmet';

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); 
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localLikeCount, setLocalLikeCount] = useState(0); 
  const [hasLiked, setHasLiked] = useState(false); // Tracks if the user already clicked the button

  useEffect(() => {
    fetch('https://a10-category-apple-server-mjh.vercel.app/recipes')
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((r) => r._id === id);
        setRecipe(foundRecipe);
        setLocalLikeCount(foundRecipe?.likeCount || 0); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    // 1. Check if user is logged in
    if (!user) {
      return Swal.fire({
        icon: 'warning',
        title: 'Please Login',
        text: 'You need to be logged in to like a recipe!',
      });
    }

    // 2. Prevent creator from liking their own recipe
    if (recipe?.creatorEmail === user?.email || recipe?.userEmail === user?.email) {
      return Swal.fire({
        icon: 'error',
        title: 'Action Denied',
        text: "You can't like your own added recipes!",
      });
    }

    // 3. Prevent multiple clicks
    if (hasLiked) return; 

    // 4. Calculate new count
    const newLikeCount = localLikeCount + 1;

    // 5. Instantly update UI and disable button
    setLocalLikeCount(newLikeCount);
    setHasLiked(true);

    Swal.fire({
      icon: 'success',
      title: 'Recipe Liked!',
      text: 'Thanks for showing your interest.',
      showConfirmButton: false,
      timer: 1500
    });

    // 6. Send the PATCH request to update the main MongoDB database
    fetch(`https://a10-category-apple-server-mjh.vercel.app/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likeCount: newLikeCount })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Database updated successfully:', data);
    })
    .catch(err => {
      console.error('Failed to update database:', err);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <Helmet>
          <title>Recipe Not Found</title>
        </Helmet>
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
      <Helmet>
        <title>{recipe ? recipe.title : 'Recipe Details'}</title>
      </Helmet>
      
      {/* Required Text: People interested */}
      <div className="text-center mb-6">
        <div className="inline-block bg-blue-50 border border-blue-100 px-6 py-3 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-blue-600">
            {localLikeCount} people interested in this recipe
          </h2>
        </div>
      </div>

      <Link 
        to="/all-recipes" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition duration-300"
      >
        <span className="mr-2">←</span> Back to All Recipes
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="w-full h-72 md:h-[450px] relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl text-lg font-bold text-red-500 shadow-lg flex items-center gap-2">
            ❤️ {localLikeCount} Likes
          </div>
        </div>

        <div className="p-8 md:p-12">
          
          <div className="mb-10 border-b border-gray-100 pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
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
                {recipe.categories?.map((cat, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-bold border border-gray-200 flex items-center gap-2">
                    🏷️ {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic Like Button */}
            <button 
              onClick={handleLike}
              disabled={hasLiked}
              className={`font-extrabold py-3 px-8 rounded-full shadow-sm flex items-center gap-2 text-lg whitespace-nowrap transition-all duration-300
                ${hasLiked 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300' 
                  : 'bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:shadow-md'
                }
              `}
            >
              {hasLiked ? '❤️ Liked' : '❤️ Like Button'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  🛒 Ingredients
                </h3>
                <ul className="space-y-4">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 font-bold text-lg">•</span>
                      <span className="text-gray-700 font-medium leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                👨‍🍳 Instructions
              </h3>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                {recipe.instructions?.split('\n').map((paragraph, index) => (
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