import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/PageLoader.css'

const ROUTE_NAMES = {
  '/':         'Home',
  '/projects': 'Projects',
  '/about':    'About',
  '/contact':  'Contact',
}

const SLIDE_IN  = 550
const HOLD      = 200
const SLIDE_OUT = 550

export default function PageLoader() {
  const location = useLocation()
  const [phase,    setPhase]    = useState('idle')
  const [progress, setProgress] = useState(0)
  const [destName, setDestName] = useState('')
  const prevPath = useRef(location.pathname)
  const rafRef   = useRef(null)
  const t1 = useRef(null)
  const t2 = useRef(null)
  const t3 = useRef(null)

  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname

    clearTimeout(t1.current)
    clearTimeout(t2.current)
    clearTimeout(t3.current)
    cancelAnimationFrame(rafRef.current)

    setDestName(ROUTE_NAMES[location.pathname] ?? 'Loading')
    setProgress(0)
    setPhase('entering')

    const totalFill = SLIDE_IN + HOLD
    let startTs = null
    const tick = (ts) => {
      if (!startTs) startTs = ts
      const p = Math.min(80, ((ts - startTs) / totalFill) * 80)
      setProgress(p)
      if (p < 80) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    t1.current = setTimeout(() => setPhase('holding'), SLIDE_IN)

    t2.current = setTimeout(() => {
      cancelAnimationFrame(rafRef.current)
      setProgress(100)
      setPhase('leaving')
    }, SLIDE_IN + HOLD)

    t3.current = setTimeout(() => {
      setPhase('idle')
      setProgress(0)
    }, SLIDE_IN + HOLD + SLIDE_OUT)

    return () => {
      clearTimeout(t1.current)
      clearTimeout(t2.current)
      clearTimeout(t3.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [location.pathname])

  const isActive  = phase !== 'idle'
  const phaseClass = phase === 'entering' || phase === 'holding'
    ? ' pl--entering'
    : phase === 'leaving'
      ? ' pl--leaving'
      : ''

  const barTransition = progress === 100
    ? 'transform 0.15s ease-out, opacity 0.3s'
    : 'transform 0.08s linear, opacity 0.3s'

  const fillTransition = progress === 100
    ? 'width 0.12s ease-out'
    : progress === 0 ? 'none' : 'width 0.08s linear'

  return (
    <>
      {/* Slim top red bar */}
      <div
        className={`pl__topbar${isActive ? ' pl__topbar--active' : ''}`}
        style={{ transform: `scaleX(${progress / 100})`, transition: barTransition }}
      />

      {/* Main curtain */}
      <div className={`pl${isActive ? ' pl--active' : ''}${phaseClass}`}>
        <div className="pl__curtain">

          {/* ── LEFT HALF — white ── */}
          <div className="pl__half--light">
            <div className="pl__vl pl__vl--l" />
            <div className="pl__vl pl__vl--r" />
            <div className="pl__corner pl__corner--tl" />
            <div className="pl__corner pl__corner--tr" />
            <div className="pl__corner pl__corner--bl" />
            <div className="pl__corner pl__corner--br" />
            <div className="pl__bottom-line" />
          </div>

          {/* ── RIGHT HALF — black ── */}
          <div className="pl__half--dark">
            <div className="pl__scanline" />
            <div className="pl__vl pl__vl--l" />
            <div className="pl__vl pl__vl--r" />
            <div className="pl__corner pl__corner--tl" />
            <div className="pl__corner pl__corner--tr" />
            <div className="pl__corner pl__corner--bl" />
            <div className="pl__corner pl__corner--br" />

            {/* Destination label */}
            <div className="pl__dest">
              <span className="pl__dest-label">Navigating to</span>
              <span className="pl__dest-name">{destName}</span>
            </div>

            {/* Progress bar */}
            <div className="pl__progress">
              <div
                className="pl__progress-fill"
                style={{ width: `${progress}%`, transition: fillTransition }}
              />
            </div>
          </div>

          {/* Red center seam */}
          <div className="pl__divider" />

          {/* Meta strip — spans full width */}
          <div className="pl__meta">
            <span className="pl__meta-item pl__meta-item--light">
              <span className="pl__meta-dot" />
              LXY Creative Studio
            </span>
            <span className="pl__meta-item pl__meta-item--dark">Jakarta, ID</span>
          </div>

          {/* Wordmark — straddles the seam */}
          <div className="pl__wordmark" aria-hidden="true">
            <span className="pl__wordmark-lx">LX</span>
            <span className="pl__wordmark-y">Y</span>
          </div>

        </div>
      </div>
    </>
  )
}