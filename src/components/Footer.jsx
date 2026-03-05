import React from 'react';
import '../styles/Footer.css';

/* ─────────────────────────────────────────────
   Footer — LXY Creative Studio
   Full-screen CTA moment. Giant headline,
   email as hero element, split-grid services.
───────────────────────────────────────────── */

const SERVICES = [
  'Brand Identity',
  'UI/UX Design',
  'Motion & Animation',
  'Web Development',
  'Design Systems',
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter',   href: 'https://twitter.com'   },
  { label: 'Behance',   href: 'https://behance.net'   },
  { label: 'LinkedIn',  href: 'https://linkedin.com'  },
];

const MARQUEE_ITEMS = [
  'Branding', 'UI/UX', 'Motion', 'Web Dev',
  'Design Systems', 'Creative Studio', 'Jakarta, ID',
];
// Repeated for seamless scroll
const MARQUEE_REPEATED = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS,
                          ...MARQUEE_ITEMS, ...MARQUEE_ITEMS,
                          ...MARQUEE_ITEMS];

const Footer = () => (
  <footer className="footer">

    {/* Top green accent line */}
    <div className="footer__accent-top" />

    {/* Marquee strip */}
    <div className="footer__marquee-strip" aria-hidden="true">
      <div className="footer__marquee-track">
        {MARQUEE_REPEATED.map((item, i) => (
          <span key={i} className="footer__marquee-item">
            {item}<span>—</span>
          </span>
        ))}
      </div>
    </div>

    {/* ── CTA Section ── */}
    <div className="footer__cta-section">
      <div className="footer__cta-grid">

        {/* Left — headline + email */}
        <div>
          <div className="footer__available">
            <div className="footer__avail-dot" />
            <span className="footer__avail-text">Available for new projects</span>
          </div>

          <div>
            <div className="footer__headline footer__headline--main">Let's make</div>
            <div className="footer__headline footer__headline--italic">something</div>
            <div className="footer__headline">great.</div>
          </div>

          <div className="footer__email-wrap">
            <a href="mailto:hello@lxy.co" className="footer__email-link" aria-label="Email us at hello@lxy.co">
              hello@lxy.co
              <span className="footer__email-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

          <p className="footer__cta-note">
            Or just say hi — we don't bite.<br />
            Based in Jakarta, working worldwide.
          </p>
        </div>

        {/* Right — services list */}
        <div className="footer__cta-right">
          <span className="footer__services-label">What we do</span>
          <ul className="footer__services-list">
            {SERVICES.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>

      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className="footer__bottom">
      <span className="footer__copy">© 2026 LXY Studio</span>

      <nav className="footer__socials" aria-label="Social links">
        {SOCIALS.map(({ label, href }) => (
          <a key={label} href={href} className="footer__social-link"
             target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
      </nav>

      <div className="footer__location">
        <div className="footer__location-dot" />
        Jakarta, Indonesia
      </div>
    </div>

    {/* Ghost watermark */}
    <div className="footer__watermark" aria-hidden="true">LXY</div>

  </footer>
);

export default Footer;