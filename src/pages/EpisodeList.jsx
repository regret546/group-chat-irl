import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Play } from 'lucide-react';

const EpisodeList = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // TODO: Fetch episodes from your backend API
    // fetch('YOUR_API_ENDPOINT/episodes')
    //   .then(res => res.json())
    //   .then(data => setEpisodes(data))
    //   .catch(err => console.error(err));

    // Sample data for demonstration
    setEpisodes([
      {
        id: 1,
        title: 'Episode 8: Atty. Jelou Ann Feb Tabanao-Salon',
        uploadDate: '2024-11-01',
        totalTime: '37:58',
        thumbnail: '/src/assets/thumbnail.jpg',
        audioUrl: '/src/assets/episode8.mp3'
      }
    ]);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      try {
        // TODO: Delete request to your backend API
        // await fetch(`YOUR_API_ENDPOINT/episodes/${id}`, { method: 'DELETE' });
        
        setEpisodes(episodes.filter(ep => ep.id !== id));
        console.log('Deleted episode:', id);
        alert('Episode deleted successfully!');
      } catch (error) {
        console.error('Error deleting episode:', error);
        alert('Error deleting episode');
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
          <h1 className="text-3xl font-bold">All Episodes</h1>
        </div>
      </div>

      {/* Episodes List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {episodes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No episodes yet. Add your first episode!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {episodes.map((episode) => (
              <div 
                key={episode.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />
                  
                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{episode.title}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-semibold">Upload Date:</span> {new Date(episode.uploadDate).toLocaleDateString()}</p>
                      <p><span className="font-semibold">Duration:</span> {episode.totalTime}</p>
                      <p className="flex items-center gap-2">
                        <Play size={16} />
                        <span className="text-sm">{episode.audioUrl}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => navigate(`/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c/episodes/edit/${episode.id}`)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(episode.id)}
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
    </div>
  );
};

export default EpisodeList;

