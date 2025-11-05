import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import AudioPlayer from "../components/UI/AudioPlayer";
import thumbnailFallback from "../assets/thumbnail.jpg";
import episode8Fallback from "../assets/episode8.mp3";

const Previous = memo(() => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [visibleEpisodes, setVisibleEpisodes] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/episodes');
        if (response.ok) {
          const data = await response.json();
          setEpisodes(data);
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisodes();
  }, []);

  const handleLoadMore = () => {
    navigate('/episodes');
  };

  const displayedEpisodes = episodes.slice(0, visibleEpisodes);

  return (
    <section className="previous bg-primary grid justify-items-center p-4 pb-[3rem]">
      <div className="grid justify-items-center w-full md:w-[80%]">
        <motion.h2 
          className="font-bold text-accent text-2xl md:text-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Start Listening Today
        </motion.h2>
        <motion.h3 
          className="text-dark font-medium text-3xl md:text-4xl mt-[1rem] md:mt-[2rem] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Previous Episodes
        </motion.h3>
        {loading ? (
          <div className="text-dark text-xl mt-8">Loading episodes...</div>
        ) : displayedEpisodes.length === 0 ? (
          <div className="text-dark text-xl mt-8">No episodes available yet.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-[2rem]">
              {displayedEpisodes.map((episode, index) => (
                <motion.div 
                  key={episode._id} 
                  className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <img 
                    className="w-full" 
                    src={episode.thumbnailUrl || thumbnailFallback} 
                    alt={episode.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex justify-between w-full text-primary text-[0.8rem] md:text-[0.9rem]">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar-days"></i>
                      <p>{new Date(episode.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-clock"></i>
                      <p>{episode.durationHuman || 'N/A'}</p>
                    </div>
                  </div>
                  <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold text-white">
                    {episode.title}
                  </h3>
                  <AudioPlayer audioUrl={episode.audioUrl || episode8Fallback} compact />
                  {episode.youtubeUrl && (
                    <a
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 px-6 py-2 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/80 transition-colors text-center"
                    >
                      Watch Full Video
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
            {episodes.length > visibleEpisodes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  text="Load More"
                  onClick={handleLoadMore}
                  className="bg-accent hover:bg-accent/80 mt-8 px-[2rem] md:px-[3rem] transition-none w-full md:w-auto"
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
});

Previous.displayName = "Previous";

export default Previous;
