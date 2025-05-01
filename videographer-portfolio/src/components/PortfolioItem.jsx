import { useState } from 'react';
import { motion } from 'framer-motion';

const PortfolioItem = ({ image, title, category, videoUrl, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <span className="text-accent text-sm font-medium">{category}</span>
          <h3 className="text-white text-xl font-bold mt-1">{title}</h3>
          
          {/* Play button for videos */}
          {videoUrl && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-accent text-white px-4 py-2 rounded-full flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                window.open(videoUrl, '_blank');
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Watch</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
