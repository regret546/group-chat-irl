import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../contexts/NotificationContext";

const MessageUs = memo(() => {
  const { showNotification } = useNotification();
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
    <section className="bg-primary py-[1.5rem] md:py-[2rem] grid place-items-center px-4">
      <div className="w-full md:w-[70%] max-w-2xl">
        <motion.h2
          className="text-dark text-center text-[1.5rem] md:text-[2rem] font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Message Us
        </motion.h2>
        <motion.p
          className="text-dark text-center text-[0.9rem] md:text-[1rem] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a question or want to reach out? Send us a message!
        </motion.p>
        <motion.div
          className="bg-white rounded-lg shadow-xl p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark mb-1"
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
                className="w-full px-3 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none text-dark"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark mb-1"
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
                className="w-full px-3 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none text-dark"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-dark mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border-2 border-dark rounded-lg focus:border-dark focus:outline-none resize-none text-dark"
                placeholder="Your message..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
});

MessageUs.displayName = "MessageUs";

export default MessageUs;

