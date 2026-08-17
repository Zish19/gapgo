import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="text-forest pt-24 pb-12 px-6 border-t border-forest/10 relative overflow-hidden">
      {/* Decorative bg blur */}
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-mint/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/Blur Colors of Shape.png" alt="gapgo Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-xl tracking-tight font-brand">gapgo</span>
            </div>
            <p className="text-sage-muted text-sm leading-relaxed max-w-xs">
              The marketplace connecting customers with verified local rental partners across India.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-sage-muted">
              <li><a href="mailto:officialgogap@gogap.in" className="hover:text-forest transition-colors">officialgogap@gogap.in</a></li>
              <li><a href="#how" className="hover:text-forest transition-colors">How it works</a></li>
            </ul>
          </div>

          <div id="partner-form" className="scroll-mt-32">
            <h4 className="font-display font-semibold mb-4">Partner with gapgo</h4>
            <p className="text-sage-muted text-sm mb-5 leading-relaxed max-w-xs">
              List your fleet on our network and reach thousands of customers.
            </p>
            {submitted ? (
              <div className="bg-mint/20 border border-mint text-forest text-sm px-4 py-3 rounded-xl font-medium animate-in fade-in zoom-in duration-300">
                Thanks! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-white/50 border border-forest/10 rounded-xl px-4 py-2.5 text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/30 focus:bg-white transition-colors shadow-sm"
                />
                <button type="submit" className="bg-forest text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-pine transition-colors shadow-sm shrink-0">
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-forest/10 text-xs text-sage-muted">
          <p>© {new Date().getFullYear()} gapgo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-forest transition-colors">Privacy</a>
            <a href="#" className="hover:text-forest transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Sticky CTA (Mobile) */}
      <div id="stickyCta" className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-forest text-paper p-3 rounded-2xl shadow-lift flex justify-between items-center md:hidden z-50 transition-transform duration-300 translate-y-24">
        <span className="font-display font-semibold text-sm">List your fleet</span>
        <a href="#partner-form" className="bg-mint text-forest text-xs font-bold px-4 py-2 rounded-xl">Get Started</a>
      </div>
    </footer>
  );
}
