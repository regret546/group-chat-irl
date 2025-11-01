import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';

const EpisodeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    uploadDate: '',
    totalTime: '',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const episodeData = new FormData();
    episodeData.append('title', formData.title);
    episodeData.append('uploadDate', formData.uploadDate);
    episodeData.append('totalTime', formData.totalTime);
    if (thumbnail) episodeData.append('thumbnail', thumbnail);
    if (audioFile) episodeData.append('audio', audioFile);

    // TODO: Replace with your actual API endpoint
    try {
      // const response = await fetch('YOUR_API_ENDPOINT/episodes', {
      //   method: 'POST',
      //   body: episodeData
      // });
      // const data = await response.json();
      
      console.log('Episode data to submit:', {
        title: formData.title,
        uploadDate: formData.uploadDate,
        totalTime: formData.totalTime,
        thumbnail: thumbnail?.name,
        audio: audioFile?.name
      });
      
      alert('Episode added successfully! (Connect to your backend API)');
      navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c');
    } catch (error) {
      console.error('Error submitting episode:', error);
      alert('Error adding episode. Check console for details.');
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
          <h1 className="text-3xl font-bold">Add New Episode</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Episode Thumbnail
            </label>
            <div className="flex items-center gap-4">
              {thumbnailPreview && (
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                />
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                <Upload size={20} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Episode Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g., Episode 8: Atty. Jelou Ann Feb Tabanao-Salon"
            />
          </div>

          {/* Date of Upload */}
          <div>
            <label htmlFor="uploadDate" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Upload
            </label>
            <input
              type="date"
              id="uploadDate"
              name="uploadDate"
              value={formData.uploadDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          {/* Total Time */}
          <div>
            <label htmlFor="totalTime" className="block text-sm font-medium text-gray-700 mb-2">
              Total Time (Duration)
            </label>
            <input
              type="text"
              id="totalTime"
              name="totalTime"
              value={formData.totalTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g., 37:58 or 1:15:30"
            />
            <p className="mt-2 text-sm text-gray-500">Format: MM:SS or HH:MM:SS</p>
          </div>

          {/* Audio Clip Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio Clip (MP3)
            </label>
            <div className="flex items-center gap-4">
              {audioFileName && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {audioFileName}
                </span>
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                <Upload size={20} />
                Upload Audio
                <input
                  type="file"
                  accept="audio/mpeg,audio/mp3"
                  onChange={handleAudioChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">MP3 format, up to 100MB</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save size={20} />
              Save Episode
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

export default EpisodeForm;

