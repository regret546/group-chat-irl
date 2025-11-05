import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Reviews = memo(() => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          // Start at middle if we have reviews
          if (data.length > 0) {
            setIndex(Math.floor(data.length / 2));
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Move useMemo before early returns to follow Rules of Hooks
  const reviewCards = useMemo(() => {
    if (loading || reviews.length === 0) {
      return [];
    }

    return reviews.map((review, i) => {
      const offset = i - index;
      const isCenter = offset === 0;

      return (
        <motion.div
          key={review._id}
          className={`absolute w-[280px] md:w-[300px] h-[280px] md:h-[300px] rounded-md p-4 md:p-6 text-center shadow-lg [clip-path:polygon(0_0,calc(100%-50px)_0,100%_50px,100%_100%,0_100%)] border-2 border-black mb-[2rem] ${
            isCenter ? "bg-primary text-white z-20" : "bg-accent z-10"
          }`}
          style={{
            transformOrigin: "bottom center",
          }}
          animate={{
            x: offset * (isMobile ? 100 : 180),
            scale: isCenter ? 1 : isMobile ? 0.7 : 0.9,
            rotate: offset * 5,
            y: isCenter ? 0 : 20,
            opacity: Math.abs(offset) > (isMobile ? 1 : 2) ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* black diagonal bar */}
          <span
            className="absolute block origin-top-right rotate-45 bg-black"
            style={{
              right: "-4px",
              top: "48px",
              width: "70.71067811865476px",
              height: "4px",
            }}
          ></span>
          <img
            src={
              review.reviewerPicUrl || `https://i.pravatar.cc/150?img=${i + 1}`
            }
            alt={review.reviewerName}
            className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full mb-3 md:mb-4"
            loading="lazy"
            decoding="async"
          />
          <p className="text-base md:text-lg font-medium leading-snug">
            "{review.reviewText}"
          </p>
          <p className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
            – {review.reviewerName}
          </p>
        </motion.div>
      );
    });
  }, [reviews, index, isMobile, loading]);

  if (loading) {
    return (
      <div className="bg-dark py-4 grid place-items-center px-4 h-[450px] md:h-[500px]">
        <div className="text-accent text-xl">Loading reviews...</div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-dark py-4 grid place-items-center px-4 h-[450px] md:h-[500px]">
        <div className="text-accent text-xl">No reviews available yet.</div>
      </div>
    );
  }

  return (
    <div className="bg-dark py-4 grid place-items-center px-4">
      <motion.h2
        className="text-accent text-center text-[2rem] md:text-[3rem] font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What People Are Saying
      </motion.h2>
      <motion.h3
        className="text-white text-center text-[1.2rem] md:text-[1.6rem] font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        We Value Your Feedback
      </motion.h3>
      <div className="relative flex flex-col items-center justify-center h-[450px] md:h-[500px] overflow-hidden w-full md:w-[80%]">
        <div className="relative flex items-center justify-center w-full max-w-5xl">
          {reviewCards}
        </div>

        <div className="absolute bottom-6 flex gap-4 md:gap-6">
          <motion.button
            onClick={prev}
            className="p-2 md:p-3 bg-primary text-white rounded-full hover:bg-primary/80 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="cursor-pointer text-black w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            onClick={next}
            className="p-2 md:p-3 bg-primary text-white rounded-full hover:bg-primary/80 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="cursor-pointer text-black w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
