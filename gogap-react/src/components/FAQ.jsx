import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "Does gapgo own any vehicles?",
    a: "No. gapgo is purely a marketplace. Every vehicle belongs to a verified local rental partner. We handle discovery, booking and delivery coordination."
  },
  {
    q: "Who delivers the vehicle?",
    a: "The rental partner's own team delivers and picks up the vehicle. gapgo coordinates the schedule and keeps both sides updated in real time."
  },
  {
    q: "How do I book a vehicle?",
    a: "Simply enter your location and dates, compare options from verified local partners, and book instantly. The vehicle will be delivered straight to your doorstep!"
  },
  {
    q: "Are the vehicles and drivers verified?",
    a: "Yes! Every rental partner on our platform goes through a strict verification process to ensure safety, reliability, and top-quality service for your trips."
  },
  {
    q: "What is the cancellation policy?",
    a: "Most bookings can be cancelled free of charge up to 24 hours before your trip starts. Check the specific partner's policy during checkout."
  },
  {
    q: "Do I need to pay a security deposit?",
    a: "Yes, a fully refundable security deposit is usually required. The amount depends on the vehicle category and the specific rental partner."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="text-xs font-mono tracking-widest text-sage-mid">FAQ</span>
        <h2 className="font-display font-bold text-3xl mt-3 tracking-tight text-forest">Questions, answered.</h2>
      </motion.div>
      
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-forest/10 overflow-hidden bg-white/30"
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left px-5 py-4 font-display font-semibold text-forest focus:outline-none"
              >
                <span dangerouslySetInnerHTML={{ __html: faq.q.replace('gapgo', '<span class="font-brand text-lg">gapgo</span>') }} />
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 overflow-hidden"
                  >
                    <p 
                      className="pb-4 text-sm text-sage-muted"
                      dangerouslySetInnerHTML={{ __html: faq.a.replace('gapgo', '<span class="font-brand text-lg">gapgo</span>') }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
