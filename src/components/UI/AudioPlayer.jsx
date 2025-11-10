import { useRef, useState, useEffect } from 'react';
import Waveform from './Waveform';

const AudioPlayer = ({ audioUrl, compact = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update time display
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setMeta);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setMeta);
    };
  }, [audioUrl]);

  if (compact) {
    // Compact player for cards - just waveform with controls
    return (
      <div className="w-full">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        <div className="flex items-start gap-2">
          {/* Skip and Play Controls - aligned with waveform visualization */}
          {/* Padding accounts for: label (~20px) + mb-1 (4px) + gap-1 (4px) + time labels (~16px) + gap-1 (4px) + half waveform (32px) - half control height (~12px) = ~68px */}
          <div className="flex items-center gap-1 pt-[68px]">
            <button
              onClick={() => handleSkip(-10)}
              className="relative text-primary hover:text-primary/80 transition flex-shrink-0"
            >
              <i className="fa-solid fa-rotate-left text-base"></i>
              <span className="absolute text-[0.5rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                10
              </span>
            </button>

            <button
              onClick={handlePlayPause}
              className="flex-shrink-0"
            >
              <i
                className={`text-primary text-xl fa-solid ${
                  isPlaying ? "fa-pause" : "fa-play"
                }`}
              />
            </button>

            <button
              onClick={() => handleSkip(30)}
              className="relative text-primary hover:text-primary/80 transition flex-shrink-0"
            >
              <i className="fa-solid fa-rotate-right text-base"></i>
              <span className="absolute text-[0.5rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                30
              </span>
            </button>
          </div>

          {/* Waveform (contains time labels above it) */}
          <div className="flex-1">
            <Waveform audioUrl={audioUrl} audioRef={audioRef} />
          </div>
        </div>
      </div>
    );
  }

  // Full player with all controls
  return (
    <div className="w-full">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Waveform (contains time labels above it) */}
      <div className="mb-3">
        <Waveform audioUrl={audioUrl} audioRef={audioRef} />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleSkip(-10)}
          className="relative text-primary hover:text-primary/80 transition"
        >
          <i className="fa-solid fa-rotate-left text-lg"></i>
          <span className="absolute text-[0.5rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
            10
          </span>
        </button>

        <button
          onClick={handlePlayPause}
          className="flex-shrink-0"
        >
          <i
            className={`text-primary text-2xl fa-solid ${
              isPlaying ? "fa-pause" : "fa-play"
            } ${!isPlaying ? "ml-0.5" : ""}`}
          />
        </button>

        <button
          onClick={() => handleSkip(30)}
          className="relative text-primary hover:text-primary/80 transition"
        >
          <i className="fa-solid fa-rotate-right text-lg"></i>
          <span className="absolute text-[0.5rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
            30
          </span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button className="text-primary hover:text-primary/80 transition">
            <i className="fa-solid fa-volume-high text-lg"></i>
          </button>
          <button className="text-primary hover:text-primary/80 transition">
            <i className="fa-solid fa-share-nodes text-lg"></i>
          </button>
          <button className="text-primary hover:text-primary/80 transition">
            <i className="fa-solid fa-download text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

