import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

// type: 'scroll' = anchor on home page, 'page' = navigates to a route
const LINKS = [
  { href: '#projects', label: 'Project',  type: 'scroll' },
  { href: '/about',    label: 'About',    type: 'page'   },
  { href: '#services', label: 'Service',  type: 'scroll' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);

  const location = useLocation();
  const navigate  = useNavigate();

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

  // Highlight About when on /about route
  useEffect(() => {
    const idx = LINKS.findIndex(l => l.href === location.pathname);
    if (idx !== -1) setActiveIdx(idx);
  }, [location.pathname]);

  /* Handle scroll links:
     - If already on home ('/') → scroll directly
     - If on another page → navigate home first, then scroll after mount */
  const handleScrollLink = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');

    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Go home, then scroll once page has loaded
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const cls = [
    'navbar',
    scrolled && 'navbar--scrolled',
    mounted  && 'navbar--in',
    menuOpen && 'navbar--open',
  ].filter(Boolean).join(' ');

  // Render a nav item — Link for pages, <a> for scroll anchors
  const NavItem = ({ link, index, className, onClick, children }) => {
    if (link.type === 'page') {
      return (
        <Link
          to={link.href}
          className={className}
          style={{ '--i': index }}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        className={className}
        style={{ '--i': index }}
        onClick={(e) => {
          handleScrollLink(e, link.href);
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <header className={cls}>
        <div className="navbar__inner">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo" aria-label="Home">
            LXY
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {LINKS.map((l, i) => (
              <NavItem
                key={l.href}
                link={l}
                index={i}
                className={`navbar__link${activeIdx === i ? ' navbar__link--active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {l.label}
              </NavItem>
            ))}
          </nav>

          {/* ── Right ── */}
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
        className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="navbar__drawer-overlay" onClick={() => setMenuOpen(false)} />

        <nav className="navbar__drawer-nav">
          {LINKS.map((l, i) => (
            <NavItem
              key={l.href}
              link={l}
              index={i}
              className="navbar__drawer-link"
              onClick={() => { setMenuOpen(false); setActiveIdx(i); }}
            >
              <span className="navbar__drawer-no">0{i + 1}</span>
              <span className="navbar__drawer-label">{l.label}</span>
              <span className="navbar__drawer-arrow">↗</span>
            </NavItem>
          ))}
        </nav>

        <div className="navbar__drawer-foot">
          <a href="mailto:hello@lxy.co" className="navbar__drawer-email">
            hello@lxy.co
          </a>
          <span className="navbar__drawer-loc">Jakarta, Indonesia</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;