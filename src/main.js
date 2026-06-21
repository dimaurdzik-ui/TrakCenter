import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// Header
const header = document.getElementById('header');
ScrollTrigger.create({
  start: 'top -60',
  onUpdate: (s) => header.classList.toggle('header--scrolled', s.scroll() > 40),
});

// Mobile menu
document.getElementById('burger')?.addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('nav--open');
});
document.querySelectorAll('.nav__link').forEach((l) => {
  l.addEventListener('click', () => document.getElementById('nav').classList.remove('nav--open'));
});

// Hero entrance
gsap.timeline({ defaults: { ease: 'power4.out' } })
  .from('.hero__tag', { y: 20, opacity: 0, duration: 0.6 })
  .from('.hero__title-line', { y: 80, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.3')
  .from('.hero__title-outline', { scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(2)' }, '-=0.7')
  .from('.hero__desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.hero__feat', { y: 30, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
  .from('.hero__form', { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8')
  .from('.hero__truck-wrap', { opacity: 0, y: 30, duration: 1 }, '-=0.5');

// Subtle parallax inside clipped container only
gsap.to('.hero__truck', {
  scale: 1.06,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero__truck-wrap',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

// Stats counters
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = parseFloat(el.dataset.count);
  const decimal = el.dataset.decimal === 'true';
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: decimal ? 0.1 : 1 },
        onUpdate() {
          const v = parseFloat(el.innerText);
          el.innerText = decimal ? v.toFixed(1) : Math.round(v);
        },
      });
    },
  });
});

gsap.from('[data-animate="stat"]', {
  y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  scrollTrigger: { trigger: '.stats', start: 'top 80%' },
});

// Process watermark parallax
gsap.to('[data-parallax="watermark"]', {
  x: -80, ease: 'none',
  scrollTrigger: { trigger: '.process', start: 'top bottom', end: 'bottom top', scrub: 2 },
});

gsap.from('[data-animate="step"]', {
  y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.process__box', start: 'top 78%' },
});

// Map draw
document.querySelectorAll('.map-path').forEach((path, i) => {
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, {
    strokeDashoffset: 0, duration: 2, delay: i * 0.2, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.geography__map', start: 'top 75%' },
  });
});

gsap.from('[data-animate="region"]', {
  x: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
  scrollTrigger: { trigger: '.geography__list', start: 'top 82%' },
});

// Generic reveals
gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
  });
});

gsap.from('[data-animate="trust-grid"] .trust__cell', {
  y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.trust__grid', start: 'top 78%' },
});

/* GSAP horizontal scroll removed in favor of native CSS scroll-snap */

gsap.from('[data-animate="faq"]', {
  y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
  scrollTrigger: { trigger: '.faq__list', start: 'top 78%' },
});

// Form submit
document.querySelector('.hero__form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = 'Дякуємо! Ми зв\'яжемось';
  btn.style.background = '#22c55e';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; e.target.reset(); }, 3000);
});

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh());

// FAB Toggle
const fabToggle = document.querySelector('.fab-toggle');
const fabContainer = document.querySelector('.fab-container');
if (fabToggle && fabContainer) {
  fabToggle.addEventListener('click', (e) => {
    e.preventDefault();
    fabContainer.classList.toggle('is-active');
  });
  
  document.addEventListener('click', (e) => {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove('is-active');
    }
  });
}
