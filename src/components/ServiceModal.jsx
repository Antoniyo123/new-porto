import { useEffect, useRef } from 'react'
import '../styles/ServiceModal.css'

// Per-service detail content untuk Brauss Networks
const SERVICE_DETAILS = {
  '01': { // WEB DEVELOPMENT
    deliverables: [
      'Responsive website (desktop, tablet, mobile)',
      'Custom web application development',
      'CMS integration (WordPress, Headless CMS)',
      'E-commerce platform setup',
      'SEO optimization & performance tuning',
      'Post-launch support & maintenance',
    ],
    steps: [
      { name: 'Planning',     desc: 'Sitemap, wireframes, and technical architecture planning.' },
      { name: 'Design',       desc: 'UI/UX design with brand integration and user flow optimization.' },
      { name: 'Development',  desc: 'Clean code development with modern frameworks (React, Next.js).' },
      { name: 'Launch',       desc: 'Testing, deployment, and comprehensive handoff documentation.' },
    ],
    stats: [
      { num: '3–8',  lbl: 'Weeks' },
      { num: '100%', lbl: 'Responsive' },
      { num: 'A+',   lbl: 'Performance' },
    ],
    packages: [
      {
        id: 'basic',
        name: 'PAKET BASIC',
        subtitle: 'Starter Portfolio',
        price: 'Start from Rp 3.000.000',
        features: [
          '1 halaman (Landing Page)',
          'About, Skills, Portfolio, Contact',
          'Responsive (mobile friendly)',
          'Integrasi WhatsApp / Email',
          'Clean modern design (template-based)',
        ],
        includes: [
          'Hosting (Vercel – cepat & aman)',
        ],
        excludes: [
          'Domain',
        ],
      },
      {
        id: 'professional',
        name: 'PAKET PROFESSIONAL',
        subtitle: 'Personal Branding',
        price: 'Rp 5.000.000 – Rp 8.000.000',
        features: [
          '3–5 halaman (Home, About, Services, Portfolio, Contact)',
          'Custom design (branding lebih kuat)',
          'Animasi smooth & modern',
          'SEO basic',
          'Integrasi WhatsApp & Instagram',
          'Form inquiry (lead masuk)',
        ],
        includes: [
          'Hosting (Vercel)',
          'Copywriting basic',
          'Revisi 2x',
        ],
        excludes: [
          'Domain',
        ],
      },
      {
        id: 'premium',
        name: 'PAKET PREMIUM',
        subtitle: 'High Value Portfolio / Company Profile',
        price: 'Rp 9.000.000 – Rp 20.000.000',
        features: [
          'Unlimited halaman',
          'Full custom design (exclusive & high-end)',
          'Advanced animation (cinematic feel)',
          'CMS (editable sendiri)',
          'SEO advanced',
          'Analytics & tracking',
          'Lead generation funnel',
        ],
        includes: [
          'Hosting (Vercel – global CDN)',
          'Copywriting profesional',
          'Strategi branding',
          'Revisi unlimited (fair use)',
        ],
        excludes: [
          'Domain',
        ],
      },
    ],
    addOns: [
      { name: 'Domain (.com, .id, dll)', price: 'Rp 150.000 – Rp 300.000 / tahun' },
      { name: 'Foto profesional', price: 'Rp 500.000 – Rp 2.000.000' },
      { name: 'Copywriting premium', price: 'Rp 1.000.000 – Rp 3.000.000' },
      { name: 'SEO lanjutan', price: 'Rp 2.000.000 – Rp 5.000.000' },
      { name: 'Video cinematic', price: 'Rp 2.000.000 – Rp 10.000.000' },
    ],
    note: 'Website sudah termasuk hosting menggunakan Vercel (server global, cepat, aman). Domain dibeli terpisah sesuai kebutuhan brand.',
  },
  '02': { // ILLUSTRATION
    deliverables: [
      'Custom digital illustrations (10–30 pieces)',
      'Brand character & mascot design',
      'Editorial & marketing illustrations',
      'Social media graphics & templates',
      'Infographic design & visualization',
      'Full commercial usage rights',
    ],
    steps: [
      { name: 'Concept',   desc: 'Style exploration, mood boards, and reference gathering.' },
      { name: 'Sketching', desc: 'Initial concepts and composition layouts for approval.' },
      { name: 'Rendering', desc: 'Full color illustration with final details and polish.' },
      { name: 'Delivery',  desc: 'All formats (AI, SVG, PNG, PDF) and source files included.' },
    ],
    stats: [
      { num: '2–6',  lbl: 'Weeks' },
      { num: '100%', lbl: 'Original' },
      { num: 'Vector', lbl: 'Format' },
    ],
  },
  '03': { // MOTION & VISUAL
    deliverables: [
      'Animated logo & brand identity',
      'Explainer video & product demos',
      'Social media video content',
      'Motion graphics & visual effects',
      'Video editing & color grading',
      'Multiple format exports (MP4, MOV, GIF)',
    ],
    steps: [
      { name: 'Storyboard', desc: 'Script development, storyboarding, and animation planning.' },
      { name: 'Animation',  desc: 'Motion design, character animation, and visual effects.' },
      { name: 'Sound',      desc: 'Sound design, music selection, and audio mixing.' },
      { name: 'Export',     desc: 'Final render in all required formats and resolutions.' },
    ],
    stats: [
      { num: '2–8',  lbl: 'Weeks' },
      { num: '4K',   lbl: 'Quality' },
      { num: '60fps', lbl: 'Smooth' },
    ],
  },
  '04': { // PHOTOGRAPHY
    deliverables: [
      'Professional photo shoot (100+ shots)',
      'Product photography & styling',
      'Event & corporate photography',
      'Photo retouching & color correction',
      'High-resolution RAW + edited files',
      'Full commercial usage license',
    ],
    steps: [
      { name: 'Planning',   desc: 'Shot list creation, location scouting, and scheduling.' },
      { name: 'Shoot',      desc: 'Professional photography session with lighting & direction.' },
      { name: 'Selection',  desc: 'Photo culling and selection of best shots for editing.' },
      { name: 'Editing',    desc: 'Professional retouching, color grading, and final delivery.' },
    ],
    stats: [
      { num: '1–3',  lbl: 'Days' },
      { num: '100+', lbl: 'Photos' },
      { num: 'RAW',  lbl: 'Format' },
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
        style={{ '--svm-color': service?.color ?? '#667eea' }}
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
                  <span className="svm__no">{service.no} / 04</span>
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

                {/* Packages Section (Web Development only) */}
                {detail && detail.packages && (
                  <>
                    <p className="svm__section-label">Pilihan Paket</p>
                    <div className="svm__packages">
                      {detail.packages.map((pkg) => (
                        <div className="svm__package" key={pkg.id}>
                          <div className="svm__package-header">
                            <div>
                              <h3 className="svm__package-name">{pkg.name}</h3>
                              <p className="svm__package-subtitle">{pkg.subtitle}</p>
                            </div>
                            <div className="svm__package-price">{pkg.price}</div>
                          </div>

                          <div className="svm__package-body">
                            {/* Features */}
                            <div className="svm__package-section">
                              <p className="svm__package-section-label">Fitur:</p>
                              <ul className="svm__package-list">
                                {pkg.features.map((feature, i) => (
                                  <li key={i}>
                                    <span className="svm__package-bullet">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Includes */}
                            <div className="svm__package-section">
                              <p className="svm__package-section-label">Include:</p>
                              <ul className="svm__package-list">
                                {pkg.includes.map((item, i) => (
                                  <li key={i}>
                                    <span className="svm__package-bullet">✓</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Excludes */}
                            {pkg.excludes.length > 0 && (
                              <div className="svm__package-section">
                                <p className="svm__package-section-label">Exclude:</p>
                                <ul className="svm__package-list">
                                  {pkg.excludes.map((item, i) => (
                                    <li key={i}>
                                      <span className="svm__package-bullet">✗</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Add-ons Section (Web Development only) */}
                {detail && detail.addOns && (
                  <>
                    <p className="svm__section-label">Add-on Services</p>
                    <div className="svm__addons">
                      {detail.addOns.map((addon, i) => (
                        <div className="svm__addon" key={i}>
                          <span className="svm__addon-name">{addon.name}</span>
                          <span className="svm__addon-price">{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Note Section */}
                {detail && detail.note && (
                  <div className="svm__note">
                    <p className="svm__note-label">💡 Catatan:</p>
                    <p className="svm__note-text">{detail.note}</p>
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
                    <p className="svm__section-label">Our process</p>
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
            Ready to bring your vision to life? Let's discuss your project.
          </p>
          <a href="mailto:hello@braussnetworks.com" className="svm__cta">
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