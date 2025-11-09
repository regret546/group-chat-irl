import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "motion/react";

const Reviews = () => {
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
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-20 pb-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-primary text-xl">Loading reviews...</div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-xl">No reviews available yet.</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              What People Are Saying
            </h1>
            <p className="text-gray-400 text-center mb-12">
              See what our listeners have to say about the podcast
            </p>
            <div className="relative flex flex-col items-center justify-center h-[450px] md:h-[500px] overflow-hidden w-full">
              <div className="relative flex items-center justify-center w-full max-w-5xl">
                {reviews.map((review, i) => {
                  const offset = i - index;
                  const isCenter = offset === 0;

                  return (
                    <motion.div
                      key={review._id}
                      className={`absolute w-[280px] md:w-[300px] h-[280px] md:h-[300px] rounded-md p-4 md:p-6 text-center shadow-lg [clip-path:polygon(0_0,calc(100%-50px)_0,100%_50px,100%_100%,0_100%)] border-2 border-black mb-[2rem] ${
                        isCenter
                          ? "bg-primary text-white z-20"
                          : "bg-accent z-10"
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
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
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
                          review.reviewerPicUrl ||
                          `https://i.pravatar.cc/150?img=${i + 1}`
                        }
                        alt={review.reviewerName}
                        className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full mb-3 md:mb-4"
                        loading="lazy"
                      />
                      <p className="text-base md:text-lg font-medium leading-snug">
                        "{review.reviewText}"
                      </p>
                      <p className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
                        – {review.reviewerName}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute bottom-6 flex gap-4 md:gap-6">
                <button
                  onClick={prev}
                  className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full hover:bg-primary/80 hover:scale-110 transition flex items-center justify-center"
                >
                  <i className="fa-solid fa-chevron-left text-black text-lg md:text-xl"></i>
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full hover:bg-primary/80 hover:scale-110 transition flex items-center justify-center"
                >
                  <i className="fa-solid fa-chevron-right text-black text-lg md:text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
