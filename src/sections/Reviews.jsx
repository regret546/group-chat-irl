import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { div } from "motion/react-client";

const testimonials = [
  {
    id: 1,
    name: "Andre, CEO at COMPANY",
    text: "If I could give 11 stars, I would give 12.",
    img: "https://i.pravatar.cc/80?img=1",
  },
  {
    id: 2,
    name: "Jeremy, CEO at COMPANY",
    text: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! You saved me 100 hours last quarter.",
    img: "https://i.pravatar.cc/80?img=2",
  },
  {
    id: 3,
    name: "Pam, CEO at COMPANY",
    text: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    img: "https://i.pravatar.cc/80?img=3",
  },
  {
    id: 4,
    name: "Fernando, CEO at COMPANY",
    text: "It's just the best. Period.",
    img: "https://i.pravatar.cc/80?img=4",
  },
  {
    id: 5,
    name: "Andy, CEO at COMPANY",
    text: "I switched 5 years ago and never looked back.",
    img: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 6,
    name: "Andy, CEO at COMPANY",
    text: "I switched 5 years ago and never looked back.",
    img: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: 7,
    name: "Andy, CEO at COMPANY",
    text: "I switched 5 years ago and never looked back.",
    img: "https://i.pravatar.cc/80?img=5",
  },
];

const Reviews = () => {
  const [index, setIndex] = useState(2); // Start at middle
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-dark py-4 grid place-items-center px-4">
      <h2 className="text-accent text-center text-[2rem] md:text-[3rem] font-bold mb-4">
        What People Are Saying
      </h2>
      <div className="relative flex flex-col items-center justify-center h-[450px] md:h-[500px] overflow-hidden w-full md:w-[80%]">
        <div className="relative flex items-center justify-center w-full max-w-5xl">
          {testimonials.map((t, i) => {
            const offset = i - index;
            const isCenter = offset === 0;

            return (
              <motion.div
                key={t.id}
                className={`absolute w-[280px] md:w-[300px] h-[280px] md:h-[300px] rounded-md p-4 md:p-6 text-center shadow-lg [clip-path:polygon(0_0,calc(100%-50px)_0,100%_50px,100%_100%,0_100%)] border-2 border-black mb-[2rem] ${
                  isCenter ? "bg-primary text-white z-20" : "bg-accent z-10"
                }`}
                style={{
                  transformOrigin: "bottom center",
                }}
                animate={{
                  x: offset * (isMobile ? 100 : 180),
                  scale: isCenter ? 1 : (isMobile ? 0.7 : 0.9),
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
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full mb-3 md:mb-4"
                />
                <p className="text-base md:text-lg font-medium leading-snug">"{t.text}"</p>
                <p className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">– {t.name}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-6 flex gap-4 md:gap-6">
          <button
            onClick={prev}
            className="p-2 md:p-3 bg-primary text-white rounded-full hover:bg-primary/80 hover:scale-110 md:hover:scale-120 transition"
          >
            <ChevronLeft className="cursor-pointer text-black w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={next}
            className="p-2 md:p-3 bg-primary text-white rounded-full hover:bg-primary/80 hover:scale-110 md:hover:scale-120 transition"
          >
            <ChevronRight className="cursor-pointer text-black w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
