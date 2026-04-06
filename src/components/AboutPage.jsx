import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import profilImg from '../assets/profil.jpg'
import '../styles/AboutPage.css'

/* ── Data ── */
const HERO_STRIP = [
  { label: 'Founded',  val: '2020',        green: false },
  { label: 'Based in', val: 'Jakarta, ID', green: false },
  { label: 'Clients',  val: '50+ brands',  green: false },
  { label: 'Status',   val: 'Available',   green: true  },
]

const STATS = [
  { num: '5+',   label: 'Years of craft'   },
  { num: '80+',  label: 'Projects shipped' },
  { num: '3',    label: 'Design awards'    },
]

const VALUES = [
  {
    no: '01', name: 'Craft over speed',
    desc: 'We take the time to get it genuinely right, not just done.',
  },
  {
    no: '02', name: 'Design with purpose',
    desc: 'Every pixel and word serves a reason beyond aesthetics.',
  },
  {
    no: '03', name: 'Radical transparency',
    desc: 'No black boxes — clients see every step of the process.',
  },
  {
    no: '04', name: 'Details that delight',
    desc: 'The micro-moments that make users stay and come back.',
  },
]

const TEAM = [
  {
    name: 'Alex Wirawan',
    role: 'Creative Director',
    bio: 'Leads strategy and visual direction. 8+ years in identity and brand systems across SEA and Europe.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&fit=crop&crop=face',
    socials: ['IG', 'LI'],
  },
  {
    name: 'Nia Kusuma',
    role: 'Lead Designer',
    bio: 'Shapes every touchpoint — from typographic systems to motion sequences and digital experiences.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&fit=crop&crop=face',
    socials: ['IG', 'BE'],
  },
  {
    name: 'Rio Santoso',
    role: 'Motion & Dev',
    bio: 'Bridges design and engineering. Turns concepts into polished, performant, production-ready builds.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face',
    socials: ['GH', 'TW'],
  },
]

const PROCESS = [
  {
    no: '01', name: 'Discover',
    desc: 'Deep-dive into your brand, users, market, and competition.',
  },
  {
    no: '02', name: 'Define',
    desc: 'Strategic framing — objectives, constraints, success metrics.',
  },
  {
    no: '03', name: 'Design',
    desc: 'Iterative creation from rough concepts to pixel-perfect output.',
  },
  {
    no: '04', name: 'Deliver',
    desc: 'Handoff, implementation support, and post-launch review.',
  },
]

