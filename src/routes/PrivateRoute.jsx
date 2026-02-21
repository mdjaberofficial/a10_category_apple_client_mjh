import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
 // Your Firebase auth context

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
     return <div>Loading...</div>; // You can replace this with a Lottie animation
  }

  if (user) {
    return children;
  }

  // Redirect to login but save the attempted location so you can navigate them back after logging in
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;