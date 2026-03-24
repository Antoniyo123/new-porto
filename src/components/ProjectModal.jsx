import { useEffect, useRef, useState } from 'react'
import '../styles/ProjectModal.css'

const allImages = import.meta.glob('../assets/projects/**/*.{jpg,jpeg,png,webp}', { eager: true })

function folderImages(folder) {
  const prefix = `../assets/projects/${folder}/`
  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default)
    .filter(Boolean)
}

const PROJECT_DETAILS = {
  1: {
    // Brauss Network — Agency & Event Management
    stats:        [{ num: '6 mo', lbl: 'Duration' }, { num: '12', lbl: 'Events' }, { num: '3', lbl: 'Rounds' }],
    deliverables: ['Brand identity & visual system', 'Event concept & art direction', 'Talent & vendor coordination', 'Promotional materials', 'Social media campaign', 'Post-event report'],
    steps: [
      { no: '01', name: 'Discovery',   desc: 'Brand research, competitor analysis, and digital needs mapping for Brauss Network.' },
      { no: '02', name: 'Wireframe',   desc: 'Page structure and main navigation flow planning.' },
      { no: '03', name: 'UI Design',   desc: 'Full visual design — typography, color system, and layout per page.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, cross-device testing, and final launch.' },
    ],
    images: folderImages('brauuss'),
  },
  2: {
    // KACA Kreative — KOL Management
    stats:        [{ num: '4 mo', lbl: 'Duration' }, { num: '50+', lbl: 'KOLs' }, { num: '3x', lbl: 'Engagement' }],
    deliverables: ['KOL content strategy', 'Talent selection & onboarding', 'Creative brief per campaign', 'Performance monitoring & reports', 'Brand contract negotiation', 'Audience analysis'],
    steps: [
      { no: '01', name: 'Discovery',   desc: "Understanding KACA's positioning and the clients they want to reach." },
      { no: '02', name: 'Wireframe',   desc: 'Designing the KOL portfolio flow and service pages.' },
      { no: '03', name: 'UI Design',   desc: 'Playful yet professional visuals suited to the creative industry.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, smooth animations, and performance optimization.' },
    ],
    images: folderImages('kaca'),
  },
  3: {
    // IndobizCorner — Visa Agent
    stats:        [{ num: '5 mo', lbl: 'Duration' }, { num: '20+', lbl: 'Countries' }, { num: '98%', lbl: 'Approval' }],
    deliverables: ['Visa type consultation', 'Document preparation & verification', 'Embassy submission', 'Application status tracking', 'Visa on arrival service', 'Travel guide'],
    steps: [
      { no: '01', name: 'Discovery',   desc: 'Mapping visa services and understanding the needs of prospective users.' },
      { no: '02', name: 'Wireframe',   desc: 'Page structure designed to help clients easily select the right visa type.' },
      { no: '03', name: 'UI Design',   desc: 'Clean, trustworthy design — essential for a document services business.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, inquiry form, and per-country info pages.' },
    ],
    images: folderImages('indobizcorner'),
  },
  4: {
    // Merantau.com — Overseas Workforce Placement
    stats:        [{ num: '4 mo', lbl: 'Duration' }, { num: '15+', lbl: 'Countries' }, { num: '1000+', lbl: 'Workers' }],
    deliverables: ['Worker recruitment & selection', 'Document & work visa processing', 'Pre-departure training', 'PJTKI coordination', 'Departure assistance', 'Post-placement support'],
    steps: [
      { no: '01', name: 'Discovery',   desc: 'Researching the primary audience — prospective workers and their families.' },
      { no: '02', name: 'Wireframe',   desc: 'Clear information flow from registration through to departure.' },
      { no: '03', name: 'UI Design',   desc: 'Warm visuals, easy to understand across diverse user backgrounds.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, online registration pages, and multi-language support.' },
    ],
    images: folderImages('merantau'),
  },
  5: {
    // PilarTrust — ISO Certification
    stats:        [{ num: '5 mo', lbl: 'Duration' }, { num: '10+', lbl: 'ISO Standards' }, { num: '100%', lbl: 'Certified' }],
    deliverables: ['Gap analysis & initial assessment', 'Management system documentation', 'Internal auditor training', 'Certification audit assistance', 'Corrective action support', 'Official ISO certificate'],
    steps: [
      { no: '01', name: 'Discovery',   desc: 'Understanding the ISO services offered and the corporate client profile.' },
      { no: '02', name: 'Wireframe',   desc: 'Service pages, certification process flow, and trust signal sections.' },
      { no: '03', name: 'UI Design',   desc: 'Formal, authoritative design suited to the B2B corporate segment.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, consultation pages, and leads form integration.' },
    ],
    images: folderImages('pilar'),
  },
  6: {
    // SaromaseCo — Domestic Logistics
    stats:        [{ num: '3 mo', lbl: 'Duration' }, { num: '34', lbl: 'Provinces' }, { num: '2023', lbl: 'Year' }],
    deliverables: ['Regular & express delivery service', 'Door-to-door pickup', 'Real-time shipment tracking', 'Special cargo handling', 'Shipping insurance', 'Monthly delivery reports'],
    steps: [
      { no: '01', name: 'Discovery',   desc: 'Researching sender needs — individuals and small business owners.' },
      { no: '02', name: 'Wireframe',   desc: 'Shipping rate check, pickup order, and tracking in a single flow.' },
      { no: '03', name: 'UI Design',   desc: 'Clean, fast-to-read visuals — prioritizing quick access to information.' },
      { no: '04', name: 'Development', desc: 'Built with React + Vite, real-time shipping rate calculator, and tracking pages.' },
    ],
    images: folderImages('saromaseco'),
  },
}

