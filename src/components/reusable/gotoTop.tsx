"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Assuming you're using Lucide icons
import { useWindowScroll } from "react-use"; // Optional: For easier scroll tracking
import { motion } from "framer-motion"; // For smooth animation

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { y } = useWindowScroll(); // Optional: Provides scroll position

  useEffect(() => {
    // Show button when scrolled down 300px
    setIsVisible(y > 300);
  }, [y]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 bg-primary text-white rounded-full shadow-lg z-[999]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
};

export default GoToTopButton;
