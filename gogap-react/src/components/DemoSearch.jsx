import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTNERS_DATA = {
  'Delhi': [
    { id: 1, name: 'Green Wheels', rating: '4.8', rides: 120, price: '₹X,XXX/day', delivery: '42 min' },
    { id: 2, name: 'Metro Rentals', rating: '4.6', rides: 85, price: '₹X,XXX/day', delivery: '55 min' },
    { id: 3, name: 'CityDrive Co.', rating: '4.9', rides: 210, price: '₹X,XXX/day', delivery: '30 min' }
  ],
  'Delhi NCR': [
    { id: 4, name: 'Capital Drive', rating: '4.8', rides: 420, price: '₹X,XXX/day', delivery: '50 min' },
    { id: 5, name: 'NCR Motors', rating: '4.4', rides: 95, price: '₹X,XXX/day', delivery: '70 min' },
    { id: 6, name: 'Prime Fleet', rating: '4.9', rides: 510, price: '₹X,XXX/day', delivery: '40 min' }
  ]
};

export default function DemoSearch() {
  const [city, setCity] = useState('Delhi');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setResults([]);
    
    // Simulate network delay
    setTimeout(() => {
      setResults(PARTNERS_DATA[city] || PARTNERS_DATA['Delhi NCR']);
      setIsSearching(false);
    }, 400);
  };

  return (
    <section className="relative z-20 -mt-8 max-w-4xl mx-auto px-6 mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-[2rem] bg-white p-4 sm:p-6 shadow-glow border border-forest/5"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E7566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <select 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-paper/50 border border-forest/10 text-forest font-medium focus:outline-none focus:border-mint focus:ring-2 focus:ring-mint/20 appearance-none transition-all"
            >
              <option value="Delhi">Delhi</option>
              <option value="Delhi NCR">Delhi NCR</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E7566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <input 
              type="datetime-local" 
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-paper/50 border border-forest/10 text-forest font-medium focus:outline-none focus:border-mint focus:ring-2 focus:ring-mint/20 transition-all" 
              defaultValue={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)} 
            />
          </div>

          <button 
            onClick={handleSearch}
            className="h-14 px-8 rounded-xl bg-forest text-paper font-semibold hover:bg-pine transition-colors sm:w-auto w-full flex items-center justify-center gap-2"
          >
            {isSearching ? 'Searching...' : 'Find Vehicles'}
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4 min-h-[160px]">
          <AnimatePresence>
            {results.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-forest/10 bg-white/40 p-5 hover-lift"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-display font-semibold text-forest">{partner.name}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9DED6"><path d="M12 3.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3.5Z"/></svg>
                      <span className="font-semibold text-forest">{partner.rating}</span>
                      <span className="text-sage-muted">({partner.rides})</span>
                    </div>
                  </div>
                  <span className="rounded bg-mint/20 text-mint text-[10px] font-mono px-2 py-0.5">{partner.delivery}</span>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-forest/10">
                  <span className="font-mono text-sm text-forest">{partner.price}</span>
                  <button className="text-xs font-semibold bg-forest text-paper px-3 py-1.5 rounded-lg hover:bg-pine transition-colors">Select</button>
                </div>
              </motion.div>
            ))}
            
            {results.length === 0 && !isSearching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sm:col-span-3 h-full flex flex-col items-center justify-center text-sage-muted py-8 border border-dashed border-forest/10 rounded-2xl"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <p className="text-sm">Enter details and search to see live availability</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
