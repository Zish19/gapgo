import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation logic - we'll simulate it by wrapping words in spans
      const lines = textRef.current.querySelectorAll('.reveal-line');
      
      gsap.fromTo(lines, 
        { opacity: 0, y: 30, rotationX: -20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <div ref={textRef} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-forest leading-[1.1] space-y-2 perspective-1000">
          <div className="reveal-line origin-bottom">We believe renting a vehicle</div>
          <div className="reveal-line origin-bottom">should be as easy as</div>
          <div className="reveal-line origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-forest to-pine">booking a cab.</div>
        </div>

        <div className="mt-10 max-w-2xl mx-auto font-body text-sage-muted text-lg leading-relaxed">
          <p className="reveal-line opacity-0 transform translate-y-8">
            <span className="font-brand text-forest">gapgo</span> brings every trusted local rental partner into one premium marketplace. No more calling around for availability, no more hidden pricing. Just seamless discovery, instant booking, and guaranteed doorstep delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
