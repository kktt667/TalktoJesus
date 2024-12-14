// components/DivineLogo.tsx
import { motion } from 'framer-motion';

export const DivineLogo = () => (
  <motion.div 
    className="flex items-center space-x-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-8 h-8">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#ffd700]/20 to-transparent rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <span className="text-xl">🕊️</span>
      </div>
    </div>
    <h1 className="text-lg font-cinzel text-white/90 tracking-wider">
      Jesus Connect
    </h1>
  </motion.div>
);