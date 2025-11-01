import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    review: '',
  });
  const [reviewerPicture, setReviewerPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewerPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reviewData = new FormData();
    reviewData.append('title', formData.title);
    reviewData.append('review', formData.review);
    if (reviewerPicture) reviewData.append('picture', reviewerPicture);

    // TODO: Replace with your actual API endpoint
    try {
      // const response = await fetch('YOUR_API_ENDPOINT/reviews', {
      //   method: 'POST',
      //   body: reviewData
      // });
      // const data = await response.json();
      
      console.log('Review data to submit:', {
        title: formData.title,
        review: formData.review,
        picture: reviewerPicture?.name
      });
      
      alert('Review added successfully! (Connect to your backend API)');
      navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error adding review. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-dark text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Add New Review</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Reviewer Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reviewer Picture
            </label>
            <div className="flex items-center gap-4">
              {picturePreview && (
                <img 
                  src={picturePreview} 
                  alt="Reviewer preview" 
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                />
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                <Upload size={20} />
                Upload Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 5MB</p>
          </div>

          {/* Title (Reviewer Name) */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Reviewer Name / Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder="Enter the review text here..."
            />
            <p className="mt-2 text-sm text-gray-500">Write a detailed review (recommended: 50-200 words)</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save size={20} />
              Save Review
            </button>
            <button
              type="button"
              onClick={() => navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c')}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

