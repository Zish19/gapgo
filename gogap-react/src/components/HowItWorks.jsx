import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  { num: "01", title: "Search & Compare", desc: "Enter your location and dates. Instantly see available vehicles from every verified local partner, with clear prices." },
  { num: "02", title: "Book in a Tap", desc: "Select your ride, upload your ID, and pay securely. No calls, no waiting for quotes." },
  { num: "03", title: "Doorstep Delivery", desc: "The partner drops the vehicle exactly where you need it, and picks it up when you're done." }
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [20, 980]);

  return (
    <section id="how" className="relative py-24 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-widest text-sage-mid"
        >
          HOW IT WORKS
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl mt-3 tracking-tight text-forest"
        >
          Skip the counter. Start the engine.
        </motion.h2>
      </div>

      <div className="max-w-4xl mx-auto relative hidden md:block mb-8">
        <svg viewBox="0 0 1000 60" className="w-full h-auto overflow-visible">
          {/* Background Track */}
          <line x1="20" y1="30" x2="980" y2="30" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
          
          {/* Progress Line */}
          <motion.line 
            x1="20" y1="30" 
            x2={lineProgress} y2="30" 
            stroke="#C9DED6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            className="drop-shadow-[0_0_8px_rgba(201,222,214,0.8)]"
          />
          
          {/* Nodes */}
          <circle cx="20" cy="30" r="8" fill="#14312A" />
          <circle cx="500" cy="30" r="8" fill="#14312A" />
          <circle cx="980" cy="30" r="8" fill="#14312A" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 md:gap-6 relative z-10">
        {STEPS.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: idx * 0.2 }}
            className="text-center md:text-left hiw-step"
          >
            <p className="font-mono text-3xl text-mint mb-3 font-semibold transition-colors duration-300">{step.num}</p>
            <h3 className="font-display font-bold text-xl text-forest mb-2">{step.title}</h3>
            <p className="text-sage-muted text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
