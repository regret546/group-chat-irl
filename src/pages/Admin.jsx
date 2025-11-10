import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, List, Home, LogOut, Key, Eye, EyeOff, Mail, MailOpen, Edit, Trash2, Play, Search, User, Clock } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import Swal from 'sweetalert2';
import thumbnailFallback from '../assets/thumbnail.jpg';

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
  const [episodes, setEpisodes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [episodeSearchTerm, setEpisodeSearchTerm] = useState('');
  const [reviewSearchTerm, setReviewSearchTerm] = useState('');
  const [messageSearchTerm, setMessageSearchTerm] = useState('');

  // Fetch episodes
  useEffect(() => {
    if (activeTab === 'episodes') {
      const fetchEpisodes = async () => {
        try {
          const response = await fetch('/api/episodes');
          if (response.ok) {
            const data = await response.json();
            setEpisodes(data);
          }
        } catch (err) {
          console.error('Error fetching episodes:', err);
        }
      };
      fetchEpisodes();
    }
  }, [activeTab]);

  // Fetch reviews
  useEffect(() => {
    if (activeTab === 'reviews') {
      const fetchReviews = async () => {
        try {
          const response = await fetch('/api/reviews');
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          }
        } catch (err) {
          console.error('Error fetching reviews:', err);
        }
      };
      fetchReviews();
    }
  }, [activeTab]);

  // Fetch messages
  useEffect(() => {
    if (activeTab === 'messages') {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch('/api/messages', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          }
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      };
      fetchMessages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  const handleDeleteEpisode = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/episodes/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setEpisodes(episodes.filter(ep => ep._id !== id));
          showNotification('success', 'Episode deleted successfully!');
          Swal.fire('Deleted!', 'Episode has been deleted.', 'success');
        } else {
          showNotification('error', 'Error deleting episode');
          Swal.fire('Error!', 'Could not delete episode.', 'error');
        }
      } catch (error) {
        console.error('Error deleting episode:', error);
        showNotification('error', 'Error deleting episode');
        Swal.fire('Error!', 'An error occurred while deleting the episode.', 'error');
      }
    }
  };

  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/reviews/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setReviews(reviews.filter(review => review._id !== id));
          showNotification('success', 'Review deleted successfully!');
          Swal.fire('Deleted!', 'Review has been deleted.', 'success');
        } else {
          showNotification('error', 'Error deleting review');
          Swal.fire('Error!', 'Could not delete review.', 'error');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        showNotification('error', 'Error deleting review');
        Swal.fire('Error!', 'An error occurred while deleting the review.', 'error');
      }
    }
  };

  // Filter episodes based on search term
  const filteredEpisodes = episodes.filter(episode => 
    episode.title?.toLowerCase().includes(episodeSearchTerm.toLowerCase()) ||
    episode.description?.toLowerCase().includes(episodeSearchTerm.toLowerCase()) ||
    episode.totalTime?.toLowerCase().includes(episodeSearchTerm.toLowerCase()) ||
    episode.durationHuman?.toLowerCase().includes(episodeSearchTerm.toLowerCase())
  );

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(review => 
    review.reviewerName?.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
    review.reviewText?.toLowerCase().includes(reviewSearchTerm.toLowerCase())
  );

  // Filter messages based on search term
  const filteredMessages = messages.filter(message => 
    message.name?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    message.email?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    message.message?.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, read: true } : msg
        ));
        showNotification('success', 'Message marked as read');
      } else {
        showNotification('error', 'Error marking message as read');
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      showNotification('error', 'Error marking message as read');
    }
  };

  const handleDeleteMessage = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/messages/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setMessages(messages.filter(message => message._id !== id));
          showNotification('success', 'Message deleted successfully!');
          Swal.fire('Deleted!', 'Message has been deleted.', 'success');
        } else {
          showNotification('error', 'Error deleting message');
          Swal.fire('Error!', 'Could not delete message.', 'error');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        showNotification('error', 'Error deleting message');
        Swal.fire('Error!', 'An error occurred while deleting the message.', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Episodes Management</h2>
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <PlusCircle size={20} />
                Add New Episode
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search episodes by title, description, or duration..."
                  value={episodeSearchTerm}
                  onChange={(e) => setEpisodeSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            {/* Episodes List */}
            {episodes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No episodes yet. Add your first episode!</p>
              </div>
            ) : filteredEpisodes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No episodes found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredEpisodes.map((episode) => (
                  <div 
                    key={episode._id} 
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Thumbnail */}
                      <img 
                        src={episode.thumbnailUrl || thumbnailFallback} 
                        alt={episode.title}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{episode.title}</h3>
                        <div className="space-y-2 text-gray-600">
                          <p><span className="font-semibold">Upload Date:</span> {new Date(episode.uploadDate).toLocaleDateString()}</p>
                          <p><span className="font-semibold">Duration:</span> {episode.totalTime || episode.durationHuman || 'N/A'}</p>
                          {episode.audioUrl && (
                            <p className="flex items-center gap-2">
                              <Play size={16} />
                              <span className="text-sm">{episode.audioUrl}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2">
                        <button
                          onClick={() => navigate(`/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/edit/${episode._id}`)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEpisode(episode._id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reviews Management</h2>
              <Link 
                to="/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <PlusCircle size={20} />
                Add New Review
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reviews by name or text..."
                  value={reviewSearchTerm}
                  onChange={(e) => setReviewSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No reviews yet. Add your first review!</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No reviews found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <div 
                    key={review._id} 
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Reviewer Picture */}
                    <div className="flex justify-center mb-4">
                      <img 
                        src={review.reviewerPicUrl || 'https://i.pravatar.cc/150'} 
                        alt={review.reviewerName}
                        className="w-24 h-24 object-cover rounded-full border-4 border-primary"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{review.reviewerName}</h3>
                      <p className="text-gray-600 text-sm line-clamp-4">{review.reviewText}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate(`/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/reviews/edit/${review._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Messages</h2>
                {unreadCount > 0 && (
                  <span className="bg-primary text-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search messages by name, email, or content..."
                  value={messageSearchTerm}
                  onChange={(e) => setMessageSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            {/* Messages List */}
            {messages.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No messages yet.</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No messages found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div 
                    key={message._id} 
                    className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                      !message.read ? 'border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded-full ${
                          message.read ? 'bg-gray-200' : 'bg-primary'
                        }`}>
                          {message.read ? (
                            <MailOpen className={`w-5 h-5 ${message.read ? 'text-gray-600' : 'text-dark'}`} />
                          ) : (
                            <Mail className="w-5 h-5 text-dark" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                            {!message.read && (
                              <span className="bg-primary text-dark px-2 py-0.5 rounded text-xs font-semibold">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>{message.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(message.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!message.read && (
                          <button
                            onClick={() => handleMarkAsRead(message._id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            title="Mark as read"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="pl-12">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

