import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          <span className="text-accent">Lens</span>
          <span className="text-white">Craft</span>
        </motion.div>
        
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-accent rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
