import { useRef, useEffect, useState } from 'react'
import '../styles/About.css'

const STATS = [
  { num: '3+',  label: 'Years Experience'   },
  { num: '50+', label: 'Projects Delivered' },
  { num: '50+',   label: 'Happy Clients'    },
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
      <p className="ab__eyebrow">// About Brauss</p>

      {/* ── Headline ── */}
      <h2 className="ab__headline">
        We are a<br />
        <em>creative</em>{' '}
        <span className="ab__outline">ecosystem</span>
      </h2>

      {/* ── Grid ── */}
      <div className="ab__grid">

        {/* Photo - Team/Agency workspace */}
        <div className="ab__photo-wrap">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop"
            alt="Brauss Networks creative team"
            className="ab__photo"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="ab__content">

          <p className="ab__body">
            LXY Creative is a full-service creative agency specializing in 
            web development, illustration, motion graphics, and photography. 
            From concept to execution, we transform ideas into stunning visual 
            experiences.{' '}
            <strong>
              We don't just create content — we craft stories that connect, 
              engage, and inspire action.
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
          <a href="mailto:hello@braussnetworks.com" className="ab__cta">
            Start a project
            <span className="ab__cta-arrow">↗</span>
          </a>

        </div>
      </div>

    </section>
  )
}

export default About