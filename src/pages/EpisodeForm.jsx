import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Save, AlertCircle } from "lucide-react";
import { useNotification } from "../contexts/NotificationContext";

const EpisodeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEditMode = !!id;
  const [formData, setFormData] = useState({
    title: "",
    uploadDate: "",
    totalTime: "",
    youtubeUrl: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState("");
  const [audioDuration, setAudioDuration] = useState(null);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchEpisode();
    }
  }, [id]);

  const fetchEpisode = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/episodes/${id}`);
      if (response.ok) {
        const episode = await response.json();
        setFormData({
          title: episode.title || "",
          uploadDate: episode.uploadDate ? new Date(episode.uploadDate).toISOString().split('T')[0] : "",
          totalTime: episode.durationHuman || episode.description?.replace('Duration: ', '') || "",
          youtubeUrl: episode.youtubeUrl || "",
        });
        if (episode.thumbnailUrl) {
          setThumbnailPreview(episode.thumbnailUrl);
        }
        if (episode.audioUrl) {
          setAudioFileName(episode.audioUrl.split('/').pop());
        }
      } else {
        showNotification("error", "Failed to load episode");
        navigate("/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c");
      }
    } catch (error) {
      console.error("Error fetching episode:", error);
      showNotification("error", "Error loading episode");
      navigate("/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const handleAudioChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);

      // Check audio duration
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        setAudioDuration(duration);

        if (duration > 300) {
          // 5 minutes in seconds
          showNotification(
            "warning",
            `Warning: Audio is ${Math.floor(duration / 60)}:${Math.floor(
              duration % 60
            )
              .toString()
              .padStart(2, "0")} long. Maximum 5 minutes recommended.`,
            5000
          );
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      showNotification("error", "You must be logged in to create an episode");
      setTimeout(() => navigate("/admin-login"), 2000);
      return;
    }

    const episodeData = new FormData();
    episodeData.append("title", formData.title);
    if (formData.totalTime)
      episodeData.append("description", `Duration: ${formData.totalTime}`);
    if (formData.youtubeUrl)
      episodeData.append("youtubeUrl", formData.youtubeUrl);
    if (thumbnail) episodeData.append("thumbnail", thumbnail);
    if (audioFile) episodeData.append("audio", audioFile);

    try {
      const url = isEditMode ? `/api/episodes/${id}` : "/api/episodes";
      const method = isEditMode ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: episodeData,
      });
      const data = await response.json();

      if (response.ok) {
        showNotification("success", isEditMode ? "Episode updated successfully!" : "Episode added successfully!");
        setTimeout(
          () => navigate("/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c"),
          1500
        );
      } else {
        showNotification("error", data.message || (isEditMode ? "Error updating episode" : "Error adding episode"));
      }
    } catch (error) {
      console.error("Error submitting episode:", error);
      showNotification(
        "error",
        isEditMode ? "Error updating episode. Check console for details." : "Error adding episode. Check console for details."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-dark text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">{isEditMode ? "Edit Episode" : "Add New Episode"}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">Loading episode...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-6"
          >
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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

          {/* YouTube URL */}
          <div>
            <label
              htmlFor="youtubeUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              YouTube URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          {/* Date of Upload */}
          <div>
            <label
              htmlFor="uploadDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="totalTime"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <p className="mt-2 text-sm text-gray-500">
              Format: MM:SS or HH:MM:SS
            </p>
          </div>

          {/* Audio Clip Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio Clip (MP3)
            </label>
            <div className="flex items-center gap-4">
              {audioFileName && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                    {audioFileName}
                  </span>
                  {audioDuration && (
                    <span className="text-xs text-gray-500">
                      Duration: {Math.floor(audioDuration / 60)}:
                      {Math.floor(audioDuration % 60)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  )}
                </div>
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
            <p className="mt-2 text-sm text-gray-500">
              MP3 format, up to 100MB. Maximum 5 minutes recommended.
            </p>
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
              onClick={() => navigate("/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c")}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default EpisodeForm;
