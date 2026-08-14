document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================================
     NAVBAR SCROLL EFFECT & STICKY CTA
  ===================================================================== */
  const navbar = document.getElementById('navbar');
  const navInner = document.getElementById('navInner');
  const stickyCta = document.getElementById('stickyCta');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navInner.classList.remove('py-3', 'px-4', 'sm:px-6');
      navInner.classList.add('py-2', 'px-3', 'sm:px-5', 'shadow-lift');
      navInner.classList.replace('bg-paper/70', 'bg-paper/90');
      navInner.classList.replace('', '');
      
      // Show sticky CTA on mobile
      if (stickyCta) stickyCta.classList.remove('translate-y-24');
    } else {
      navInner.classList.add('py-3', 'px-4', 'sm:px-6');
      navInner.classList.remove('py-2', 'px-3', 'sm:px-5', 'shadow-lift');
      navInner.classList.replace('bg-paper/90', 'bg-paper/70');
      navInner.classList.replace('', '');
      
      // Hide sticky CTA on mobile
      if (stickyCta) stickyCta.classList.add('translate-y-24');
    }
  }, { passive: true });

  /* =====================================================================
     INTERSECTION OBSERVER FOR REVEALS
  ===================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        
        // Trigger counters if it's the stats section
        if (entry.target.querySelector('.counter')) {
          runCounters(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  /* =====================================================================
     STAT COUNTERS
  ===================================================================== */
  function runCounters(container) {
    const counters = container.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const updateCount = () => {
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  /* =====================================================================
     HOW IT WORKS TIMELINE PROGRESS
  ===================================================================== */
  const hiwWrap = document.getElementById('hiwWrap');
  const hiwProgress = document.getElementById('hiwProgress');
  const hiwMarker = document.getElementById('hiwMarker');
  const steps = document.querySelectorAll('.hiw-step');

  if (hiwWrap && hiwProgress) {
    window.addEventListener('scroll', () => {
      const rect = hiwWrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section
      let progress = 0;
      
      // Start filling when the section is middle of screen
      const startPoint = viewportHeight * 0.6;
      
      if (rect.top < startPoint && rect.bottom > 0) {
        const totalScrollable = rect.height;
        const scrolled = startPoint - rect.top;
        
        // Maps 0-1 to width 20-980 (SVG coordinates)
        progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
        
        const x2 = 20 + (progress * 960);
        hiwProgress.setAttribute('x2', x2);
        
        // Optional: Highlight steps as line passes them
        steps.forEach((step, index) => {
          const stepRatio = index / (steps.length - 1);
          if (progress > stepRatio - 0.1) {
            step.querySelector('p.font-mono').classList.remove('text-mint', '');
            step.querySelector('p.font-mono').classList.add('text-sage-mid', '');
          } else {
            step.querySelector('p.font-mono').classList.add('text-mint', '');
            step.querySelector('p.font-mono').classList.remove('text-sage-mid', '');
          }
        });
      }
    }, { passive: true });
  }

  /* =====================================================================
     INTERACTIVE DEMO
  ===================================================================== */
  const demoSearchBtn = document.getElementById('demoSearch');
  const demoResults = document.getElementById('demoResults');
  const demoCity = document.getElementById('demoCity');

  // Sample data to simulate search
  const partnersData = {
    'Kanpur': [
      { name: 'Green Wheels', rating: '4.8', rides: 120, price: '₹1,299/day', delivery: '42 min' },
      { name: 'Metro Rentals', rating: '4.6', rides: 85, price: '₹1,149/day', delivery: '55 min' },
      { name: 'CityDrive Co.', rating: '4.9', rides: 210, price: '₹1,499/day', delivery: '30 min' }
    ],
    'Lucknow': [
      { name: 'Nawab Fleet', rating: '4.7', rides: 150, price: '₹1,350/day', delivery: '45 min' },
      { name: 'Awadh Rentals', rating: '4.5', rides: 60, price: '₹1,200/day', delivery: '60 min' },
      { name: 'Royal Rides', rating: '4.9', rides: 300, price: '₹1,600/day', delivery: '35 min' }
    ],
    'Delhi NCR': [
      { name: 'Capital Drive', rating: '4.8', rides: 420, price: '₹1,599/day', delivery: '50 min' },
      { name: 'NCR Motors', rating: '4.4', rides: 95, price: '₹1,299/day', delivery: '70 min' },
      { name: 'Prime Fleet', rating: '4.9', rides: 510, price: '₹1,899/day', delivery: '40 min' }
    ]
  };

  if (demoSearchBtn) {
    demoSearchBtn.addEventListener('click', () => {
      const city = demoCity.value;
      const results = partnersData[city] || partnersData['Kanpur'];
      
      // Clear current
      demoResults.innerHTML = '';
      
      // Render skeleton or loading state (optional, just popping them in for now)
      setTimeout(() => {
        results.forEach((partner, index) => {
          const delay = index * 100;
          const html = `
            <div class="rounded-2xl border border-forest/10 bg-white/40 p-5 opacity-0 transform translate-y-4 transition-all duration-500 hover-lift" style="transition-delay: ${delay}ms">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p class="font-display font-600 text-forest">${partner.name}</p>
                  <div class="flex items-center gap-1.5 mt-1 text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9DED6"><path d="M12 3.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3.5Z"/></svg>
                    <span class="font-semibold text-forest">${partner.rating}</span>
                    <span class="text-sage-muted">(${partner.rides})</span>
                  </div>
                </div>
                <span class="rounded bg-mint/20 text-mint text-[10px] font-mono px-2 py-0.5">${partner.delivery}</span>
              </div>
              <div class="flex items-center justify-between mt-6 pt-4 border-t border-forest/10">
                <span class="font-mono text-sm text-forest">${partner.price}</span>
                <button class="text-xs font-semibold bg-forest text-paper px-3 py-1.5 rounded-lg hover:bg-pine:bg-paper2 transition-colors">Select</button>
              </div>
            </div>
          `;
          demoResults.insertAdjacentHTML('beforeend', html);
        });

        // Trigger reveal
        setTimeout(() => {
          const cards = demoResults.children;
          for (let card of cards) {
            card.classList.remove('opacity-0', 'translate-y-4');
          }
        }, 50);

      }, 200);
    });
  }

  /* =====================================================================
     FAQ ACCORDION
  ===================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const panel = item.querySelector('.accordion-panel');
    const chevron = item.querySelector('.faq-chevron');

    btn.addEventListener('click', () => {
      const isOpen = panel.classList.contains('max-h-[500px]');
      
      // Close all first (accordion behavior)
      faqItems.forEach(otherItem => {
        const otherPanel = otherItem.querySelector('.accordion-panel');
        const otherChevron = otherItem.querySelector('.faq-chevron');
        otherPanel.classList.remove('max-h-[500px]', 'opacity-100');
        otherPanel.classList.add('max-h-0', 'opacity-0');
        otherChevron.classList.remove('rotate-180');
      });

      // Toggle current
      if (!isOpen) {
        panel.classList.remove('max-h-0', 'opacity-0');
        panel.classList.add('max-h-[500px]', 'opacity-100');
        chevron.classList.add('rotate-180');
      }
    });
  });

  /* =====================================================================
     CTA FORM SUBMISSION
  ===================================================================== */
  const ctaForm = document.getElementById('ctaForm');
  const ctaMsg = document.getElementById('ctaMsg');

  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = ctaForm.querySelector('input[type="email"]');
      if (input.value) {
        ctaForm.style.display = 'none';
        ctaMsg.innerHTML = `<span class="flex items-center justify-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> You're on the list. We'll be in touch soon.</span>`;
        ctaMsg.classList.add('text-mint');
      }
    });
  }

});
