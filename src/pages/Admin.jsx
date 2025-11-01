import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, List, Home, LogOut } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('episodes');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
              >
                <Home size={18} />
                <span className="hidden md:inline">Back to Site</span>
              </Link>
              <Link 
                to="/" 
                className="sm:hidden flex items-center justify-center w-10 h-10 bg-primary text-dark rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Home size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'episodes'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <PlusCircle size={18} />
                Manage Episodes
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <List size={18} />
                Manage Reviews
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'episodes' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Episodes Management</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <PlusCircle size={20} />
                Add New Episode
              </Link>
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/list"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                <List size={20} />
                View All Episodes
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Reviews Management</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <PlusCircle size={20} />
                Add New Review
              </Link>
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/list"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                <List size={20} />
                View All Reviews
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

