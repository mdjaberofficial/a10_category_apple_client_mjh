import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
//  from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Navbar at the top */}
      <Navbar /> 
      
      {/* Outlet renders the matching child route (e.g., Home, Login, All Recipes) */}
      <main className="grow container mx-auto px-4">
        <Outlet />
        
      </main>

      {/* Shared Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;