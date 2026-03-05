import { useState, useEffect, useRef } from 'react';
import '../styles/Preloader.css';

/* ─────────────────────────────────────────────
   Preloader — LXY Creative Studio
   Split-curtain reveal. Top/bottom panels
   separate on exit, exposing the hero beneath.

   Usage:
     <Preloader onComplete={() => setLoaded(true)} />
───────────────────────────────────────────── */

const MARQUEE_ITEMS = [
  'Branding', 'UI/UX Design', 'Motion',
  'Web Development', 'Design Systems', 'Digital Products',
];

const DURATION = 2800; // ms

function easeInOutExpo(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

// Repeated twice for seamless scroll
const MARQUEE_REPEATED = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS,
                          ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function Preloader({ onComplete }) {
  const [count,   setCount]   = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done,    setDone]    = useState(false);
  const [lettersIn, setLettersIn] = useState(false);

  const rafRef   = useRef(null);
  const startRef = useRef(null);

  /* Trigger letter animation after short delay */
  useEffect(() => {
    const t = setTimeout(() => setLettersIn(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* Counter */
  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t   = Math.min((ts - startRef.current) / DURATION, 1);
      const val = Math.round(easeInOutExpo(t) * 100);
      setCount(val);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 1000);
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  if (done) return null;

  return (
    <div className={`pre${exiting ? ' pre--exit' : ''}`}
         role="status"
         aria-label={`Loading ${count}%`}
         aria-live="polite">

      {/* ── TOP PANEL ── */}
      <div className="pre__panel pre__panel--top">
        <div className="pre__vl pre__vl--l" />
        <div className="pre__vl pre__vl--r" />

        <div className="pre__meta">
          <span className="pre__meta-item">
            <span className="pre__meta-dot" />LXY Creative Studio
          </span>
          <span className="pre__meta-item">Jakarta, ID — Est. 2024</span>
        </div>

        <div className="pre__year" aria-hidden="true">2024</div>

        {/* Wordmark — clipped to show only top half */}
        <div className="pre__mark">
          <div className="pre__wordmark">
            {['L','X','Y'].map((letter, i) => (
              <span
                key={letter}
                className={`pre__letter${i === 2 ? ' pre__letter--accent' : ''}`}
                style={lettersIn ? {
                  animation: `letterRise 0.9s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`
                } : {}}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEAM ── */}
      <div className="pre__seam" />

      {/* ── MARQUEE on seam ── */}
      <div className="pre__marquee-wrap" aria-hidden="true">
        <div className="pre__marquee-track">
          {MARQUEE_REPEATED.map((item, i) => (
            <span key={i} className="pre__marquee-item">
              {item}<b>—</b>
            </span>
          ))}
        </div>
      </div>

      {/* ── BOTTOM PANEL ── */}
      <div className="pre__panel pre__panel--bottom">
        <div className="pre__progress">
          <div className="pre__progress-fill" style={{ width: `${count}%` }} />
        </div>
        <div className="pre__vl pre__vl--l" />
        <div className="pre__vl pre__vl--r" />

        <div className="pre__wm-bottom">
          <div className="pre__studio-name">Creative Studio</div>
        </div>

        <div className="pre__counter">
          <span className={`pre__num${count === 100 ? ' pre__num--full' : ''}`}>
            {String(count).padStart(2, '0')}
          </span>
          <span className="pre__pct-sm">%</span>
        </div>
      </div>

    </div>
  );
}