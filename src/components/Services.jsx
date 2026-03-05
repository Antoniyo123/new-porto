import React, { useState, useRef, useEffect } from 'react';
import '../styles/Services.css';

/* ─────────────────────────────────────────────
   Services — LXY Creative Studio
   Full-width accordion. Each row expands on
   hover to reveal description + tags. Ghost
   index number + left edge bar accent.
───────────────────────────────────────────── */

const SERVICES = [
  {
    no: '01',
    title: 'Branding',
    desc: 'Identity systems that define and differentiate your brand from everything else in the market.',
    tags: ['Logo', 'Color System', 'Typography', 'Brand Voice'],
  },
  {
    no: '02',
    title: 'UI/UX Design',
    desc: 'Interfaces built for clarity, delight, and real human interaction — from wireframe to final pixel.',
    tags: ['Research', 'Wireframes', 'Prototyping', 'Design Systems'],
  },
  {
    no: '03',
    title: 'Web Development',
    desc: 'Fast, modern, production-ready builds. Clean, maintainable code that scales with your business.',
    tags: ['Next.js', 'React', 'CMS', 'Performance'],
  },
  {
    no: '04',
    title: 'Motion Design',
    desc: 'Animation and motion that bring brands and interfaces to life — from micro to full-screen.',
    tags: ['After Effects', 'Lottie', 'CSS Animation', 'Interaction'],
  },
];

const Services = () => {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`services${visible ? ' services--in' : ''}`}
      id="services"
      ref={ref}
    >

      {/* ── Header ── */}
      <div className="services__header">
        <div className="services__header-left">
          <div className="services__eyebrow">
            <span className="services__eyebrow-dot" />
            What We Do
          </div>
          <h2 className="services__heading">
            Our<br /><em>Services</em>
          </h2>
        </div>
        <div className="services__header-right">
          <p className="services__subtitle">
            Every project starts with a conversation —<br />
            and ends with something remarkable.
          </p>
          <span className="services__count">0{SERVICES.length} Services</span>
        </div>
      </div>

      {/* ── Accordion list ── */}
      <div className="services__list">
        {SERVICES.map((s, i) => (
          <div
            key={s.no}
            className={`svc${active === i ? ' svc--open' : ''}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Left edge accent bar */}
            <span className="svc__edge" aria-hidden="true" />

            {/* Ghost index behind content */}
            <span className="svc__ghost" aria-hidden="true">{s.no}</span>

            {/* Row */}
            <div className="svc__row">
              <span className="svc__no">{s.no}</span>

              <h3 className="svc__title">{s.title}</h3>

              {/* Desc — expands on hover */}
              <div className="svc__desc-wrap">
                <p className="svc__desc">{s.desc}</p>
                <div className="svc__tags">
                  {s.tags.map(tag => (
                    <span key={tag} className="svc__tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Arrow circle */}
              <div className="svc__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="services__foot">
        <p className="services__foot-text">
          Not sure what you need? Let's figure it out together — no brief required.
        </p>
        <a href="mailto:hello@lxy.co" className="services__foot-cta">
          <span>Start a project</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

    </section>
  );
};

export default Services;