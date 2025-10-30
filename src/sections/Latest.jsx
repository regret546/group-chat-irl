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
    <section className="latest w-full grid justify-items-center h-[500px] bg-dark pb-[2rem] ">
      <div className="p-4 w-[80%] grid justify-items-center gap-[3rem]">
        <WetPaintButton
          text={"Latest Episodes"}
          className={"w-[200px] h-[50px] mt-5"}
        />

        <div className="flex gap-4">
          <img
            className="w-[500px] h-[300px]"
            src="/src/assets/thumbnail.jpg"
            alt="thumbnail"
          />

          <div>
            <h2 className="text-white text-3xl mb-2">
              EPISODE 8: Atty. Jelou Ann Feb Tabanao-Salon
            </h2>

            <div className="flex items-center gap-3 text-white">
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

            {/* Hidden audio element */}
            <audio ref={audioRef} src="/src/assets/episode8.mp3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
