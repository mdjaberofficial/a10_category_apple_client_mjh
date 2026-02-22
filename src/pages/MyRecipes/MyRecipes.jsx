import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch ONLY this user's recipes from your database
    // e.g., fetch(`YOUR_API/my-recipes?email=${user?.email}`)
    
    // For now, we are fetching the dummy data and filtering it
    fetch('http://localhost:3000/recipes')
      .then((res) => res.json())
      .then((data) => {
        // Filter recipes to show only the ones matching the logged-in user's email
        // Note: Since the dummy JSON doesn't have your email, this will result in an empty array right now!
        const filteredRecipes = data.filter(recipe => recipe.creatorEmail === user?.email);
        setMyRecipes(filteredRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading recipes:', error);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      console.log(`Deleting recipe with ID: ${id}`);
      // FUTURE STEP: fetch(`YOUR_API/recipes/${id}`, { method: 'DELETE' })
      // Then remove it from the state so it disappears from the screen:

      fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
        .then(data => {
          console.log('Server Response:', data);
          if(data.deletedCount > 0) {
            alert('Recipe deleted successfully!');
            setMyRecipes(myRecipes.filter(recipe => recipe.id !== id));
          } else {
            alert('Something went wrong. Please try again.');
    }
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
        alert('Failed to connect to the server.');
      }); 
        
      
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">My Recipes</h1>
          <p className="text-gray-600">Manage all the recipes you've contributed to the community.</p>
        </div>
        <Link 
          to="/add-recipe" 
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md flex items-center gap-2"
        >
          <span>➕</span> Add New Recipe
        </Link>
      </div>

      {myRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row">
              
              {/* Recipe Image - Left Side on Desktop, Top on Mobile */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                  ❤️ {recipe.likeCount}
                </div>
              </div>

              {/* Recipe Content & Actions - Right Side */}
              <div className="p-5 flex flex-col flex-grow w-full md:w-3/5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" title={recipe.title}>
                  {recipe.title}
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded font-medium">
                    {recipe.cuisineType}
                  </span>
                  <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded font-medium">
                    ⏱️ {recipe.preparationTime} mins
                  </span>
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/recipe/${recipe._id}`} 
                    className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded transition"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => console.log('Edit clicked for', recipe._id)}
                    className="flex-1 text-center bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold py-2 rounded transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(recipe._id)}
                    className="flex-1 text-center bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Recipes Yet</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't added any recipes to your cookbook. Share your first recipe with the community!
          </p>
          <Link 
            to="/add-recipe" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Create a Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
