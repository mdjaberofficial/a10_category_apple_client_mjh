import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { Fade } from 'react-awesome-reveal';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import Swal from 'sweetalert2';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text] = useTypewriter({
    words: ['Cooking', 'Sharing', 'Tasting'],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  useEffect(() => {
    fetch('https://a10-category-apple-server-mjh.vercel.app/recipes')
      .then((res) => res.json())
      .then((data) => {
        const sortedRecipes = data.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        const top6Recipes = sortedRecipes.slice(0, 6);
        setFeaturedRecipes(top6Recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching featured recipes:', error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching recipes!',
        });
      });
  }, []);

  const handleSubscription = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    if (email) {
      Swal.fire({
        title: 'Thank You!',
        text: `You have subscribed with ${email}`,
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      e.target.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter your email address!',
      });
    }
  };

  return (
    <div className="space-y-16 mb-16">
      <Helmet>
        <title>Recipe Home Page</title>
      </Helmet>

      {/* 1. Hero / Banner Section */}
      <section className="bg-blue-50 rounded-2xl p-8 md:p-16 text-center mt-8 shadow-sm">
        <Fade cascade>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover the Joy of <span className="text-blue-600">{text}</span>
            <Cursor cursorStyle='<' />
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
        </Fade>
      </section>

      {/* 2. Categories / Features Section */}
      <section>
        <Fade>
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
        </Fade>
      </section>

      {/* 3. Featured Recipes Section (Top 6) */}
      <section className="container mx-auto px-4">
        <Fade>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Recipes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our most popular, mouth-watering dishes right now.
            </p>
          </div>
        </Fade>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <Fade key={recipe._id || recipe.id}>
                <div
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
                      ❤️ {recipe.likeCount || 0}
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2" title={recipe.title}>
                      {recipe.title}
                    </h3>

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
                      <span className="font-semibold">Categories:</span> {recipe.categories?.join(', ')}
                    </p>

                    {/* View Details Button */}
                    <Link
                      to={`/recipe/${recipe._id || recipe.id}`}
                      className="mt-auto block text-center bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white border border-gray-200 hover:border-blue-600 font-semibold py-2.5 rounded-lg transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}

        {/* 4. View All Button */}
        <div className="text-center mt-12">
          <Fade>
            <Link
              to="/all-recipes"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Recipes
            </Link>
          </Fade>
        </div>
      </section>

      {/* 4. Call to Action / Newsletter Section */}
      <section className="bg-gray-800 text-white rounded-2xl p-10 text-center shadow-lg">
        <Fade>
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Get the latest recipes, cooking tips, and food news delivered directly to your inbox every week.
          </p>
          <form
            className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2"
            onSubmit={handleSubscription}
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
        </Fade>
      </section>

    </div>
  );
};

export default Home;
