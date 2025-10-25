import { motion } from "framer-motion";
import { useState } from "react";

export default function WetPaintButton({ text = "Wet Paint Button", onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const drips = [
    { left: "10%", height: 24, delay: 0 },
    { left: "30%", height: 20, delay: 0.4 },
    { left: "57%", height: 14, delay: 0.8 },
    { left: "85%", height: 18, delay: 1.2 },
  ];


  const baseColor = "var(--color-primary)";
  const hoverColor = "var(--color-secondary)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded px-4 py-2.5 font-semibold text-[var(--color-dark)] cursor-pointer overflow-visible transition-all"
      style={{
        backgroundColor: isHovered ? hoverColor : baseColor,
        transition: "background-color 0.3s ease",
      }}
    >
      {text}

      {drips.map((drip, i) => (
        <motion.div
          key={i}
          className="absolute top-[99%] origin-top"
          style={{ left: drip.left }}
          animate={{ scaleY: [1, 0.85, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: drip.delay,
            ease: "easeInOut",
          }}
        >
          {/* Stem */}
          <div
            className="w-2 rounded-b-full transition-colors"
            style={{
              height: drip.height,
              backgroundColor: isHovered ? hoverColor : baseColor,
              transition: "background-color 0.3s ease",
            }}
          ></div>

          {/* Left curve */}
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-full top-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
              style={{
                fill: isHovered ? hoverColor : baseColor,
                transition: "fill 0.3s ease",
              }}
            />
          </svg>

          {/* Right curve */}
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-full top-0 rotate-90"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
              style={{
                fill: isHovered ? hoverColor : baseColor,
                transition: "fill 0.3s ease",
              }}
            />
          </svg>

          {/* Falling droplet */}
          <motion.div
            className="absolute top-full h-2 w-2 rounded-full transition-colors"
            style={{
              backgroundColor: isHovered ? hoverColor : baseColor,
              transition: "background-color 0.3s ease",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, 45],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: drip.delay + 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>
      ))}
    </button>
  );
}
