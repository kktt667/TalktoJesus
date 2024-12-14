// components/ScrollInput.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface ScrollInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const ScrollInput: React.FC<ScrollInputProps> = ({ 
  value, 
  onChange, 
  onSend,
  disabled = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-[#f4e4bc] to-[#e8d4a0] rounded-lg shadow-inner"
        />

        <div className="relative">
          <textarea
            value={value}
            onChange={onChange}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Write your question on this sacred scroll..."
            className={`
              w-full min-h-[120px] px-8 py-6
              bg-transparent
              font-cormorant text-lg text-[#2a1810]
              placeholder-[#2a1810]/50
              resize-none focus:outline-none
              scroll-writing-style
            `}
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #b3a17f 31px, #b3a17f 32px)",
              lineHeight: "32px",
              padding: "8px 8px 8px 40px"
            }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={disabled}
            onClick={onSend}
            className={`
              absolute right-4 bottom-4
              w-10 h-10 rounded-full
              bg-gradient-to-r from-[#ffd700] to-[#b8860b]
              flex items-center justify-center
              shadow-lg hover:shadow-xl
              transition-shadow duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <motion.span
              animate={{ rotate: disabled ? 0 : 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-white text-xl"
            >
              ✨
            </motion.span>
          </motion.button>
        </div>

        <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-[#b3a17f]/30" />
        <div className="absolute left-4 top-[31px] bottom-4 border-l border-[#b3a17f]/20" />
      </div>

      <style jsx>{`
        .scroll-writing-style {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.5px;
        }

        textarea::placeholder {
          color: rgba(42, 24, 16, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default ScrollInput;