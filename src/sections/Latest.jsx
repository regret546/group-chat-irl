import { useRef, useState, useEffect } from "react";
import WetPaintButton from "../components/UI/WetButton";
import Waveform from "../components/UI/Waveform";
import thumbnailFallback from "../assets/thumbnail.jpg";
import episode8Fallback from "../assets/episode8.mp3";

const Latest = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime + seconds);
    }
  };

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
        <WetPaintButton
          text={"Latest Episode"}
          className={"w-[180px] md:w-[200px] h-[45px] md:h-[50px] mt-2 md:mt-5"}
        />

        {/* Mobile Layout - Stacked Vertical */}
        <div className="flex flex-col md:hidden gap-4 w-full items-center px-4 max-w-full">
          {/* Thumbnail */}
          <img
            className="w-[min(280px,90vw)] h-[min(280px,90vw)] object-cover shadow-lg"
            src={latestEpisode.thumbnailUrl || thumbnailFallback}
            alt={latestEpisode.title}
            loading="eager"
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
              <i
                className="fa-solid fa-rotate-left relative cursor-pointer text-2xl"
                onClick={() => handleSkip(-10)}
              >
                <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                  10
                </span>
              </i>

              {/* Play / Pause */}
              <i
                className={`text-[3rem] fa-solid ${
                  isPlaying ? "fa-pause" : "fa-play"
                } cursor-pointer`}
                onClick={handlePlayPause}
              ></i>

              {/* Forward 30s */}
              <i
                className="fa-solid fa-rotate-right relative cursor-pointer text-2xl"
                onClick={() => handleSkip(30)}
              >
                <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                  30
                </span>
              </i>
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
        </div>

        {/* Desktop Layout - Responsive Column */}
        <div className="hidden md:flex flex-col lg:flex-row gap-6 w-full items-start">
          {/* Thumbnail */}
          <img
            className="w-full lg:w-[400px] h-[250px] lg:h-[300px] object-cover flex-shrink-0"
            src={latestEpisode.thumbnailUrl || thumbnailFallback}
            alt={latestEpisode.title}
            loading="eager"
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
                <i
                  className="fa-solid fa-rotate-left relative cursor-pointer text-3xl"
                  onClick={() => handleSkip(-10)}
                >
                  <span className="absolute text-[0.7rem] left-[15px] top-[15px]">
                    10
                  </span>
                </i>

                {/* Play / Pause */}
                <i
                  className={`text-[4rem] fa-solid ${
                    isPlaying ? "fa-pause" : "fa-play"
                  } cursor-pointer`}
                  onClick={handlePlayPause}
                ></i>

                {/* Forward 30s */}
                <i
                  className="fa-solid fa-rotate-right relative cursor-pointer text-3xl"
                  onClick={() => handleSkip(30)}
                >
                  <span className="absolute text-[0.7rem] left-[15px] top-[15px]">
                    30
                  </span>
                </i>
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
        </div>
      </div>
    </section>
  );
};

export default Latest;
