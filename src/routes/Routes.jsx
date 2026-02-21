import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AllRecipes from '../pages/AllRecipes/AllRecipes';
import AddRecipe from '../pages/AddRecipe/AddRecipe';
import MyRecipes from '../pages/MyRecipes/MyRecipes';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-recipes',
        element: <AllRecipes />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      // Private Routes
      {
        path: '/add-recipe',
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-recipes',
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: '/recipe/:id',
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    // The 404 page is outside MainLayout, so it won't render the Navbar or Footer
    path: '*',
    element: <NotFound />, 
  },
]);

export default router;