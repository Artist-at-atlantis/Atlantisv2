import { motion } from 'framer-motion';
import { useState } from 'react';

// Placeholder for icon components - these would ideally be actual SVG components
const IconPlaceholder = ({ className }) => <div className={`w-10 h-10 bg-cyan-500/30 rounded ${className}`}></div>;

export default function PillarCard({ title, iconName, snippet, lore }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamically select icon based on iconName or use placeholder
  // In a real app, you might import icons like: import { IconOnboarding } from './icons';
  const IconComponent = IconPlaceholder; // Replace with actual icon mapping later

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(34, 211, 238, 0.5)",
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <>
      <motion.div
        className="bg-gray-900/70 border border-cyan-500/30 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center h-full"
        whileHover="hover"
        variants={cardVariants}
        onClick={() => setIsModalOpen(true)}
      >
        <IconComponent className="mb-4" />
        <h3 className="text-xl font-display text-cyan-300 mb-2">{title}</h3>
        <p className="text-sm text-gray-400 italic flex-grow">{snippet}</p>
      </motion.div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={() => setIsModalOpen(false)} // Close modal on backdrop click
        >
          <motion.div
            className="bg-gray-900 border border-cyan-500 rounded-lg p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-display text-cyan-300 mb-4">{title}</h2>
            <p className="text-gray-200 whitespace-pre-line">{lore}</p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