/* ─────────────────────────────────── */

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`abt${mounted ? ' abt--in' : ''}`}>

      {/* ════ HERO ════ */}
      <header className="abt__hero">
        <Link to="/" className="abt__back">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
            <path d="M16 4L4 16M4 16h9M4 16V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>

        {/* Big title + intro side by side */}
        <div className="abt__hero-title-row">
          <h1 className="abt__hero-title">
            We are<br />
            LXY <em>Creative</em><br />
            <span className="abt__outline">Studio.</span>
          </h1>

          <div className="abt__hero-intro">
            <p>
              A Jakarta-based design studio built for founders, startups,
              and established brands who believe that great design is not
              decoration — it is strategy made visible.
            </p>
            <a href="mailto:alexjor1997@gmail.com" className="abt__hero-intro-cta">
              Start a conversation
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Info strip */}
        <div className="abt__hero-strip">
          {HERO_STRIP.map(item => (
            <div className="abt__hero-strip-item" key={item.label}>
              <span className="abt__hero-strip-label">{item.label}</span>
              <span className={`abt__hero-strip-val${item.green ? ' abt__hero-strip-val--green' : ''}`}>
                {item.green && <span className="abt__red-dot" style={{ background: '#4ade80' }} />}
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ════ STORY ════ */}
      <div className="abt__story">

        {/* Sticky photo */}
        <div className="abt__photo-col">
          <div className="abt__photo-wrap">
            <img
              className="abt__photo"
              src={profilImg}
              alt="Studio founder"
              loading="lazy"
            />
            <div className="abt__photo-badge">
              <span className="abt__photo-badge-label">Jakarta</span>
              <span className="abt__photo-badge-val">Est. 2020</span>
            </div>
          </div>
        </div>

        {/* Scrolling content */}
        <div className="abt__manifesto-col">

          {/* Manifesto text */}
          <div className="abt__manifesto">
            <p className="abt__label">Our story</p>
            <h2 className="abt__manifesto-title">
              We build things that<br />
              <em>outlast</em> the trend.
            </h2>
            <p className="abt__manifesto-body">
              LXY started in 2020 as a one-person studio with a single belief:
              that <strong>great design changes how people feel</strong> about
              a brand, a product, and ultimately themselves. Today we're a small,
              focused team working across identity, digital, and motion.
            </p>
            <p className="abt__manifesto-body">
              We're not the biggest studio in the room.
              We're <strong>intentionally small</strong> — because small means
              every project gets our full attention, our sharpest thinking,
              and our best craft.
            </p>
          </div>

          {/* Stats */}
          <div className="abt__stats">
            {STATS.map(s => (
              <div className="abt__stat" key={s.label}>
                <span className="abt__stat-num">{s.num}</span>
                <span className="abt__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ════ VALUES ════ */}
      <section className="abt__values">
        <div className="abt__values-header">
          <div>
            <p className="abt__label">What we believe</p>
            <h2 className="abt__values-title">
              Our<br /><em>principles.</em>
            </h2>
          </div>
          <p className="abt__values-desc">
            Four ideas that guide every decision we make — for ourselves
            and for our clients.
          </p>
        </div>

        {VALUES.map(v => (
          <div className="abt__value-item" key={v.no}>
            <span className="abt__value-no">{v.no}</span>
            <h3 className="abt__value-name">{v.name}</h3>
            <p className="abt__value-desc">{v.desc}</p>
          </div>
        ))}
      </section>

      {/* ════ TEAM ════ */}
      {/* <section className="abt__team">
        <div className="abt__team-header">
          <div>
            <p className="abt__label">The people</p>
            <h2 className="abt__team-title">
              Meet the<br /><em>team.</em>
            </h2>
          </div>
          <p className="abt__team-note">
            Small by design. Each person here owns their craft entirely —
            no account managers, no handoffs.
          </p>
        </div>

        <div className="abt__team-grid">
          {TEAM.map(m => (
            <div className="abt__member" key={m.name}>
              <div className="abt__member-img-wrap">
                <img
                  className="abt__member-img"
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                />
              </div>
              <div className="abt__member-body">
                <h3 className="abt__member-name">{m.name}</h3>
                <p className="abt__member-role">{m.role}</p>
                <p className="abt__member-bio">{m.bio}</p>
                <div className="abt__member-socials">
                  {m.socials.map(s => (
                    <a key={s} href="#" className="abt__member-social" aria-label={s}>{s}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ════ PROCESS ════ */}
      <section className="abt__process">
        <div className="abt__process-header">
          <div>
            <p className="abt__label">How we work</p>
            <h2 className="abt__process-title">
              Our<br /><em>process.</em>
            </h2>
          </div>
          <p className="abt__process-note">
            A repeatable framework shaped by years of iteration —
            transparent at every stage.
          </p>
        </div>

        {PROCESS.map(p => (
          <div className="abt__process-item" key={p.no}>
            <span className="abt__process-no">{p.no}</span>
            <h3 className="abt__process-name">{p.name}</h3>
            <p className="abt__process-desc">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* ════ BOTTOM CTA ════ */}
      <section className="abt__bottom">
        <div>
          <p className="abt__label">Let's collaborate</p>
          <h2 className="abt__bottom-title">
            Start a project<br />with <em>us.</em>
          </h2>
        </div>

        <div className="abt__bottom-right">
          <p className="abt__bottom-desc">
            Whether you're launching something new or rethinking what exists —
            we'd love to hear about it. Typical response time is under 24 hours.
          </p>
          <div className="abt__bottom-actions">
            <a href="mailto:hello@lxy.co" className="abt__bottom-btn">
              alexjor1997@gmail.com
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link to="/projects" className="abt__bottom-link">
              See our work ↗
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}