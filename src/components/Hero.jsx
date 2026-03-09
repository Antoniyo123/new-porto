import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page-wrapper ${mounted ? 'page--in' : ''}`}>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="8" width="3" height="16" rx="1.5" fill="#111"/>
            <rect x="8" y="4" width="3" height="24" rx="1.5" fill="#111"/>
            <rect x="14" y="10" width="3" height="12" rx="1.5" fill="#111"/>
            <rect x="20" y="6" width="3" height="20" rx="1.5" fill="#111"/>
          </svg>
        </div>
        <ul className="nav__links">
          <li><a href="#projects" className="nav__link nav__link--active">Project</a></li>
          <li><a href="#about" className="nav__link">About</a></li>
          <li><a href="#service" className="nav__link">Service</a></li>
          <li><a href="#career" className="nav__link">Career</a></li>
        </ul>
        <a href="#contact" className="nav__cta">
          Contact <span className="nav__cta-arrow">→</span>
        </a>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero" ref={heroRef} aria-label="Hero">

        {/* Scroll indicator — left side */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <span className="hero__scroll-text">Scroll Down</span>
          <div className="hero__scroll-line">
            <span className="hero__scroll-dot" />
          </div>
        </div>

        {/* ── Headline block ── */}
        <div className="hero__content">
          <div className="hero__headline-block">
            <div className="hero__headline-row hero__headline-row--1">
              <h1 className="hero__headline">WE COMPLETE</h1>
              <a href="#contact" className="hero__talk-btn" aria-label="Let's talk now">
                <span className="hero__talk-circle">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 5l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="hero__talk-label">LET'S TALK NOW</span>
              </a>
            </div>
            <div className="hero__headline-row hero__headline-row--2">
              <h1 className="hero__headline hero__headline--indent">YOUR CREATIVE IDEAS</h1>
            </div>
          </div>

          {/* Tagline */}
          <p className="hero__tagline">
            Oasic is a visionary design agency that breathes life into<br />
            ideas and transforms them into extraordinary realities.
          </p>
        </div>

        {/* ── Video / Media block ── */}
        <div className="hero__media">
          <div className="hero__media-inner">
            {/* Decorative orb */}
            <div className="hero__orb" aria-hidden="true" />
            {/* Play button overlay */}
            <button
              className={`hero__play-btn ${playing ? 'hero__play-btn--playing' : ''}`}
              onClick={() => setPlaying(p => !p)}
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              <span className="hero__play-label">{playing ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── LOGOS STRIP ── */}
      <div className="logos-strip">
        <div className="logos-strip__inner">
          {[
            { name: 'PAPERZ', sub: 'Leading Paper Company' },
            { name: 'Dorfus', sub: '' },
            { name: 'Martino', sub: 'Colors of your life' },
            { name: 'square', sub: 'Real Estate Solution' },
            { name: 'Gobona', sub: 'Your Trusted Carrier' },
          ].map((brand) => (
            <div key={brand.name} className="logos-strip__item">
              <span className="logos-strip__name">{brand.name}</span>
              {brand.sub && <span className="logos-strip__sub">{brand.sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;