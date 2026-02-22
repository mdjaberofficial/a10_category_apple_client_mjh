import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form States
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [cuisineType, setCuisineType] = useState('Italian');
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState([]);

  const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Desserts'];

  // 1. Fetch exactly the ONE recipe you need from the backend
  useEffect(() => {
    fetch(`https://a10-category-apple-server-mjh.vercel.app/recipes/${id}`)
      .then((res) => res.json())
      .then((recipeToUpdate) => {
        // Now you don't need .find(), the backend gives you the exact object
        if (recipeToUpdate) {
          setTitle(recipeToUpdate.title || '');
          setImage(recipeToUpdate.image || '');
          setCuisineType(recipeToUpdate.cuisineType || 'Italian');
          setPreparationTime(recipeToUpdate.preparationTime || '');
          
          // Ensure ingredients exists before joining to prevent errors
          if (recipeToUpdate.ingredients) {
            setIngredients(recipeToUpdate.ingredients.join('\n'));
          }
          
          setInstructions(recipeToUpdate.instructions || '');
          setCategories(recipeToUpdate.categories || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe for update:', error);
        setLoading(false);
      });
  }, [id]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (categories.includes(value)) {
      setCategories(categories.filter((cat) => cat !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

  // 2. Handle the PUT request
  const handleUpdate = (e) => {
    e.preventDefault();

    if (categories.length === 0) {
      alert('Please select at least one category.');
      return;
    }

    const updatedRecipe = {
      title,
      image,
      cuisineType,
      preparationTime: parseInt(preparationTime),
      ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item !== ''),
      instructions,
      categories,
    };

    console.log('Sending PUT request with data:', updatedRecipe);

    // Fixed the URL to dynamically insert the ID using ${id} instead of :id
    fetch(`https://a10-category-apple-server-mjh.vercel.app/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe)
    })
    .then(res => res.json())
    .then(data => {
      // MongoDB returns modifiedCount when a document is successfully updated
      if(data.modifiedCount > 0) {
        alert('Recipe updated successfully!');
        navigate('/my-recipes');
      } else {
        alert('No changes were made or update failed.');
      }
    })
    .catch(error => console.error('Error updating recipe:', error));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <Link to="/my-recipes" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block">
        ← Back to My Recipes
      </Link>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Update Recipe</h2>
          <p className="text-gray-500 mt-2">Make changes to your existing recipe details.</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
              <input 
                 type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input 
                type="url" required value={image} onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cuisine Type</label>
              <select 
                value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}
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
                type="number" required min="1" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3">Categories</label>
            <div className="flex flex-wrap gap-4">
              {categoryOptions.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-yellow-50 transition">
                  <input 
                    type="checkbox" value={category}
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                    className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
                  />
                  <span className="text-gray-700 font-medium">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
              <textarea 
                required rows="6" value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Instructions</label>
              <textarea 
                required rows="6" value={instructions} onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
              Update Recipe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;