import { useRef, useEffect, useState } from 'react'
import '../styles/About.css'

const STATS = [
  { num: '5+',  label: 'Years of craft'   },
  { num: '80+', label: 'Projects shipped' },
  { num: '3',   label: 'Design awards'    },
]

const About = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.04 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className={`ab__section${visible ? ' ab__section--in' : ''}`}
    >

      {/* ── Eyebrow ── */}
      <p className="ab__eyebrow">// About us</p>

      {/* ── Headline ── */}
      <h2 className="ab__headline">
        We are a<br />
        <em>creative</em>{' '}
        <span className="ab__outline">studio</span>
      </h2>

      {/* ── Grid ── */}
      <div className="ab__grid">

        {/* Photo */}
        <div className="ab__photo-wrap">

          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop&crop=faces"
            alt="Studio founder"
            className="ab__photo"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="ab__content">

          <p className="ab__body">
            LXY Creative is a Jakarta-based studio founded in 2020. From
            early-stage startups to established companies, we partner with
            clients who care deeply about the details.{' '}
            <strong>
              We don't just make things look good — we make them work beautifully.
            </strong>
          </p>

          {/* Stats */}
          <div className="ab__stats">
            {STATS.map(s => (
              <div key={s.label} className="ab__stat">
                <span className="ab__stat-num">{s.num}</span>
                <span className="ab__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="mailto:hello@lxy.co" className="ab__cta">
            Start a project
            <span className="ab__cta-arrow">↗</span>
          </a>

        </div>
      </div>

    </section>
  )
}

export default About