import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import Swal from 'sweetalert2';

const ReviewList = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Error fetching reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    
    fetchReviews();
  }, []);

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
        const response = await fetch(`/api/reviews/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setReviews(reviews.filter(review => review._id !== id));
          showNotification('success', 'Review deleted successfully!');
          Swal.fire(
            'Deleted!',
            'Review has been deleted.',
            'success'
          );
        } else {
          showNotification('error', 'Error deleting review');
          Swal.fire(
            'Error!',
            'Could not delete review.',
            'error'
          );
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        showNotification('error', 'Error deleting review');
        Swal.fire(
          'Error!',
          'An error occurred while deleting the review.',
          'error'
        );
      }
    }
  };

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
          <h1 className="text-3xl font-bold">All Reviews</h1>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No reviews yet. Add your first review!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
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
                    onClick={() => handleDelete(review._id)}
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
    </div>
  );
};

export default ReviewList;

