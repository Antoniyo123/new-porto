import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const LINKS = [
  { href: '#projects', label: 'Project' },
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Service' },
  { href: '#career',   label: 'Career' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const cls = [
    'navbar',
    scrolled  && 'navbar--scrolled',
    mounted   && 'navbar--in',
    menuOpen  && 'navbar--open',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={cls}>
        <div className="navbar__inner">

          {/* ── Logo ── */}
          <a href="/" className="navbar__logo" aria-label="Home">
            <span className="navbar__logo-icon" aria-hidden="true">
              {/* waveform bars */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="1"  y="10" width="3.5" height="8"  rx="1.75" fill="currentColor"/>
                <rect x="7"  y="6"  width="3.5" height="16" rx="1.75" fill="currentColor"/>
                <rect x="13" y="9"  width="3.5" height="10" rx="1.75" fill="currentColor"/>
                <rect x="19" y="4"  width="3.5" height="20" rx="1.75" fill="currentColor"/>
              </svg>
            </span>
          </a>

          {/* ── Desktop nav — centred ── */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={`navbar__link ${activeIdx === i ? 'navbar__link--active' : ''}`}
                style={{ '--i': i }}
                onClick={() => setActiveIdx(i)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── Right: CTA + burger ── */}
          <div className="navbar__right">
            <a href="mailto:hello@lxy.co" className="navbar__cta">
              Contact
              <span className="navbar__cta-arrow" aria-hidden="true">→</span>
            </a>

            <button
              className="navbar__burger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={menuOpen ? 'open' : ''} />
              <span className={menuOpen ? 'open' : ''} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav className="navbar__drawer-nav">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="navbar__drawer-link"
              style={{ '--i': i }}
              onClick={() => { setMenuOpen(false); setActiveIdx(i); }}
            >
              <span className="navbar__drawer-no">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="navbar__drawer-foot">
          <a href="mailto:hello@lxy.co" className="navbar__drawer-email">hello@lxy.co</a>
          <span className="navbar__drawer-loc">Jakarta, Indonesia</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;