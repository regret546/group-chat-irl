import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AudioPlayer from "../components/UI/AudioPlayer";
import thumbnailFallback from "../assets/thumbnail.jpg";
import episode8Fallback from "../assets/episode8.mp3";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [visibleEpisodes, setVisibleEpisodes] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch("/api/episodes");
        if (response.ok) {
          const data = await response.json();
          setEpisodes(data);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const handleLoadMore = () => {
    setVisibleEpisodes((prev) => prev + 6);
  };

  const displayedEpisodes = episodes.slice(0, visibleEpisodes);
  const hasMore = episodes.length > visibleEpisodes;

  return (
    <div className="episode min-h-screen bg-primary">
      <Navbar />
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-bold text-accent text-2xl md:text-3xl text-center">
            Start Listening Today
          </h2>
          <h1 className="text-dark font-medium text-3xl md:text-4xl mt-[1rem] md:mt-[2rem] text-center mb-8">
            All Episodes
          </h1>

          {loading ? (
            <div className="text-center text-dark text-xl mt-8">
              Loading episodes...
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center text-dark text-xl mt-8">
              No episodes available yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-[2rem]">
                {displayedEpisodes.map((episode) => (
                  <div
                    key={episode._id}
                    className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center"
                  >
                    <img
                      className="w-full"
                      src={episode.thumbnailUrl || thumbnailFallback}
                      alt={episode.title}
                      loading="lazy"
                    />
                    <div className="flex justify-between w-full text-primary text-[0.8rem] md:text-[0.9rem]">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar-days"></i>
                        <p>
                          {new Date(episode.uploadDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-clock"></i>
                        <p>{episode.totalTime || episode.durationHuman || "N/A"}</p>
                      </div>
                    </div>
                    <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold text-white">
                      {episode.title}
                    </h3>
                    <AudioPlayer
                      audioUrl={episode.audioUrl || episode8Fallback}
                      compact
                    />
                    {episode.youtubeUrl && (
                      <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-2 px-4 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/80 transition-colors flex items-center justify-center min-h-[44px] leading-tight"
                      >
                        Watch Full Video
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="mt-8 px-8 py-3 bg-dark text-primary font-semibold rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Episodes;
