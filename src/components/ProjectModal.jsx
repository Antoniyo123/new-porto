import { useEffect, useRef, useState, useCallback } from 'react'
import '../styles/ProjectModal.css'

/* ─────────────────────────────────────────
   Per-project detail data
───────────────────────────────────────── */
const PROJECT_DETAILS = {
  1: {
    stats: [{ num: '6 mo', lbl: 'Duration' }, { num: '12',   lbl: 'Deliverables' }, { num: '3',    lbl: 'Rounds'  }],
    deliverables: ['Logo & wordmark (primary + variants)', 'Brand colour system & typography', 'Brand guidelines (80-page PDF)', 'Pattern & texture asset library', 'Social media kit', 'Packaging mockups'],
    steps: [
      { no: '01', name: 'Discovery', desc: 'Brand audit, cultural research, and competitor positioning.' },
      { no: '02', name: 'Direction', desc: 'Three distinct creative directions presented for feedback.' },
      { no: '03', name: 'Refinement', desc: 'Full system development from selected direction.' },
      { no: '04', name: 'Delivery', desc: 'Final assets in all formats + guidelines handoff.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&h=506&fit=crop&q=85',
    ],
  },
  2: {
    stats: [{ num: '4 mo', lbl: 'Duration' }, { num: '300+', lbl: 'Components' }, { num: 'AAA',  lbl: 'WCAG' }],
    deliverables: ['Complete design system (Figma)', '300+ reusable components', 'Design tokens (JSON)', 'Interactive prototype', 'Developer handoff docs', 'Usage documentation'],
    steps: [
      { no: '01', name: 'Audit', desc: 'Review of existing product and accessibility gaps.' },
      { no: '02', name: 'Foundations', desc: 'Colour, type, spacing, and motion tokens.' },
      { no: '03', name: 'Components', desc: 'Build library from atoms to complex patterns.' },
      { no: '04', name: 'Handoff', desc: 'Annotated specs and dev-ready Figma file.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=506&fit=crop&q=85',
    ],
  },
  3: {
    stats: [{ num: '5 mo', lbl: 'Duration' }, { num: '500+', lbl: 'Data points' }, { num: '98',   lbl: 'Perf score' }],
    deliverables: ['Interactive web experience', 'Data visualisation system', 'Responsive design', 'CMS integration', 'Performance optimisation', 'SEO & metadata'],
    steps: [
      { no: '01', name: 'Research', desc: 'Biodiversity data mapping and storytelling strategy.' },
      { no: '02', name: 'UX Design', desc: 'Interaction model and scroll-driven narrative.' },
      { no: '03', name: 'Visual Design', desc: 'Illustration system and data visualisation.' },
      { no: '04', name: 'Build', desc: 'React + D3 implementation with CMS.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=506&fit=crop&q=85',
    ],
  },
  4: {
    stats: [{ num: '3 mo', lbl: 'Duration' }, { num: '4K',   lbl: 'Resolution' }, { num: '90s',  lbl: 'Runtime' }],
    deliverables: ['Opening sequence (90s)', 'Kinetic type system', 'Logo animation variants', 'Transition library', 'Sound design brief', 'Delivery in 4K + web'],
    steps: [
      { no: '01', name: 'Concept', desc: 'Storyboard, style frames, and music direction.' },
      { no: '02', name: 'Type Design', desc: 'Kinetic typography system and motion language.' },
      { no: '03', name: 'Animation', desc: 'Full sequence production in After Effects.' },
      { no: '04', name: 'Delivery', desc: 'Render in multiple formats with full source files.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=900&h=506&fit=crop&q=85',
    ],
  },
  5: {
    stats: [{ num: '8 mo', lbl: 'Duration' }, { num: '60+',  lbl: 'Screens' }, { num: 'AI',   lbl: 'Powered' }],
    deliverables: ['iOS & Android design', 'Onboarding flow', 'Habit tracking UX', 'AI context UI', 'App Store assets', 'Design system'],
    steps: [
      { no: '01', name: 'Research', desc: 'User interviews, competitor analysis, and habit science review.' },
      { no: '02', name: 'UX', desc: 'Flows, wireframes, and prototype testing.' },
      { no: '03', name: 'UI Design', desc: 'Full visual design system for both platforms.' },
      { no: '04', name: 'Handoff', desc: 'Developer specs, assets, and motion guidelines.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&h=506&fit=crop&q=85',
    ],
  },
  6: {
    stats: [{ num: '3 mo', lbl: 'Duration' }, { num: '8',    lbl: 'Formats' }, { num: '2024', lbl: 'Year' }],
    deliverables: ['Wordmark redesign', 'Vinyl packaging system', 'Merch design templates', 'Digital brand kit', 'Press release assets', 'Style guide'],
    steps: [
      { no: '01', name: 'Audit', desc: 'Analysis of current brand and music identity.' },
      { no: '02', name: 'Concept', desc: 'Three rebranding directions with moodboards.' },
      { no: '03', name: 'System', desc: 'Full identity system across physical and digital.' },
      { no: '04', name: 'Print', desc: 'Production-ready files for vinyl and merch.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=506&fit=crop&q=85',
    ],
  },
  7: {
    stats: [{ num: '6 mo', lbl: 'Duration' }, { num: '1200', lbl: 'Species' }, { num: '4',    lbl: 'Languages' }],
    deliverables: ['Interactive map platform', 'Data visualisation', 'Species illustration system', 'CMS & content pipeline', 'Multilingual support', 'Mobile-responsive'],
    steps: [
      { no: '01', name: 'Data', desc: 'GIS data integration and taxonomy mapping.' },
      { no: '02', name: 'UX', desc: 'Spatial navigation and filter systems.' },
      { no: '03', name: 'Design', desc: 'Illustration style and data visual language.' },
      { no: '04', name: 'Build', desc: 'Mapbox + React with multilingual CMS.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&h=506&fit=crop&q=85',
    ],
  },
  8: {
    stats: [{ num: '4 mo', lbl: 'Duration' }, { num: '6',    lbl: 'Weights' }, { num: '400+', lbl: 'Glyphs' }],
    deliverables: ['Display typeface (6 weights)', 'Variable font file', 'OTF + WOFF2 formats', 'Type specimen PDF', 'Licensing documentation', 'Web embed kit'],
    steps: [
      { no: '01', name: 'Research', desc: 'Study of traditional market lettering and wood type.' },
      { no: '02', name: 'Skeleton', desc: 'Core letterforms and spacing system.' },
      { no: '03', name: 'Refinement', desc: 'Full character set and weight interpolation.' },
      { no: '04', name: 'Delivery', desc: 'Font engineering, hinting, and packaging.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=506&fit=crop&q=85',
    ],
  },
  9: {
    stats: [{ num: '5 mo', lbl: 'Duration' }, { num: '80+',  lbl: 'Components' }, { num: '100', lbl: 'Perf score' }],
    deliverables: ['Real-time dashboard', 'Chart & graph library', 'Alert system UI', 'Dark mode-first design', 'Figma design system', 'Developer handoff'],
    steps: [
      { no: '01', name: 'Research', desc: 'Energy data workflows and operator interviews.' },
      { no: '02', name: 'Architecture', desc: 'Dashboard layout and data hierarchy.' },
      { no: '03', name: 'Design', desc: 'Dark-mode component library and chart system.' },
      { no: '04', name: 'Build', desc: 'Next.js + Recharts implementation.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=506&fit=crop&q=85',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&h=506&fit=crop&q=85',
    ],
  },
}

/* ─────────────────────────────────────────
   Carousel sub-component
───────────────────────────────────────── */
function Carousel({ images }) {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx(i => Math.max(i - 1, 0))
  const next = () => setIdx(i => Math.min(i + 1, images.length - 1))

  // Reset on image set change
  useEffect(() => { setIdx(0) }, [images])

  // Keyboard left/right inside carousel
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
      {/* Slides */}
      <div
        className="pm__slides"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className={`pm__slide${i === idx ? ' pm__slide--active' : ''}`}>
            <img className="pm__slide-img" src={src} alt={`Project image ${i + 1}`} loading="lazy" draggable="false" />
          </div>
        ))}
      </div>

      {/* Counter */}
      <span className="pm__carousel-count">
        {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </span>

      {/* Prev / Next */}
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

      {/* Dots */}
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

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Scroll panel to top on project change
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

        {/* Header */}
        <div className="pm__header">
          <div className="pm__header-meta">
            <span className="pm__header-no">{project?.number} / 09</span>
            <span className="pm__header-tag">{project?.tag}</span>
          </div>
          <button className="pm__close" onClick={onClose} aria-label="Close">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="pm__body" ref={bodyRef}>
          {project && detail && (
            <>
              {/* Carousel */}
              <Carousel images={detail.images} />

              {/* Content */}
              <div className="pm__content">
                <div className="pm__title-row">
                  <h2 className="pm__title">{project.title}</h2>
                  <span className="pm__year">{project.year}</span>
                </div>
                <p className="pm__cat">{project.category}</p>
                <p className="pm__desc">{project.description}</p>

                {/* Stats */}
                <div className="pm__stats">
                  {detail.stats.map(s => (
                    <div className="pm__stat" key={s.lbl}>
                      <span className="pm__stat-num">{s.num}</span>
                      <span className="pm__stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <p className="pm__section-label">What was delivered</p>
                <div className="pm__deliverables">
                  {detail.deliverables.map((d, i) => (
                    <div className="pm__deliverable" key={i}>
                      <span className="pm__deliverable-dot" />
                      <span className="pm__deliverable-text">{d}</span>
                    </div>
                  ))}
                </div>

                {/* Process */}
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

        {/* Footer */}
        <div className="pm__footer">
          <p className="pm__footer-text">
            Like what you see? Let's work together.
          </p>
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