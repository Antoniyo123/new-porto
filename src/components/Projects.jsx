import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Projects.css'

const projects = [
  {
    id: 1, number: '01', title: 'Neon Abyss',
    category: 'Branding / Identity', year: '2024',
    color: '#FF3C3C', bg: '#0d0808',
    description: 'Sistem identitas visual untuk brand streetwear generasi baru yang menggabungkan elemen cyber-punk dan tradisi batik modern.',
    tag: 'Featured',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=840&h=400&fit=crop&q=80',
  },
  {
    id: 2, number: '02', title: 'Solara UI',
    category: 'Product Design', year: '2024',
    color: '#FFB830', bg: '#0d0b06',
    description: 'Design system komprehensif untuk platform fintech dengan 300+ komponen dan aksesibilitas WCAG AAA.',
    tag: 'Award',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=840&h=400&fit=crop&q=80',
  },
  {
    id: 3, number: '03', title: 'Archipelago',
    category: 'Web Experience', year: '2023',
    color: '#00E5CC', bg: '#060d0b',
    description: 'Pengalaman web imersif memetakan keanekaragaman hayati kepulauan Indonesia melalui visual data interaktif.',
    tag: 'Interactive',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=840&h=400&fit=crop&q=80',
  },
  {
    id: 4, number: '04', title: 'Void Studio',
    category: 'Motion / Film', year: '2023',
    color: '#A855F7', bg: '#09070d',
    description: 'Sequence pembuka sinematik untuk studio animasi independen menggunakan teknik tipografi kinetik.',
    tag: 'Motion',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=840&h=400&fit=crop&q=80',
  },
  {
    id: 5, number: '05', title: 'Kira App',
    category: 'Mobile UX', year: '2025',
    color: '#4ADE80', bg: '#070d08',
    description: 'Aplikasi wellness yang merancang ulang tracking kebiasaan dengan pendekatan berbasis konteks dan AI lokal.',
    tag: 'Launch',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=840&h=400&fit=crop&q=80',
  },
]

const aboutItems = [
  { label: 'Services', value: 'Branding · Motion · Digital' },
  { label: 'Clients',  value: '50+ Global Brands' },
  { label: 'Founded',  value: 'Jakarta, 2019' },
]

const CARD_W      = 420
const CARD_GAP    = 32
const TOTAL_SLIDE = (CARD_W + CARD_GAP) * projects.length

const FADE_IN_END    = 0.07
const FADE_OUT_START = 0.90

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function norm(val, a, b) {
  return Math.min(Math.max((val - a) / (b - a), 0), 1)
}

