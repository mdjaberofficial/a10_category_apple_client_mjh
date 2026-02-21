import React from 'react';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [cuisineType, setCuisineType] = useState('Italian');
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState([]);

  // The 4 strict categories you requested
  const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Desserts'];

  // Handle checking/unchecking categories
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (categories.includes(value)) {
      setCategories(categories.filter((cat) => cat !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categories.length === 0) {
      alert('Please select at least one category.');
      return;
    }

    // Construct the final object exactly matching your JSON structure
    const newRecipe = {
      title,
      image,
      cuisineType,
      preparationTime: parseInt(preparationTime),
      // Splits the textarea by line breaks and removes empty lines
      ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item !== ''),
      instructions,
      categories,
      likeCount: 0, // Initially 0 as requested
      creatorEmail: user?.email, // Tie the recipe to the logged-in user
      creatorName: user?.displayName
    };

    console.log('New Recipe Ready to Save:', newRecipe);

    // FUTURE STEP: Here is where you will do a fetch POST request to your database (MongoDB/Firebase)
    // fetch('YOUR_API_URL/recipes', { method: 'POST', body: JSON.stringify(newRecipe) ... })

    alert('Recipe form submitted! (Check your browser console to see the exact JSON object)');
    
    // Redirect to My Recipes page after successful submission
    navigate('/my-recipes');
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Add a New Recipe</h2>
          <p className="text-gray-500 mt-2">Share your culinary masterpieces with the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top Row: Title & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g., Classic Margherita Pizza" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input 
                type="url" 
                required 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="https://example.com/image.jpg" 
              />
            </div>
          </div>

          {/* Second Row: Cuisine & Prep Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cuisine Type</label>
              <select 
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Preparation Time (minutes)</label>
              <input 
                type="number" 
                required 
                min="1"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g., 30" 
              />
            </div>
          </div>

          {/* Categories (Checkboxes) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Categories (Select at least one)</label>
            <div className="flex flex-wrap gap-4">
              {categoryOptions.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 transition">
                  <input 
                    type="checkbox" 
                    value={category}
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ingredients & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
              <p className="text-xs text-gray-500 mb-2">Put each ingredient on a new line.</p>
              <textarea 
                required 
                rows="6"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="1 Pizza dough&#10;1/2 cup Tomato sauce&#10;8 oz Fresh mozzarella"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Instructions</label>
              <p className="text-xs text-gray-500 mb-2">Describe the cooking steps clearly.</p>
              <textarea 
                required 
                rows="6"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Preheat your oven to 475°F..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
              Add Recipe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
