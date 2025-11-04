import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 100);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = ['Loading...', 'Preparing content...', 'Almost there...'];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        return randomText !== prev ? randomText : prev;
      });
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 90 && onLoadingComplete) {
      // Small delay for smooth transition
      setTimeout(() => {
        onLoadingComplete();
      }, 300);
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-dark z-[9999] flex items-center justify-center"
      >
        <div className="text-center">
          {/* Logo or Loading Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="w-full h-full border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-primary text-xl md:text-2xl font-semibold mb-4"
          >
            {loadingText}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 md:w-80 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="text-white text-sm mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;

