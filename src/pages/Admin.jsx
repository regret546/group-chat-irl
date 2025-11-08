import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, List, Home, LogOut, Key, Eye, EyeOff, Mail } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const Admin = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('episodes');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showNotification('error', 'New password must be at least 6 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('success', 'Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        showNotification('error', data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showNotification('error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail size={18} />
                Messages
              </div>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'password'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Key size={18} />
                Reset Password
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

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/messages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <Mail size={20} />
                View All Messages
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded-lg p-6 sm:p-8">
              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter new password (min. 6 characters)"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Key size={20} />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

