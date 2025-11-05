import { useRef, useState, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import WetPaintButton from "../components/UI/WetButton";
import Waveform from "../components/UI/Waveform";
import thumbnailFallback from "../assets/thumbnail.jpg";
import episode8Fallback from "../assets/episode8.mp3";

const Latest = memo(() => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSkip = useCallback((seconds) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime + seconds);
    }
  }, []);

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        const response = await fetch('/api/episodes');
        if (response.ok) {
          const episodes = await response.json();
          if (episodes.length > 0) {
            // Episodes are sorted by uploadDate desc from the API
            setLatestEpisode(episodes[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching latest episode:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestEpisode();
  }, []);

  if (loading) {
    return (
      <section className="latest w-full grid justify-items-center min-h-[500px] bg-dark pb-[2rem] py-4">
        <div className="text-primary text-xl">Loading latest episode...</div>
      </section>
    );
  }

  if (!latestEpisode) {
    return (
      <section className="latest w-full grid justify-items-center min-h-[500px] bg-dark pb-[2rem] py-4">
        <div className="text-white text-xl">No episodes available yet.</div>
      </section>
    );
  }

  return (
    <section className="latest w-full grid justify-items-center min-h-[500px] bg-dark pb-[2rem] py-4 overflow-x-hidden">
      <div className="p-4 w-full md:w-[80%] grid justify-items-center gap-[2rem] md:gap-[3rem] max-w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <WetPaintButton
            text={"Latest Episode"}
            className={"w-[180px] md:w-[200px] h-[45px] md:h-[50px] mt-2 md:mt-5"}
          />
        </motion.div>

        {/* Mobile Layout - Stacked Vertical */}
        <motion.div 
          className="flex flex-col md:hidden gap-4 w-full items-center px-4 max-w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Thumbnail */}
          <motion.img
            className="w-[min(280px,90vw)] h-[min(280px,90vw)] object-cover shadow-lg"
            src={latestEpisode.thumbnailUrl || thumbnailFallback}
            alt={latestEpisode.title}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />

          {/* Episode Title */}
          <h2 className="text-white text-lg font-bold text-center px-2">
            {latestEpisode.title}
          </h2>

          {/* Audio Player Controls - Vertical Stack */}
          <div className="w-full flex flex-col items-center gap-3">
            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              src={latestEpisode.audioUrl || episode8Fallback}
              preload="metadata"
            />
            
            {/* Waveform on top */}
            <div className="w-full">
              <Waveform
                audioUrl={latestEpisode.audioUrl || episode8Fallback}
                audioRef={audioRef}
              />
            </div>

            {/* Playback controls in the middle */}
            <div className="flex items-center gap-4 text-white">
              {/* Back 10s */}
              <button
                className="relative cursor-pointer text-2xl flex items-center justify-center w-10 h-10"
                onClick={() => handleSkip(-10)}
              >
                <i className="fa-solid fa-rotate-left"></i>
                <span className="absolute text-[0.6rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                  10
                </span>
              </button>

              {/* Play / Pause */}
              <i
                className={`text-[3rem] fa-solid ${
                  isPlaying ? "fa-pause" : "fa-play"
                } cursor-pointer`}
                onClick={handlePlayPause}
              ></i>

              {/* Forward 30s */}
              <button
                className="relative cursor-pointer text-2xl flex items-center justify-center w-10 h-10"
                onClick={() => handleSkip(30)}
              >
                <i className="fa-solid fa-rotate-right"></i>
                <span className="absolute text-[0.6rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                  30
                </span>
              </button>
            </div>

            {/* Watch Full Video button at bottom */}
            {latestEpisode.youtubeUrl && (
              <a
                href={latestEpisode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/80 transition-colors text-sm text-center"
              >
                Watch Full Video
              </a>
            )}
          </div>
        </motion.div>

        {/* Desktop Layout - Responsive Column */}
        <motion.div 
          className="hidden md:flex flex-col lg:flex-row gap-6 w-full items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Thumbnail */}
          <motion.img
            className="w-full lg:w-[400px] h-[250px] lg:h-[300px] object-cover flex-shrink-0"
            src={latestEpisode.thumbnailUrl || thumbnailFallback}
            alt={latestEpisode.title}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />

          <div className="w-full flex flex-col gap-4">
            <h2 className="text-white text-2xl lg:text-3xl">
              {latestEpisode.title}
            </h2>

            {/* Audio Player Controls - Vertical Stack */}
            <div className="w-full flex flex-col gap-4">
              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={latestEpisode.audioUrl || episode8Fallback}
                preload="metadata"
              />
              
              {/* Waveform on top */}
              <div className="w-full">
                <Waveform
                  audioUrl={latestEpisode.audioUrl || episode8Fallback}
                  audioRef={audioRef}
                />
              </div>

              {/* Playback controls in the middle */}
              <div className="flex items-center justify-center gap-6 text-white">
                {/* Back 10s */}
                <button
                  className="relative cursor-pointer text-3xl flex items-center justify-center w-12 h-12"
                  onClick={() => handleSkip(-10)}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                  <span className="absolute text-[0.7rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                    10
                  </span>
                </button>

                {/* Play / Pause */}
                <i
                  className={`text-[4rem] fa-solid ${
                    isPlaying ? "fa-pause" : "fa-play"
                  } cursor-pointer`}
                  onClick={handlePlayPause}
                ></i>

                {/* Forward 30s */}
                <button
                  className="relative cursor-pointer text-3xl flex items-center justify-center w-12 h-12"
                  onClick={() => handleSkip(30)}
                >
                  <i className="fa-solid fa-rotate-right"></i>
                  <span className="absolute text-[0.7rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                    30
                  </span>
                </button>
              </div>

              {/* Watch Full Video button at bottom */}
              {latestEpisode.youtubeUrl && (
                <a
                  href={latestEpisode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/80 transition-colors text-center"
                >
                  Watch Full Video
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Latest.displayName = "Latest";

export default Latest;