/* ─────────────────────────────────────────
   Carousel sub-component
───────────────────────────────────────── */
function Carousel({ images }) {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx(i => Math.max(i - 1, 0))
  const next = () => setIdx(i => Math.min(i + 1, images.length - 1))

  useEffect(() => { setIdx(0) }, [images])

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <div className="pm__carousel">
      <div className="pm__slides" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className={`pm__slide${i === idx ? ' pm__slide--active' : ''}`}>
            <img className="pm__slide-img" src={src} alt={`Project image ${i + 1}`} loading="lazy" draggable="false" />
          </div>
        ))}
      </div>

      <span className="pm__carousel-count">
        {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </span>

      <div className="pm__carousel-nav">
        <button className="pm__carousel-btn" onClick={prev} disabled={idx === 0} aria-label="Previous image">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="pm__carousel-btn" onClick={next} disabled={idx === images.length - 1} aria-label="Next image">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="pm__carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pm__dot${i === idx ? ' pm__dot--active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main modal component
───────────────────────────────────────── */
export default function ProjectModal({ project, onClose }) {
  const bodyRef = useRef(null)
  const isOpen  = !!project
  const detail  = project ? PROJECT_DETAILS[project.id] : null

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && bodyRef.current) bodyRef.current.scrollTop = 0
  }, [project?.id])

  return (
    <>
      <div
        className={`pm__backdrop${isOpen ? ' pm__backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`pm${isOpen ? ' pm--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={project ? `${project.title} project detail` : 'Project detail'}
      >
        <div className="pm__accent" />

        <div className="pm__header">
          <div className="pm__header-meta">
            <span className="pm__header-no">{project?.number} / 06</span>
            <span className="pm__header-tag">{project?.tag}</span>
          </div>
          <button className="pm__close" onClick={onClose} aria-label="Close">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="pm__body" ref={bodyRef}>
          {project && detail && (
            <>
              <Carousel images={detail.images} />

              <div className="pm__content">
                <div className="pm__title-row">
                  <h2 className="pm__title">{project.title}</h2>
                  <span className="pm__year">{project.year}</span>
                </div>
                <p className="pm__cat">{project.category}</p>
                <p className="pm__desc">{project.description}</p>

                <div className="pm__stats">
                  {detail.stats.map(s => (
                    <div className="pm__stat" key={s.lbl}>
                      <span className="pm__stat-num">{s.num}</span>
                      <span className="pm__stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>

                <p className="pm__section-label">What was delivered</p>
                <div className="pm__deliverables">
                  {detail.deliverables.map((d, i) => (
                    <div className="pm__deliverable" key={i}>
                      <span className="pm__deliverable-dot" />
                      <span className="pm__deliverable-text">{d}</span>
                    </div>
                  ))}
                </div>

                <p className="pm__section-label">How we worked</p>
                <div className="pm__steps">
                  {detail.steps.map(s => (
                    <div className="pm__step" key={s.no}>
                      <span className="pm__step-no">{s.no}</span>
                      <div>
                        <p className="pm__step-name">{s.name}</p>
                        <p className="pm__step-desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="pm__footer">
          <p className="pm__footer-text">Like what you see? Let's work together.</p>
          <a href="mailto:hello@lxy.co" className="pm__cta">
            Start a project
            <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}