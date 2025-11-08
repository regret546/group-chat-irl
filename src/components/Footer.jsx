import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoBlack from "../assets/logo-black.png";
import { useNotification } from "../contexts/NotificationContext";

const Footer = memo(() => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(
          "success",
          "Message sent successfully! We'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
        setIsModalOpen(false);
      } else {
        showNotification(
          "error",
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      showNotification("error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div>
            <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold">
              Message Us
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-base md:text-1xl font-medium hover:text-accent transition flex items-center gap-2 justify-center md:justify-start cursor-pointer"
            >
              <i className="fa-solid fa-envelope text-dark text-xl"></i>
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
      <p className="bg-dark w-full grid place-items-center text-white py-4 text-sm md:text-base text-center px-4">
        GroupChat IRL Podcast &copy; 2025. All Rights Reserved.
      </p>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-dark">
                    Send us a Message
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

Footer.displayName = "Footer";

export default Footer;
