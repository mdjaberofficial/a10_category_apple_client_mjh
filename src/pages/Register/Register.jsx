import React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const photo = form.get('photo');
    const email = form.get('email');
    const password = form.get('password');

    // Basic Password Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setError(''); // Clear previous errors

    createUser(email, password)
      .then((result) => {
        console.log('User created:', result.user);
        // Update user's profile with name and photo
        updateUserProfile(name, photo)
          .then(() => {
            // Redirect to home page after successful registration
            navigate('/');
          })
          .catch((err) => console.error('Profile update error:', err));
      })
      .catch((err) => {
        console.error('Registration Error:', err);
        setError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log('Google Sign In:', result.user);
        navigate('/');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center py-10">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" name="name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
            <input type="url" name="photo" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/photo.jpg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300 mt-4">
            Register
          </button>
        </form>

        <div className="mt-6">
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-md transition duration-300">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;