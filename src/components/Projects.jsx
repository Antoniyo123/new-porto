import React, { useRef, useEffect, useState } from 'react';
import '../styles/Projects.css';

const projects = [
  {
    no: '01', title: 'Verdant', category: 'Branding · Web', year: '2025',
    img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&q=85&auto=format&fit=crop',
  },
  {
    no: '02', title: 'Forma', category: 'UI/UX · Design', year: '2025',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=85&auto=format&fit=crop',
  },
  {
    no: '03', title: 'Kōdo', category: 'Identity · Motion', year: '2024',
    img: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=900&q=85&auto=format&fit=crop',
  },
  {
    no: '04', title: 'Solus', category: 'Web · Dev', year: '2024',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85&auto=format&fit=crop',
  },
  {
    no: '05', title: 'Nomi', category: 'Brand · Identity', year: '2024',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&auto=format&fit=crop',
  },
];

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive]   = useState(1);
  const sectionRef  = useRef(null);
  const galleryRef  = useRef(null);
  const cardRefs    = useRef([]);

  /* ── Intersection reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Centre active card in gallery ── */
  useEffect(() => {
    const gallery = galleryRef.current;
    const card    = cardRefs.current[active];
    if (!gallery || !card) return;

    // Use rAF so the browser has applied the new width before we measure
    const raf = requestAnimationFrame(() => {
      const gRect = gallery.getBoundingClientRect();
      const cRect = card.getBoundingClientRect();
      const scrollLeft = gallery.scrollLeft + cRect.left - gRect.left
                       - gRect.width / 2 + cRect.width / 2;
      gallery.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(projects.length - 1, i + 1));

  return (
    <section
      className={`projects${visible ? ' projects--in' : ''}`}
      id="projects"
      ref={sectionRef}
    >
      {/* ── Header ── */}
      <div className="projects__header">
        <div className="projects__eyebrow">// THE AGENCY</div>

        <h2 className="projects__headline">
          <span className="projects__hl-1">OASIC IS A VISIONARY DESIGN AGENCY</span>
          <span className="projects__hl-2">THAT BREATHES LIFE INTO IDEAS AND</span>
          <span className="projects__hl-2">TRANSFORMS THEM INTO EXTRAORDINARY</span>
          <span className="projects__hl-2">REALITIES.</span>
        </h2>

        <div className="projects__sub-row">
          <a href="#contact" className="projects__talk">
            <span className="projects__talk-circle">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 5l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="projects__talk-label">LET'S TALK NOW</span>
          </a>
          <p className="projects__desc">
            Oasic is a visionary design agency that breathes life into ideas and
            transforms them into extraordinary realities.
          </p>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="projects__carousel-wrap">
        <div className="projects__gallery" ref={galleryRef} onMouseLeave={() => setActive(prev => prev)}>
          {projects.map((p, i) => (
            <div
              key={p.no}
              ref={el => cardRefs.current[i] = el}
              className={`pj-card${active === i ? ' pj-card--active' : ''}`}
              onMouseEnter={() => setActive(i)}
              data-no={p.no}
            >
              <img className="pj-card__img" src={p.img} alt={p.title} loading="lazy" />
              <div className="pj-card__overlay" />
              <div className="pj-card__info">
                <span className="pj-card__cat">{p.category}</span>
                <span className="pj-card__title">{p.title}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="projects__arrow projects__arrow--prev"
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15 9H3M7 5L3 9l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="projects__arrow projects__arrow--next"
          onClick={next}
          disabled={active === projects.length - 1}
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="projects__dots" role="tablist">
        {projects.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            className={`projects__dot${active === i ? ' projects__dot--active' : ''}`}
            onMouseEnter={() => setActive(i)}
            aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="projects__footer">
        <a href="/work" className="projects__portfolio-btn">
          See our portfolio
        </a>
      </div>
    </section>
  );
};

export default Projects;
export { projects };