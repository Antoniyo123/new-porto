import React, { useRef, useEffect, useState } from 'react';
import '../styles/About.css';

const STATS = [
  { num: '5+',  label: 'Years of craft'   },
  { num: '80+', label: 'Projects shipped' },
  { num: '3',   label: 'Design awards'    },
];

const About = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`about${visible ? ' about--in' : ''}`}
      id="about"
      ref={ref}
    >
      {/* ── Eyebrow ── */}
      <div className="about__eyebrow">// ABOUT US</div>

      {/* ── Headline ── */}
      <h2 className="about__headline">WE ARE A CREATIVE STUDIO</h2>

      {/* ── Main grid: photo left, content right ── */}
      <div className="about__grid">

        <div className="about__photo-col">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop&crop=faces"
            alt="Studio founder"
            className="about__photo"
            loading="lazy"
          />
        </div>

        <div className="about__content">

          <p className="about__body">
            LXY Creative is a Jakarta-based studio founded in 2020. From
            early-stage startups to established companies, we partner with
            clients who care deeply about the details. We don't just make
            things look good — we make them work beautifully.
          </p>

          {/* Stats inline */}
          <div className="about__stats">
            {STATS.map(s => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-num">{s.num}</span>
                <span className="about__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          <a href="mailto:hello@lxy.co" className="about__cta">
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

        </div>
      </div>

    </section>
  );
};

export default About;