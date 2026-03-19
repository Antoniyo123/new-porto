import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/WorkPage.css'
import ProjectModal from './ProjectModal'

const ALL_PROJECTS = [
  {
    id: 1, number: '01', title: 'Brauss Networks',
    category: 'Branding / Identity', year: '2024',
    color: '#FF3C3C',
    description: 'Sistem identitas visual untuk brand streetwear generasi baru yang menggabungkan elemen cyber-punk dan tradisi batik modern.',
    tag: 'Featured',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 2, number: '02', title: 'KACA Kreative',
    category: 'Product Design', year: '2024',
    color: '#FFB830',
    description: 'Design system komprehensif untuk platform fintech dengan 300+ komponen dan aksesibilitas WCAG AAA.',
    tag: 'Award',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 3, number: '03', title: 'IndobizCorner',
    category: 'Web Experience', year: '2023',
    color: '#00C4AD',
    description: 'Pengalaman web imersif memetakan keanekaragaman hayati kepulauan Indonesia melalui visual data interaktif.',
    tag: 'Interactive',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 4, number: '04', title: 'BSI Coin',
    category: 'Motion / Film', year: '2023',
    color: '#A855F7',
    description: 'Sequence pembuka sinematik untuk studio animasi independen menggunakan teknik tipografi kinetik.',
    tag: 'Motion',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 5, number: '05', title: 'Reminder Dashoard IdobizCorner',
    category: 'Mobile UX', year: '2025',
    color: '#22c55e',
    description: 'Aplikasi wellness yang merancang ulang tracking kebiasaan dengan pendekatan berbasis konteks dan AI lokal.',
    tag: 'Launch',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 6, number: '06', title: 'SaromaseCo',
    category: 'Branding / Identity', year: '2023',
    color: '#FF3C3C',
    description: 'Rebranding menyeluruh untuk label rekaman indie — dari wordmark hingga sistem packaging vinyl.',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 7, number: '07', title: 'Viaje Website',
    category: 'Web Experience', year: '2022',
    color: '#00C4AD',
    description: 'Platform digital interaktif untuk dokumentasi fauna endemik Nusantara dengan visualisasi data spasial.',
    tag: 'Digital',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 8, number: '08', title: 'Merantau.com',
    category: 'Type Design', year: '2022',
    color: '#FFB830',
    description: 'Keluarga tipografi display terinspirasi huruf kayu pasar tradisional — tersedia dalam 6 weight.',
    tag: 'Type',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=840&h=560&fit=crop&q=80',
  },
  {
    id: 9, number: '09', title: 'PilarTrust',
    category: 'Product Design', year: '2025',
    color: '#FFB830',
    description: 'Dashboard analytics real-time untuk platform energi terbarukan — dark mode-first dengan 80+ komponen.',
    tag: 'Product',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=840&h=560&fit=crop&q=80',
  },
]

const FILTERS = ['All', 'Branding', 'Product', 'Digital', 'Motion', 'Type']

function getCount(f) {
  if (f === 'All') return ALL_PROJECTS.length
  return ALL_PROJECTS.filter(p =>
    p.category.toLowerCase().includes(f.toLowerCase()) ||
    p.tag.toLowerCase().includes(f.toLowerCase())
  ).length
}

export default function WorkPage() {
  const [filter,     setFilter]     = useState('All')
  const [mounted,    setMounted]    = useState(false)
  const [activeProj, setActiveProj] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const filtered = filter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p =>
        p.category.toLowerCase().includes(filter.toLowerCase()) ||
        p.tag.toLowerCase().includes(filter.toLowerCase())
      )

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

        {/* ── FILTER BAR ── */}
        <div className="wk__filter-bar">
          <div className="wk__filter-label">Filter</div>
          <div className="wk__filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`wk__filter-btn${filter === f ? ' wk__filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {f !== 'All' && (
                  <span className="wk__filter-count">{getCount(f)}</span>
                )}
              </button>
            ))}
          </div>
          <div className="wk__filter-total">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* ── GRID ── */}
        <main className="wk__grid">
          {filtered.map((proj, i) => (
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

      {/* Modal — outside main so no stacking context issues */}
      <ProjectModal project={activeProj} onClose={closeModal} />
    </>
  )
}