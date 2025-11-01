import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WetPaintButton from "./UI/WetButton";
import Button from "./UI/Button";
import { div } from "motion/react-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full grid place-items-center bg-dark">
      <nav className="flex justify-between items-center w-full md:w-[80%] px-[1rem] md:px-[2rem] py-[1.5rem] text-white">
        <img
          className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
          src="/src/assets/logo-white.png"
          alt="logo"
        />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-[2rem] text-[1.2rem]">
            {["Home", "Episodes", "Reviews"].map((item) => (
              <li
                key={item}
                className="relative cursor-pointer font-semibold text-white 
                         after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                         after:w-0 after:h-[2px] after:bg-[#FCAB1C]
                         after:transition-all after:duration-300
                         hover:text-[#FCAB1C] hover:after:w-full"
              >
                {item}
              </li>
            ))}
          </ul>
          <Button
            text="Subscribe"
            className="bg-primary text-dark hover:bg-primary/80 transition-none"
          />
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          className="md:hidden text-white text-2xl z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!isMenuOpen && (
              <motion.i
                key="menu"
                className="fa-solid fa-bars"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu - Half Screen Overlay (Vertical) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 left-0 right-0 h-[50vh] bg-dark md:hidden z-50 overflow-hidden shadow-2xl"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button - Top Right */}
              <motion.button
                className="absolute top-3 right-3 text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fa-solid fa-times"></i>
              </motion.button>

              {/* Menu Items - Left Aligned */}
              <motion.ul className="flex flex-col justify-center h-full px-4 xs:px-6 sm:px-8 gap-2 xs:gap-3">
                {["Home", "Episodes", "Reviews"].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="cursor-pointer font-black text-white text-2xl xs:text-3xl sm:text-4xl hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.li>
                ))}
                <motion.div variants={itemVariants} className="mt-2">
                  <Button
                    text="Subscribe"
                    className="bg-primary text-dark hover:bg-primary/80 transition-none px-4 xs:px-6 py-2 xs:py-2.5 text-sm xs:text-base"
                  />
                </motion.div>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