export default function HorizontalProjects() {
  const spacerRef = useRef(null)

  const [panelOpacity,  setPanelOpacity]  = useState(0)
  const [panelTransY,   setPanelTransY]   = useState(20)
  const [translateX,    setTranslateX]    = useState(0)
  const [barWidth,      setBarWidth]      = useState(0)
  const [activeIdx,     setActiveIdx]     = useState(0)
  const [isActive,      setIsActive]      = useState(false)
  const [nextVisible,   setNextVisible]   = useState(false)
  const [spacerH,       setSpacerH]       = useState(5000)
  const [cardP,         setCardP]         = useState(0)

  useEffect(() => {
    const calc = () => setSpacerH(window.innerHeight + TOTAL_SLIDE + 800)
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const onScroll = useCallback(() => {
    const spacer = spacerRef.current
    if (!spacer) return
    const rect      = spacer.getBoundingClientRect()
    const available = spacer.offsetHeight - window.innerHeight
    if (available <= 0) return
    const p = Math.min(Math.max(-rect.top / available, 0), 1)

    setIsActive(p > 0 && p < 1)

    const fadeInP  = easeInOut(norm(p, 0, FADE_IN_END))
    const fadeOutP = easeInOut(norm(p, FADE_OUT_START, 1))

    const opacity = p < FADE_IN_END ? fadeInP : p < FADE_OUT_START ? 1 : 1 - fadeOutP
    const transY  = p < FADE_IN_END ? 20 * (1 - fadeInP) : p < FADE_OUT_START ? 0 : -24 * fadeOutP

    setPanelOpacity(opacity)
    setPanelTransY(transY)

    const cp = easeInOut(norm(p, FADE_IN_END, FADE_OUT_START))
    setTranslateX(-(cp * TOTAL_SLIDE))
    setBarWidth(cp * 100)
    setCardP(cp)
    setActiveIdx(Math.min(Math.floor((cp * TOTAL_SLIDE) / (CARD_W + CARD_GAP) + 0.2), projects.length - 1))
    setNextVisible(p >= 1)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const seeMoreOpacity = easeInOut(norm(cardP, 0.82, 0.98))

  return (
    <>
      <div ref={spacerRef} className="hp__spacer" style={{ height: spacerH }} />

      <div
        className={`hp__panel${isActive ? ' hp__panel--active' : ''}`}
        style={{ opacity: panelOpacity, transform: `translateY(${panelTransY}px)` }}
      >
        <div className="hp__inner">

          <div className="hp__top-row">
            <div className="hp__title-block">

              <h2 className="hp__title-main">Our<br /><em>Projects</em></h2>
            </div>
            <div className="hp__counter-block">
              <div className={`hp__counter-num${activeIdx >= 0 ? ' hp__counter-num--lit' : ''}`}>
                {String(activeIdx + 1).padStart(2, '0')}
                <span style={{ color: '#1a1a1a', fontSize: '0.5em', verticalAlign: 'middle', margin: '0 4px' }}>/</span>
                <span style={{ color: '#2a2a2a' }}>{String(projects.length).padStart(2, '0')}</span>
              </div>
              <p className="hp__counter-label">Projects</p>
            </div>
          </div>

          <div className="hp__prog-wrap">
            <div className="hp__prog-track">
              <div className="hp__prog-fill" style={{ width: `${barWidth}%` }} />
            </div>
            <div className="hp__prog-dots">
              {projects.map((p, i) => (
                <span key={p.id} className={`hp__pdot${i === activeIdx ? ' hp__pdot--active' : ''}`}>
                  {p.number}
                </span>
              ))}
            </div>
          </div>

          <div className="hp__track-outer">
            <div className="hp__track" style={{ transform: `translateX(${translateX}px)` }}>

              {projects.map((proj, i) => (
                <div
                  key={proj.id}
                  className={`hp__card${i === activeIdx ? ' hp__card--active' : ''}`}
                  style={{
                    '--cc':      proj.color,
                    '--cc-dim':  proj.color + '20',
                    '--cc-dim2': proj.color + '2e',
                    background:  proj.bg,
                  }}
                >
                  <div className="hp__card-img-wrap">
                    <img className="hp__card-img" src={proj.image} alt={proj.title} loading="lazy" draggable="false" />
                    <div className="hp__card-img-tint" />
                    <div className="hp__card-num">{proj.number}</div>
                    <div className="hp__card-tag-wrap">
                      <span className="hp__card-tag">{proj.tag}</span>
                    </div>
                  </div>
                  <div className="hp__card-body">
                    <div>
                      <h2 className="hp__card-title">{proj.title}</h2>
                      <p  className="hp__card-cat">{proj.category}</p>
                      <p  className="hp__card-desc">{proj.description}</p>
                    </div>
                    <div className="hp__card-foot">
                      <span className="hp__card-year">{proj.year}</span>
                      <div  className="hp__card-arrow">↗</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ── See More → navigates to /work ── */}
              <Link
                to="/projects"
                className="hp__see-more"
                style={{
                  opacity: seeMoreOpacity,
                  transform: `translateY(${(1 - seeMoreOpacity) * 16}px)`,
                  pointerEvents: seeMoreOpacity > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="hp__see-more-label">More work</div>
                <div className="hp__see-more-count">+{projects.length * 3}</div>
                <div className="hp__see-more-bottom">
                  <span className="hp__see-more-cta">See all projects ↗</span>
                </div>
              </Link>

            </div>
          </div>

        </div>
      </div>

      <section className={`hp__next${nextVisible ? ' hp__next--vis' : ''}`}>
        <p className="hp__next-lbl">About the Studio</p>
        <div className="hp__next-grid">
          {aboutItems.map(item => (
            <div className="hp__next-item" key={item.label}>
              <p className="hp__next-item-lbl">{item.label}</p>
              <p className="hp__next-item-val">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="hp__cta-row">
          <h2 className="hp__cta-title">Mari buat sesuatu<br />yang <em>bermakna</em></h2>
        </div>
      </section>
    </>
  )
}