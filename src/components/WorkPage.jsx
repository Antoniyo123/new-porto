import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/WorkPage.css'
import ProjectModal from './ProjectModal'

const allImages = import.meta.glob('../assets/projects/**/*.{jpg,jpeg,png,webp}', { eager: true })

function getImg(folder, filename) {
  return allImages[`../assets/projects/${folder}/${filename}`]?.default
}

const ALL_PROJECTS = [
  {
    id: 1, number: '01', title: 'Brauss Networks',
    category: 'Web Design', year: '2024',
    color: '#FF3C3C',
    description: 'A creative agency specializing in event management, brand activation, and end-to-end production for corporate and entertainment clients.',
    tag: 'Web Design',
    image: getImg('brauuss', 'brauss1.png'),
  },
  {
    id: 2, number: '02', title: 'KACA Kreative',
    category: 'Web Design', year: '2024',
    color: '#FFB830',
    description: 'A KOL management agency connecting brands with the right content creators to drive authentic engagement and campaign results.',
    tag: 'Web Design',
    image: getImg('kaca', 'kaca1.png'),
  },
  {
    id: 3, number: '03', title: 'IndobizCorner',
    category: 'Web Design', year: '2023',
    color: '#00C4AD',
    description: 'A trusted visa consultancy helping individuals and businesses navigate the visa application process for 20+ countries worldwide.',
    tag: 'Web Design',
    image: getImg('indobizcorner', 'indobiz3.png'),
  },
  {
    id: 4, number: '04', title: 'Merantau.com',
    category: 'Web Design', year: '2022',
    color: '#FFB830',
    description: 'A licensed overseas workforce placement company managing end-to-end recruitment, documentation, and deployment for migrant workers.',
    tag: 'Web Design',
    image: getImg('merantau', 'merantau1.png'),
  },
  {
    id: 5, number: '05', title: 'PilarTrust',
    category: 'Web Design', year: '2025',
    color: '#FFB830',
    description: 'An ISO certification consultancy guiding companies through the full process of achieving international management system standards.',
    tag: 'Web Design',
    image: getImg('pilar', 'pilar1.png'),
  },
  {
    id: 6, number: '06', title: 'SaromaseCo',
    category: 'Web Design', year: '2023',
    color: '#FF3C3C',
    description: 'A domestic logistics and freight company offering reliable parcel and cargo delivery services across all provinces in Indonesia.',
    tag: 'Web Design',
    image: getImg('saromaseco', 'saromase2.png'),
  },
]

export default function WorkPage() {
  const [mounted,    setMounted]    = useState(false)
  const [activeProj, setActiveProj] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const openModal  = useCallback((proj) => setActiveProj(proj), [])
  const closeModal = useCallback(() => setActiveProj(null), [])

  return (
    <>
      <div className={`wk${mounted ? ' wk--in' : ''}`}>

        {/* ── HERO ── */}
        <header className="wk__hero">
          <Link to="/" className="wk__back">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M16 4L4 16M4 16h9M4 16V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>

          <div className="wk__hero-inner">
            <div className="wk__hero-left">
              <p className="wk__eyebrow">
                <span className="wk__eyebrow-dot" />
                LXY Creative Studio
              </p>
              <h1 className="wk__hero-title">
                Selected<br /><em>Work</em>
              </h1>
            </div>

            <div className="wk__hero-right">
              <p className="wk__hero-desc">
                A curated collection of identity systems, digital experiences,
                and motion work — built with intent, delivered with precision.
              </p>
              <div className="wk__hero-meta">
                <span className="wk__hero-meta-item">
                  <span className="wk__hero-meta-num">{ALL_PROJECTS.length}</span>
                  Projects
                </span>
                <span className="wk__hero-meta-sep" />
                <span className="wk__hero-meta-item">
                  <span className="wk__hero-meta-num">2019</span>
                  — Present
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ── GRID ── */}
        <main className="wk__grid">
          {ALL_PROJECTS.map((proj, i) => (
            <article
              key={proj.id}
              className="wk__card"
              style={{
                '--cc':     proj.color,
                '--cc-dim': proj.color + '22',
                animationDelay: `${i * 0.05}s`,
              }}
              onClick={() => openModal(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(proj)}
              aria-label={`View ${proj.title} project detail`}
            >
              <div className="wk__card-glow" />

              <div className="wk__card-img-wrap">
                <img
                  className="wk__card-img"
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  draggable="false"
                />
                <div className="wk__card-img-tint" />
                <span className="wk__card-num">{proj.number}</span>
                <span className="wk__card-tag">{proj.tag}</span>
              </div>

              <div className="wk__card-body">
                <div>
                  <h2 className="wk__card-title">{proj.title}</h2>
                  <p  className="wk__card-cat">{proj.category}</p>
                  <p  className="wk__card-desc">{proj.description}</p>
                </div>
                <div className="wk__card-foot">
                  <span className="wk__card-year">{proj.year}</span>
                  <div className="wk__card-arrow">
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                      <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>

        {/* ── BOTTOM CTA ── */}
        <section className="wk__bottom-cta">
          <p className="wk__bottom-eyebrow">Have a project in mind?</p>
          <h2 className="wk__bottom-title">
            Let's build something<br /><em>together.</em>
          </h2>
          <Link to="/contact" className="wk__bottom-btn">
            Start a conversation
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </section>

      </div>

      <ProjectModal project={activeProj} onClose={closeModal} />
    </>
  )
}