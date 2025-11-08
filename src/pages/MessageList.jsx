import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Mail, MailOpen, User, Clock } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import Swal from 'sweetalert2';

const MessageList = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Error fetching messages');
        showNotification('error', 'Error fetching messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      showNotification('error', 'Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
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
          Swal.fire(
            'Deleted!',
            'Message has been deleted.',
            'success'
          );
        } else {
          showNotification('error', 'Error deleting message');
          Swal.fire(
            'Error!',
            'Could not delete message.',
            'error'
          );
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        showNotification('error', 'Error deleting message');
        Swal.fire(
          'Error!',
          'An error occurred while deleting the message.',
          'error'
        );
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Messages</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-dark px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
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
                      onClick={() => handleDelete(message._id)}
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
    </div>
  );
};

export default MessageList;

