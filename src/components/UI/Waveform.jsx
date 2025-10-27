import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl, audioRef }) {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Format seconds → mm:ss
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let isDestroyed = false;

    if (!waveformRef.current) return;

    const primaryColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#FCAB1C";

    // Create Wavesurfer instance only once
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: primaryColor,
      progressColor: "#ffffff",
      cursorColor: "#fff",
      barWidth: 2,
      barRadius: 3,
      responsive: true,
      height: 64,
      normalize: true,
      hideScrollbar: true,
      backend: "MediaElement",
      media: audioRef?.current || undefined,
    });

    waveSurferRef.current = wavesurfer;

    // Load audio
    setIsLoading(true);
    wavesurfer.load(audioUrl);

    // When ready
    wavesurfer.on("ready", () => {
      if (isDestroyed) return;
      setDuration(wavesurfer.getDuration());
      setIsLoading(false);
    });

    // Prevent error on destroy during load
    wavesurfer.on("error", (err) => {
      if (err.name !== "AbortError") {
        console.error("Wavesurfer error:", err);
      }
      setIsLoading(false);
    });

    // Cleanup safely
    return () => {
      isDestroyed = true;
      try {
        wavesurfer.destroy();
      } catch {
        /* ignore abort */
      }
    };
  }, [audioUrl, audioRef]);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [audioRef]);

  return (
    <div className="flex flex-col items-center gap-2 w-[400px]">
      {/* Waveform Container */}
      <div className="relative w-full h-[64px] rounded-md overflow-hidden">
        {/* Show skeleton while loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md" />
        )}

        {/* Actual waveform */}
        <div
          ref={waveformRef}
          className={`absolute inset-0 ${
            isLoading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-300"
          }`}
        />
      </div>

      {/* Time labels */}
      <div className="flex justify-between w-full text-xs text-gray-300">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
