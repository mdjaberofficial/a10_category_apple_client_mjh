import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router'; // Note: Usually 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // 1. Setup state for theme (default to light, or whatever is in localStorage)
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  // 2. Apply the theme to the HTML element whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 3. Toggle function
  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-recipes" 
          className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary"}
        >
          All Recipes
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink 
              to="/add-recipe" 
              className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary"}
            >
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-recipes" 
              className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary"}
            >
              My Recipes
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-base-content flex items-center gap-2">
          <span>🍽️ RecipeBook</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-base-content font-medium items-center">
          {navLinks}
        </ul>

        {/* User Authentication UI & Theme Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={handleToggleTheme} 
            className="btn btn-ghost btn-circle text-xl"
            title="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer"
                title={user?.displayName || "User"}
              >
                <img 
                  src={user?.photoURL || "https://via.placeholder.com/150"} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleLogOut} 
                className="btn btn-error text-white btn-sm px-4 h-10"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="btn btn-outline btn-primary btn-sm px-4 h-10"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary text-white btn-sm px-4 h-10"
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