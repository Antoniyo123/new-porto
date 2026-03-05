import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';

const WORDS = ['Branding', 'UI/UX', 'Motion', 'Web Dev'];

const Hero = () => {
  const [mounted, setMounted]   = useState(false);
  const [wordIdx, setWordIdx]   = useState(0);
  const [flipping, setFlipping] = useState(false);
  const heroRef = useRef(null);

  /* mount trigger */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* cycler */
  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setFlipping(false);
      }, 340);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const scrollToNext = () => {
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`hero ${mounted ? 'hero--in' : ''}`}
      ref={heroRef}
      aria-label="LXY Creative Studio — Hero"
    >

  
      {/* ── main body ── */}
      <div className="hero__body">
        <div className="hero__hl-block">

          {/* LINE 1 */}
          <div className="hero__line hero__line--1">
            <span className="hero__word hero__word--stroke">We</span>
            <span className="hero__word hero__word--fill">Design</span>
          </div>

          {/* rule + eyebrow */}
          <div className="hero__rule-row" aria-hidden="true">
            <div className="hero__hrule" />
            <span className="hero__eyebrow-inline">Jakarta-based creative studio</span>
          </div>

          {/* LINE 2 */}
          <div className="hero__line hero__line--2">
            <span className="hero__word hero__word--fill hero__word--italic">Brands</span>
            <span className="hero__word hero__word--outline">&amp;</span>
          </div>

          {/* LINE 3 */}
          <div className="hero__line hero__line--3">
            <span className="hero__word hero__word--fill">Interfaces</span>
            <span className="hero__period" aria-hidden="true">.</span>
          </div>

        </div>

        {/* ── cycler — below headline ── */}
        <div className="hero__cycler-row" aria-live="polite" aria-atomic="true">
          <span className="hero__cycler-prefix">Specialising in</span>
          <span className="hero__cycler-track" aria-hidden="true">
            <span className={`hero__cycler-word ${flipping ? 'hero__cycler-word--out' : ''}`}>
              {WORDS[wordIdx]}
            </span>
          </span>
          {/* visually hidden live text for screen readers */}
          <span className="sr-only">{WORDS[wordIdx]}</span>
        </div>

        {/* ── footer ── */}
        <div className="hero__foot">
          <p className="hero__tagline">
            We build visual identities, design systems,<br />
            and digital products — from concept to launch.
          </p>

          <div className="hero__foot-right">
            <a href="#projects" className="hero__cta" aria-label="View our work">
              <span className="hero__cta-label">View Work</span>
              <span className="hero__cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>

            {/* ── improved scroll cue ── */}
            <button
              className="hero__scroll-btn"
              onClick={scrollToNext}
              aria-label="Scroll to next section"
              type="button"
            >
              <span className="hero__scroll-track" aria-hidden="true">
                <span className="hero__scroll-thumb" />
              </span>
              <span className="hero__scroll-mouse" aria-hidden="true">
                <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
                  <rect x="1" y="1" width="20" height="30" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                  <rect className="hero__scroll-wheel" x="9.5" y="7" width="3" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </span>
              <span className="hero__scroll-label">Scroll</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hero__accent" aria-hidden="true" />
    </section>
  );
};

export default Hero;