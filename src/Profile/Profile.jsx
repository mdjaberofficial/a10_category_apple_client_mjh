import React, { useContext, useState } from 'react';

import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  
  // Initialize state with the user's current data
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    // Firebase updateProfile function takes the current user object and the new data
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your information has been successfully updated.',
          timer: 2000,
          showConfirmButton: false
        });
        
        // Refresh the page to reflect the new avatar/name in the Navbar immediately
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-base-200 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6 text-base-content">Update Profile</h2>
          
          <div className="flex justify-center mb-6">
            <img 
              src={user?.photoURL || "https://via.placeholder.com/150"} 
              alt="Current Avatar" 
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name" 
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input 
                type="url" 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter photo URL" 
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full text-white"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;