import { motion } from "framer-motion";

export default function Button({
  text = "Click Me",
  onClick,
  padding = "px-6 py-3",
  radius = "rounded-xl",
  className = "",
  children,
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`font-semibold cursor-pointer transition-all duration-300 ${padding} ${radius} ${className}`}
    >
      {children || text}
    </motion.button>
  );
}
