import { useRef, useState } from "react";
import WetPaintButton from "../components/UI/WetButton";
import Waveform from "../components/UI/Waveform";

const Latest = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <section className="latest w-full grid justify-items-center min-h-[500px] bg-dark pb-[2rem] py-4 overflow-x-hidden">
      <div className="p-4 w-full md:w-[80%] grid justify-items-center gap-[2rem] md:gap-[3rem] max-w-full">
        <WetPaintButton
          text={"Latest Episode"}
          className={"w-[180px] md:w-[200px] h-[45px] md:h-[50px] mt-2 md:mt-5"}
        />

        {/* Mobile Layout - Centered & Stacked */}
        <div className="flex flex-col md:hidden gap-6 w-full items-center px-4 max-w-full">
          {/* Thumbnail */}
          <img
            className="w-[min(280px,90vw)] h-[min(280px,90vw)] object-cover shadow-lg"
            src="/src/assets/thumbnail.jpg"
            alt="thumbnail"
          />

          {/* Episode Title */}
          <h2 className="text-white text-lg font-bold text-center px-2">
            EPISODE 8: Atty. Jelou Ann Feb Tabanao-Salon
          </h2>

          {/* Custom Audio Player */}
          <div className="w-full max-w-full">
            {/* Main Player Bar */}
            <div className="flex items-center gap-2 bg-dark/50 border border-white/20 rounded-lg p-3">
              {/* Play Button */}
              <button
                className="w-11 h-11 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition flex-shrink-0"
                onClick={handlePlayPause}
              >
                <i
                  className={`fa-solid ${
                    isPlaying ? "fa-pause" : "fa-play"
                  } text-dark text-base ${!isPlaying ? "ml-0.5" : ""}`}
                ></i>
              </button>

              {/* Waveform with built-in time display */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <Waveform
                  audioUrl="/src/assets/episode8.mp3"
                  audioRef={audioRef}
                />
              </div>

              {/* Volume Icon */}
              <button className="flex-shrink-0 text-primary text-lg hover:text-primary/80 transition">
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 mt-6">
              {/* Rewind 15s */}
              <button
                className="relative text-primary text-2xl sm:text-3xl hover:text-primary/80 transition"
                onClick={() => handleSkip(-15)}
              >
                <i className="fa-solid fa-rotate-left"></i>
                <span className="absolute text-[0.6rem] sm:text-[0.65rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                  15
                </span>
              </button>

              {/* Forward 30s */}
              <button
                className="relative text-primary text-2xl sm:text-3xl hover:text-primary/80 transition"
                onClick={() => handleSkip(30)}
              >
                <i className="fa-solid fa-rotate-right"></i>
                <span className="absolute text-[0.6rem] sm:text-[0.65rem] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark">
                  30
                </span>
              </button>

              {/* Playback Speed */}
              <button className="text-primary text-base sm:text-lg font-bold border-2 border-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-primary hover:text-dark transition">
                1×
              </button>

              {/* Download */}
              <button className="text-primary text-xl sm:text-2xl hover:text-primary/80 transition">
                <i className="fa-solid fa-download"></i>
              </button>

              {/* Share */}
              <button className="text-primary text-xl sm:text-2xl hover:text-primary/80 transition">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio ref={audioRef} src="/src/assets/episode8.mp3" />
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:flex flex-row gap-4 w-full">
          <img
            className="w-[500px] h-[300px] object-cover"
            src="/src/assets/thumbnail.jpg"
            alt="thumbnail"
          />

          <div className="w-full">
            <h2 className="text-white text-3xl mb-2">
              EPISODE 8: Atty. Jelou Ann Feb Tabanao-Salon
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-white">
              {/* Back 10s */}
              <i
                className="fa-solid fa-rotate-left relative cursor-pointer"
                onClick={() => handleSkip(-10)}
              >
                <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                  10
                </span>
              </i>

              {/* Play / Pause */}
              <i
                className={`text-[2.5rem] fa-solid ${
                  isPlaying ? "fa-pause" : "fa-play"
                } cursor-pointer`}
                onClick={handlePlayPause}
              ></i>

              {/* Forward 30s */}
              <i
                className="fa-solid fa-rotate-right relative cursor-pointer"
                onClick={() => handleSkip(30)}
              >
                <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                  30
                </span>
              </i>

              {/* Waveform visualization */}
              <audio
                ref={audioRef}
                src="/src/assets/episode8.mp3"
                preload="metadata"
              />
              <Waveform
                audioUrl="/src/assets/episode8.mp3"
                audioRef={audioRef}
              />

              <i className="fa-solid fa-volume-high cursor-pointer"></i>
              <i className="fa-solid fa-download cursor-pointer"></i>
              <i className="fa-solid fa-share-nodes cursor-pointer"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
