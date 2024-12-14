// components/ParableCard.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface ParableCardProps {
  card: {
    id: string;
    title: string;
    prompt: string;
    icon: string;
    theme: string;
  };
  onClick: () => void;
}

export const ParableCard: React.FC<ParableCardProps> = ({ card, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent 
                   rounded-xl blur-xl group-hover:opacity-100 opacity-50 transition-opacity" 
      />
      <div className="relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                     from-transparent via-[#ffd700]/50 to-transparent" 
        />
        <div 
          className="p-6 border border-white/20 rounded-xl
                     hover:border-white/40 transition-colors"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                         backdrop-blur-md border border-white/20"
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <h3 className="font-cinzel text-lg text-white/90">{card.title}</h3>
          </div>
          <p className="font-cormorant text-white/70 text-lg">{card.prompt}</p>
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm
                        border border-white/20 font-cinzel text-sm text-white/90
                        hover:bg-white/20 transition-all duration-300"
            >
              Seek Wisdom
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParableCard;