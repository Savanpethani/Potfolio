// register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

document.addEventListener('DOMContentLoaded', () => {
  // 1) MOBILE NAV TOGGLE
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // 2) HERO ANIMATIONS
  const shapes = gsap.utils.toArray('.shape');
  const heroTL = gsap.timeline();

  // A) Fade & pop-in shapes
  heroTL.to(shapes, {
    opacity: 0.6,
    scale: 1,
    duration: 1.2,
    ease: 'back.out(1.7)',
    stagger: 0.2
  });

  // B) Float animation
  shapes.forEach((shape) => {
    gsap.to(shape, {
      y: '+=30',
      duration: 4 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  // inside your DOMContentLoaded, after you’ve set up your heroTL…

const heroSection = document.getElementById('home');

// PARALLAX on mousemove
heroSection.addEventListener('mousemove', e => {
  // 1) kill any snap-back tweens so they don’t fight the new parallax
  gsap.killTweensOf(shapes);

  const xPct = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

  shapes.forEach((shape, i) => {
    gsap.to(shape, {
      x:       xPct * (20 + i*10),
      y:       yPct * (20 + i*10),
      duration: 0.5,
      ease:    'power3.out'
    });
  });
});

// SMOOTH SNAP-BACK on mouseleave
heroSection.addEventListener('mouseleave', () => {
  gsap.to(shapes, {
    x:        0,
    y:        0,
    duration: 1,           // adjust for faster/slower return
    ease:     'power2.out',
    stagger:  0.05         // slight cascade makes it look nicer
  });
});

  // D) Hero text stagger
  heroTL
    .to('.hero-title', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
    .to('.hero-sub',   { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to('.hero-btn',   { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4');

  // 3) SCROLL-REVEAL FOR SECTIONS
  gsap.utils.toArray('.section:not(#home)').forEach(sec => {
    gsap.to(sec, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
      }
    });
  });

  // 4) STAGGER PROJECT CARDS
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      delay: i * 0.15
    });
  });



});

