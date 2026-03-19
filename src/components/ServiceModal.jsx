import { useEffect, useRef } from 'react'
import '../styles/ServiceModal.css'

/*
  ServiceModal — slide-in detail panel
  Props:
    service  : object | null  — the selected service (null = closed)
    onClose  : () => void     — called to dismiss
*/

// Per-service detail content
const SERVICE_DETAILS = {
  '01': {
    deliverables: [
      'Logo & wordmark (primary + variations)',
      'Brand colour palette & typography system',
      'Brand guidelines document (PDF)',
      'Business card & stationery design',
      'Social media kit & templates',
      'Brand pattern / texture assets',
    ],
    steps: [
      { name: 'Discovery',   desc: 'Brand audit, competitor analysis, and target audience mapping.' },
      { name: 'Concept',     desc: 'Mood boards and 2–3 distinct creative directions.' },
      { name: 'Development', desc: 'Refine selected direction across all touchpoints.' },
      { name: 'Delivery',    desc: 'Final files in all formats + brand guidelines handoff.' },
    ],
    stats: [
      { num: '2–4',  lbl: 'Weeks' },
      { num: '3',    lbl: 'Concepts' },
      { num: '∞',    lbl: 'Revisions' },
    ],
  },
  '02': {
    deliverables: [
      'UX wireframes & sitemap',
      'Full visual design (desktop + mobile)',
      'Interactive Figma prototype',
      'Design system / component library',
      'Developer handoff (Figma Inspect)',
      'Post-launch design support',
    ],
    steps: [
      { name: 'Research',  desc: 'User flows, competitor UX review, and content audit.' },
      { name: 'Wireframe', desc: 'Low-fidelity layouts for every key screen.' },
      { name: 'Design',    desc: 'High-fidelity screens with your brand system applied.' },
      { name: 'Handoff',   desc: 'Annotated specs, assets, and dev-ready Figma file.' },
    ],
    stats: [
      { num: '3–6',  lbl: 'Weeks' },
      { num: '100%', lbl: 'Responsive' },
      { num: 'AA',   lbl: 'Accessible' },
    ],
  },
  '03': {
    deliverables: [
      'UX flows & user journey maps',
      'iOS & Android screen designs',
      'Interactive prototype (Figma)',
      'Icon set & illustration assets',
      'Design system (tokens + components)',
      'App Store / Play Store assets',
    ],
    steps: [
      { name: 'Define',    desc: 'User personas, core jobs-to-be-done, and feature scope.' },
      { name: 'Structure', desc: 'Navigation architecture and key screen flows.' },
      { name: 'UI Design', desc: 'Pixel-perfect screens for both platforms.' },
      { name: 'Handoff',   desc: 'Component specs, motion notes, and dev assets.' },
    ],
    stats: [
      { num: '4–8',  lbl: 'Weeks' },
      { num: '2',    lbl: 'Platforms' },
      { num: '60+',  lbl: 'Screens' },
    ],
  },
  '04': {
    deliverables: [
      'Custom illustration set (5–20 pieces)',
      'Brand character / mascot design',
      'Icon system (SVG + PNG)',
      'Scene & editorial illustrations',
      'Animation-ready layered files',
      'Full usage license',
    ],
    steps: [
      { name: 'Brief',   desc: 'Style direction, references, and usage context.' },
      { name: 'Sketch',  desc: 'Rough compositions shared for early feedback.' },
      { name: 'Refine',  desc: 'Colour, detail, and final polish.' },
      { name: 'Deliver', desc: 'All formats — SVG, PNG, PDF, and source files.' },
    ],
    stats: [
      { num: '2–5',  lbl: 'Weeks' },
      { num: '100%', lbl: 'Custom' },
      { num: 'SVG',  lbl: 'Format' },
    ],
  },
  '05': {
    deliverables: [
      'React / Next.js frontend build',
      'CMS integration (Sanity, Contentful)',
      'Performance-optimised codebase',
      'SEO & metadata setup',
      'Deployment (Vercel / Netlify)',
      '30-day post-launch support',
    ],
    steps: [
      { name: 'Setup',   desc: 'Tech stack selection, repo, and CI/CD pipeline.' },
      { name: 'Build',   desc: 'Component-driven development from approved designs.' },
      { name: 'QA',      desc: 'Cross-browser, device, and accessibility testing.' },
      { name: 'Launch',  desc: 'Deploy, monitor, and hand over documentation.' },
    ],
    stats: [
      { num: '4–8',  lbl: 'Weeks' },
      { num: '100',  lbl: 'Perf score' },
      { num: 'MIT',  lbl: 'License' },
    ],
  },
}

export default function ServiceModal({ service, onClose }) {
  const panelRef  = useRef(null)
  const isOpen    = !!service
  const detail    = service ? SERVICE_DETAILS[service.no] : null

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Scroll panel to top when service changes */
  useEffect(() => {
    if (isOpen && panelRef.current) panelRef.current.scrollTop = 0
  }, [service?.no])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`svm__backdrop${isOpen ? ' svm__backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`svm${isOpen ? ' svm--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={service ? `${service.title} service details` : 'Service details'}
        style={{ '--svm-color': service?.color ?? '#ff3c3c' }}
      >
        {/* Accent line */}
        <div className="svm__accent" />

        {/* Header */}
        <div className="svm__header">
          <span className="svm__header-label">Service Detail</span>
          <button className="svm__close" onClick={onClose} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="svm__body" ref={panelRef}>

          {service && (
            <>
              {/* Hero image */}
              <div className="svm__img-wrap">
                <img className="svm__img" src={service.img} alt={service.title} loading="lazy" />
                <div className="svm__img-tint" />
                <span className="svm__img-tag">{service.tag}</span>
                <span className="svm__img-num">{service.no}</span>
              </div>

              {/* Content */}
              <div className="svm__content">

                {/* No + Tag */}
                <div className="svm__meta-row">
                  <span className="svm__no">{service.no} / 05</span>
                  <span className="svm__tag">{service.tag}</span>
                </div>

                {/* Title */}
                <h2 className="svm__title">{service.title}</h2>

                {/* Description */}
                <p className="svm__desc">{service.desc}</p>

                {/* Stats */}
                {detail && (
                  <div className="svm__stats">
                    {detail.stats.map(s => (
                      <div className="svm__stat" key={s.lbl}>
                        <span className="svm__stat-num">{s.num}</span>
                        <span className="svm__stat-lbl">{s.lbl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables */}
                {detail && (
                  <>
                    <p className="svm__section-label">What you get</p>
                    <div className="svm__deliverables">
                      {detail.deliverables.map((d, i) => (
                        <div className="svm__deliverable" key={i}>
                          <span className="svm__deliverable-dot" />
                          <span className="svm__deliverable-text">{d}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Process steps */}
                {detail && (
                  <>
                    <p className="svm__section-label">How it works</p>
                    <div className="svm__steps">
                      {detail.steps.map((s, i) => (
                        <div className="svm__step" key={i}>
                          <span className="svm__step-no">0{i + 1}</span>
                          <div className="svm__step-content">
                            <p className="svm__step-name">{s.name}</p>
                            <p className="svm__step-desc">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </div>
            </>
          )}
        </div>

        {/* Sticky footer CTA */}
        <div className="svm__footer">
          <p className="svm__footer-text">
            Interested in this service? Let's talk about your project.
          </p>
          <a href="mailto:hello@lxy.co" className="svm__cta">
            Get a quote
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}