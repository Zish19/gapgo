import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Easy comparison",
    desc: "Side-by-side pricing, vehicles and ratings across every partner nearby.",
  },
  {
    title: "Verified partners",
    desc: "Every listed business is vetted before it goes live on gapgo.",
  },
  {
    title: "Transparent pricing",
    desc: "The price you see is the price you pay.",
  },
  {
    title: "Instant booking",
    desc: "Confirm a vehicle in seconds, no back-and-forth calls.",
  },
  {
    title: "Doorstep delivery",
    desc: "The vehicle comes to the customer and leaves the same way.",
  },
  {
    title: "Ratings & reviews",
    desc: "Real feedback from real renters, on every partner's profile.",
  },
  {
    title: "Digital payments",
    desc: "Secure checkout with multiple payment options for your convenience.",
  },
  {
    title: "Customer support",
    desc: "One dedicated support line covering every booking.",
  },
  {
    title: "Self driven",
    desc: "Take the wheel yourself and enjoy complete freedom on your trip.",
  },
  {
    title: "True driven",
    desc: "Going on a trip? Rent a vehicle for 3-4 days with a chauffeur and relax.",
  }
];

export default function Solution() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Row Animations
      const rows = gsap.utils.toArray('.feature-row');
      
      rows.forEach((row) => {
        const title = row.querySelector('.feature-title');
        const desc = row.querySelector('.feature-desc');
        const num = row.querySelector('.feature-num');

        // Text slide and fade
        gsap.fromTo([title, desc],
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%", // Triggers when the row is 25% up the screen
              toggleActions: "play none none none"
            }
          }
        );

        // Number Parallax Effect
        gsap.fromTo(num,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5 // smooth scrubbing
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="partners" className="relative py-24 overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Sticky-ish or massive header */}
        <div ref={headerRef} className="max-w-4xl mb-20 md:mb-32">
          <span className="text-sm font-mono tracking-widest text-pine uppercase font-bold">Why Choose Us</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 tracking-tight text-forest leading-[1.05]">
            One marketplace. Every trusted vehicle.
          </h2>
          <p className="text-forest mt-6 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
            <span className="font-brand">gapgo</span> gives you a single place to compare and book vehicles from verified local partners. No hidden fees, no phone calls, just instant bookings and seamless doorstep delivery.
          </p>
        </div>

        {/* Vertical Feature List */}
        <div className="flex flex-col gap-20 md:gap-32">
          {FEATURES.map((feat, idx) => {
            const isEven = idx % 2 === 0;
            const num = (idx + 1).toString().padStart(2, '0');
            
            return (
              <div 
                key={idx} 
                className={`feature-row flex flex-col items-center gap-8 lg:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Abstract Typographic Visual Side */}
                <div className="w-full md:w-1/2 flex justify-center relative py-6">
                   {/* Glowing Orb Background */}
                   <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-mint/40 rounded-full blur-[70px] pointer-events-none mix-blend-multiply"></div>
                   
                   {/* Parallax Number */}
                   <div className="feature-num text-[8rem] sm:text-[12rem] lg:text-[14rem] font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-forest/5 to-forest/20 select-none z-10 pointer-events-none">
                     {num}
                   </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 z-10 text-center md:text-left">
                   <h3 className="feature-title font-display font-bold text-3xl sm:text-4xl md:text-5xl text-forest mb-4 tracking-tight">
                     {feat.title}
                   </h3>
                   <p className="feature-desc text-lg sm:text-xl text-forest/90 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                     {feat.desc}
                   </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
