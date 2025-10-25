import { motion } from "framer-motion";

export default function AnimatedButton({
  text = "Click Me",
  onClick,
  padding = "px-6 py-3",
  radius = "rounded-xl",
  className = "",
}) {
  const baseColor = "var(--color-primary)";
  const hoverColor = "var(--color-secondary)";
  const textColor = "var(--color-dark)";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative font-semibold cursor-pointer transition-colors duration-300 ${padding} ${radius} ${className}`}
      style={{
        backgroundColor: baseColor,
        color: textColor,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = baseColor)}
    >
      {text}
    </motion.button>
  );
}
