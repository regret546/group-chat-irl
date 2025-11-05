import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import irlCard from "../assets/irl-card.png";
import groupPhoto from "../assets/group-photo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleEpisodesClick = () => {
    navigate("/episodes");
  };

  return (
    <section className="bg-primary grid place-items-center py-[1rem] md:py-[2rem]">
      <div className="flex-col md:flex-row md:flex justify-center p-[1rem] md:p-[2rem] pb-0 relative w-full md:w-[80%]">
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 flex pb-[2rem]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full md:w-[85%]">
            <motion.img
              src={irlCard}
              alt="card"
              className="w-full"
              loading="eager"
              fetchPriority="high"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="text-[1rem] md:text-[1.25rem] mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to our podcast where we dive into completely random topics
              here in Dumaguete (and sometimes beyond!). We'll give you our
              unfiltered opinions and advice, covering everything from serious
              issues to the truly non-sensical. If you're looking for something
              that's sometimes serious, but mostly unserious, then you've come
              to the right place. We can't tell you what to do, but we sure hope
              you'll tune in!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                text="All Episodes"
                onClick={handleEpisodesClick}
                className="bg-accent hover:bg-accent/80 mt-[1rem] px-[2rem] md:px-[3rem] transition-none w-full md:w-auto"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            className="w-full h-auto max-w-full md:max-w-[900px] object-contain"
            src={groupPhoto}
            alt="Group photo"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
