import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl, audioRef }) {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // If you want a final background color behind the waveform canvas,
  // set FINAL_CANVAS_BG to that (e.g. 'transparent' or '#0b0b0b')
  const FINAL_CANVAS_BG = "transparent";

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

    setIsLoading(true);
    // add a temporary loading background on the wrapper so skeleton is visible
    waveformRef.current.style.background =
      "var(--loading-bg, rgba(0,0,0,0.25))";

    wavesurfer.load(audioUrl);

    wavesurfer.on("ready", () => {
      if (isDestroyed) return;

      setDuration(wavesurfer.getDuration());

      // ensure the canvas exists, then set its background to the FINAL value
      const canvas = waveformRef.current.querySelector("canvas");
      if (canvas) {
        // Set canvas CSS background to the final value (covers bar gaps)
        canvas.style.background = FINAL_CANVAS_BG;
        // Ensure canvas is fully opaque so the wrapper bg doesn't show
        canvas.style.display = canvas.style.display || "block";
      }

      // Small delay to let the browser paint the canvas before removing the skeleton.
      // You can reduce this if it's long for you.
      setTimeout(() => {
        // remove the temporary wrapper background
        if (waveformRef.current)
          waveformRef.current.style.background = "transparent";
        setIsLoading(false);
      }, 180);
    });

    wavesurfer.on("error", (err) => {
      if (err.name !== "AbortError") console.error("Wavesurfer error:", err);
      if (waveformRef.current)
        waveformRef.current.style.background = "transparent";
      setIsLoading(false);
    });

    return () => {
      isDestroyed = true;
      try {
        wavesurfer.destroy();
      } catch {
        /* ignore */
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
      <div className="relative w-full h-[64px] rounded-md overflow-hidden">
        {/* Skeleton overlay while loading */}
        <div
          aria-hidden
          className={`absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* customize skeleton look */}
          <div className="w-full h-full rounded-md animate-pulse bg-[var(--color-primary)]/20" />
        </div>

        {/* Waveform container where WaveSurfer mounts */}
        <div
          ref={waveformRef}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isLoading ? "opacity-60" : "opacity-100"
          }`}
          // ensure wrapper has no persistent background by default
          style={{ background: "transparent" }}
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
