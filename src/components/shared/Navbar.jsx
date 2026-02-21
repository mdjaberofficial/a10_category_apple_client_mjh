import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  // Define navigation links to keep the JSX clean
  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-recipes" 
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}
        >
          All Recipes
        </NavLink>
      </li>
      {/* Conditionally render private routes if the user exists */}
      {user && (
        <>
          <li>
            <NavLink 
              to="/add-recipe" 
              className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}
            >
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-recipes" 
              className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}
            >
              My Recipes
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>🍽️ RecipeBook</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
          {navLinks}
        </ul>

        {/* User Authentication UI */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar with Tooltip */}
              <div 
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
                title={user?.displayName || "User"}
              >
                <img 
                  src={user?.photoURL || "https://via.placeholder.com/150"} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogOut} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;