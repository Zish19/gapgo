import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-mint/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full z-10"
      >
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight text-forest leading-[1.05] mb-6">
          The everything app for <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-pine">vehicle rentals</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-sage-muted max-w-2xl mx-auto leading-relaxed mb-10">
          Compare 100+ local rental partners in one tap. Instant booking, transparent pricing, and doorstep delivery for cars, bikes, and EVs.
        </p>

      </motion.div>
    </section>
  );
}
