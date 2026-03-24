import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Projects.css'

const allImages = import.meta.glob('../assets/projects/**/*.{jpg,jpeg,png,webp}', { eager: true })

function getImg(folder, filename) {
  return allImages[`../assets/projects/${folder}/${filename}`]?.default
}

const projects = [
  {
    id: 1, number: '01', title: 'Brauss Networks',
    category: 'Web Design', year: '2024',
    color: '#FF3C3C', bg: '#0d0808',
    description: 'A creative agency specializing in event management, brand activation, and end-to-end production for corporate and entertainment clients.',
    tag: 'Web Design',
    image: getImg('brauuss', 'brauss1.png'),
  },
  {
    id: 2, number: '02', title: 'KACA Kreative',
    category: 'Web Design', year: '2024',
    color: '#FFB830', bg: '#0d0b06',
    description: 'A KOL management agency connecting brands with the right content creators to drive authentic engagement and campaign results.',
    tag: 'Web Design',
    image: getImg('kaca', 'kaca1.png'),
  },
  {
    id: 3, number: '03', title: 'IndobizCorner',
    category: 'Web Design', year: '2023',
    color: '#00E5CC', bg: '#060d0b',
    description: 'A trusted visa consultancy helping individuals and businesses navigate the application process for 20+ countries worldwide.',
    tag: 'Web Design',
    image: getImg('indobizcorner', 'indobiz3.png'),
  },
  {
    id: 4, number: '04', title: 'Merantau.com',
    category: 'Web Design', year: '2022',
    color: '#FFB830', bg: '#0d0b06',
    description: 'A licensed overseas workforce placement company managing end-to-end recruitment, documentation, and deployment for migrant workers.',
    tag: 'Web Design',
    image: getImg('merantau', 'merantau1.png'),
  },
  {
    id: 5, number: '05', title: 'PilarTrust',
    category: 'Web Design', year: '2025',
    color: '#4ADE80', bg: '#070d08',
    description: 'An ISO certification consultancy guiding companies through the full process of achieving international management system standards.',
    tag: 'Web Design',
    image: getImg('pilar', 'pilar1.png'),
  },
  {
    id: 6, number: '06', title: 'SaromaseCo',
    category: 'Web Design', year: '2023',
    color: '#FF3C3C', bg: '#0d0808',
    description: 'A domestic logistics and freight company offering reliable parcel and cargo delivery services across all provinces in Indonesia.',
    tag: 'Web Design',
    image: getImg('saromaseco', 'saromase2.png'),
  },
]

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'We specialize in web design and development using React + Vite — from UI/UX design and branding to full front-end build and launch.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take between 4 to 8 weeks depending on scope. Well give you a clear timeline after the initial discovery call.',
  },
  {
    q: 'Do you work with clients outside Indonesia?',
    a: 'Yes. We work with clients remotely across Southeast Asia and beyond. All communication is handled online.',
  },
  {
    q: 'How do we get started?',
    a: 'Simply reach out via the contact page. Well schedule a brief discovery call to understand your needs and send over a proposal.',
  },
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

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`hp__faq-item${open ? ' hp__faq-item--open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="hp__faq-q">
        <span>{q}</span>
        <span className="hp__faq-icon">{open ? '−' : '+'}</span>
      </div>
      <div className={`hp__faq-a-wrap${open ? ' hp__faq-a-wrap--open' : ''}`}>
        <p className="hp__faq-a">{a}</p>
      </div>
    </div>
  )
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

      {/* ── FAQ SECTION ── */}
      <section className={`hp__next${nextVisible ? ' hp__next--vis' : ''}`}>
        <div className="hp__faq-layout">

          {/* Left col — label + big title */}
          <div className="hp__faq-left">
            <p className="hp__faq-eyebrow">FAQ</p>
            <h2 className="hp__faq-title">
              Got<br />questions?
            </h2>
            <p className="hp__faq-sub">
              Everything you need to know before we start working together.
            </p>
          </div>

          {/* Right col — accordion */}
          <div className="hp__faq-right">
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}