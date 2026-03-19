import { useState, useEffect, useRef } from 'react';
import '../styles/Preloader.css';

/* ─────────────────────────────────────────────
   Preloader — LXY Creative Studio
   Design: Syne + DM Mono · #080808 · #ff3c3c
   Brutalist editorial — matches footer__ system.

   Usage:
     <Preloader onComplete={() => setLoaded(true)} />
───────────────────────────────────────────── */

const MARQUEE_ITEMS = [
  'Branding', 'UI/UX Design', 'Motion',
  'Web Dev', 'Design Systems', 'Digital Products',
];

const STATUS_LABELS = [
  'Initialising', 'Loading assets', 'Compiling', 'Rendering', 'Almost done', 'Ready',
];

const SEGS       = 20;
const DURATION   = 2800; // ms

function easeInOutExpo(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

const MARQUEE_REPEATED = [
  ...MARQUEE_ITEMS, ...MARQUEE_ITEMS,
  ...MARQUEE_ITEMS, ...MARQUEE_ITEMS,
];

export default function Preloader({ onComplete }) {
  const [count,     setCount]     = useState(0);
  const [exiting,   setExiting]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [lettersIn, setLettersIn] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [coords,    setCoords]    = useState('00.000 / 00.000');
  const [glitch,    setGlitch]    = useState(false);

  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const lastSiRef = useRef(0);

  /* Letter entrance */
  useEffect(() => {
    const t = setTimeout(() => setLettersIn(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* Main counter loop */
  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t   = Math.min((ts - startRef.current) / DURATION, 1);
      const val = Math.round(easeInOutExpo(t) * 100);

      setCount(val);

      /* Status label */
      const si = Math.min(Math.floor(val / 18), STATUS_LABELS.length - 1);
      if (si !== lastSiRef.current) {
        setStatusIdx(si);
        lastSiRef.current = si;
      }

      /* Scrolling coords */
      setCoords(
        (val / 100 * 106.347).toFixed(3) +
        ' / ' +
        (val / 100 * -6.203).toFixed(3)
      );

      /* Occasional glitch flash */
      if (Math.random() < 0.004) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 60);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 1200);
        }, 450);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  if (done) return null;

  const segsOn = Math.round(count / 100 * SEGS);

  return (
    <div
      className={`pre${exiting ? ' pre--exit' : ''}`}
      role="status"
      aria-label={`Loading ${count}%`}
      aria-live="polite"
    >
      {/* Scanline overlay */}
      <div className="pre__scanline" />

      {/* Noise grain — brightens on glitch */}
      <div
        className="pre__noise"
        style={{ opacity: glitch ? 0.12 : 0.025 }}
        aria-hidden="true"
      />

      {/* Corner brackets */}
      <div className="pre__corner pre__corner--tl" />
      <div className="pre__corner pre__corner--tr" />
      <div className="pre__corner pre__corner--bl" />
      <div className="pre__corner pre__corner--br" />

      {/* ── TOP PANEL ── */}
      <div className="pre__panel pre__panel--top">
        <div className="pre__vl pre__vl--l" />
        <div className="pre__vl pre__vl--r" />

        {/* Segmented progress bar — top of panel */}
        <div className="pre__bar-row" aria-hidden="true">
          {Array.from({ length: SEGS }).map((_, i) => (
            <div
              key={i}
              className={
                `pre__bar-seg` +
                (i < segsOn      ? ' pre__bar-seg--on'  :
                 i === segsOn    ? ' pre__bar-seg--dim'  : '')
              }
            />
          ))}
        </div>

        {/* Meta — below the bar */}
        <div className="pre__meta">
          <span className="pre__meta-item">
            <span className="pre__meta-dot" />
            LXY Creative Studio
          </span>
          <span className="pre__meta-item">Jakarta, ID</span>
        </div>

        {/* Wordmark (top half, clipped) */}
        <div className="pre__mark">
          <div className="pre__wordmark">
            {['L', 'X', 'Y'].map((letter, i) => (
              <span
                key={letter}
                className={`pre__letter${i === 2 ? ' pre__letter--accent' : ''}`}
                style={lettersIn ? {
                  animation: `letterRise 0.9s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`,
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
        <div className="pre__vl pre__vl--l" />
        <div className="pre__vl pre__vl--r" />

        {/* Outline wordmark — bottom half */}
        <div className="pre__wm-bottom" aria-hidden="true">
          <div className="pre__studio-name">LXY</div>
        </div>

        {/* Status */}
        <div className="pre__status">
          <span className="pre__status-label">System</span>
          <span className="pre__status-val">
            <span className="pre__status-dot" />
            {STATUS_LABELS[statusIdx]}
          </span>
        </div>

        {/* Coords */}
        <div className="pre__coords" aria-hidden="true">{coords}</div>

        {/* Progress bar */}
        <div className="pre__progress">
          <div className="pre__progress-fill" style={{ width: `${count}%` }} />
        </div>

        {/* Counter */}
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