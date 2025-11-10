import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoBlack from "../assets/logo-black.png";

const Footer = memo(() => {
  const navigate = useNavigate();
  const [latestEpisodes, setLatestEpisodes] = useState([]);

  useEffect(() => {
    const fetchLatestEpisodes = async () => {
      try {
        const response = await fetch("/api/episodes");
        if (response.ok) {
          const data = await response.json();
          // Get top 5 latest episodes (already sorted by uploadDate descending)
          setLatestEpisodes(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchLatestEpisodes();
  }, []);

  return (
    <motion.div
      className="bg-primary text-dark grid place-items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row justify-evenly items-center w-full md:w-[80%] gap-6 md:gap-0 py-6 md:py-8">
        <motion.img
          className="w-[100px] md:w-[150px]"
          src={logoBlack}
          alt="logo"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
          <div className="grid gap-2">
            <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold">
              Follow us
            </h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.youtube.com/@GroupChatIRLPodcast"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube text-dark text-2xl cursor-pointer hover:text-accent transition"></i>
              </a>
              <a
                href="https://www.facebook.com/gcirlpodcast"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook text-dark text-2xl cursor-pointer hover:text-accent transition"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold">Pages</h3>
            <ul className="text-base md:text-1xl font-medium">
              <li
                className="cursor-pointer hover:text-accent transition"
                onClick={() => navigate("/reviews")}
              >
                Reviews
              </li>
              <li
                className="cursor-pointer hover:text-accent transition"
                onClick={() => navigate("/episodes")}
              >
                Episodes
              </li>
            </ul>
          </div>
          {latestEpisodes.length > 0 && (
            <div>
              <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold mb-2">
                Latest Episodes
              </h3>
              <ul className="text-base md:text-1xl font-medium space-y-1">
                {latestEpisodes.map((episode) => (
                  <li
                    key={episode._id}
                    className="cursor-pointer hover:text-accent transition truncate max-w-[200px] md:max-w-none"
                    onClick={() => navigate("/episodes")}
                    title={episode.title}
                  >
                    {episode.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="bg-dark w-full grid place-items-center text-white py-4 text-sm md:text-base text-center px-4">
        GroupChat IRL Podcast &copy; 2025. All Rights Reserved.
      </p>
    </motion.div>
  );
});

Footer.displayName = "Footer";

export default Footer;
