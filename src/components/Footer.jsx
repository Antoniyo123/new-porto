import React from 'react';
import '../styles/Footer.css';

const NAV_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Term & Condition', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'FAQ', href: '#' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="footer">

    {/* ── Top section: CTA left / Nav right ── */}
    <div className="footer__top">

      {/* Left */}
      <div className="footer__left">
        <div className="footer__brand">LXY</div>

        <a href="mailto:hello@lxy.co" className="footer__circle-btn" aria-label="Contact us">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 16L16 4M16 4H7M16 4v9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <h2 className="footer__tagline">
          COLLABORATE WITH<br />
          LXY AND START YOUR<br />
          DESIGN JOURNEY
        </h2>
      </div>

      {/* Right */}
      <div className="footer__right">
        <nav className="footer__nav">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="footer__nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="footer__socials">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} className="footer__social" aria-label={s.label} target="_blank" rel="noreferrer">
              {s.icon}
            </a>
          ))}
        </div>

        <p className="footer__copy">© 2025 LXY INC. All Rights Reserved.</p>
      </div>

    </div>

    {/* ── Giant wordmark ── */}
    <div className="footer__wordmark" aria-hidden="true">
      LXY—2025
    </div>

  </footer>
);

export default Footer;