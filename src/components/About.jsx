import React, { useRef, useEffect, useState } from 'react';
import '../styles/About.css';

const STATS = [
  { num: '5+',  label: 'Years of craft'   },
  { num: '80+', label: 'Projects shipped' },
  { num: '3',   label: 'Design awards'    },
];

const VALUES = [
  { idx: '01', name: 'Craft',     desc: 'Obsessive attention to every detail'  },
  { idx: '02', name: 'Clarity',   desc: 'Simple, purposeful solutions'         },
  { idx: '03', name: 'Intention', desc: 'Nothing is left to chance'            },
];

const MARQUEE_WORDS = [
  'Branding','UI/UX','Web Design','Motion',
  'Creative Direction','Strategy','Identity','Development',
];
const MARQUEE_REPEATED = [...MARQUEE_WORDS,...MARQUEE_WORDS,
                          ...MARQUEE_WORDS,...MARQUEE_WORDS];

const About = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`about${visible ? ' about--in' : ''}`}
      id="about"
      ref={ref}
    >

      {/* ── Top eyebrow rule ── */}
      <div className="about__top-rule">
        <div className="about__top-eyebrow">
          <span className="about__top-dot" />
          About the studio
        </div>
        <div className="about__top-right">Jakarta, Indonesia</div>
      </div>

      {/* ══ GIANT HEADLINE ══ */}
      <div className="about__hero-hl">
        <span className="about__index" aria-hidden="true">§ 01</span>
        <h2 className="about__h1">
          <span className="about__h1-line">We craft</span>
          <span className="about__h1-line about__h1-line--italic">brands that</span>
          <span className="about__h1-line about__h1-line--outline">endure.</span>
        </h2>
        <div className="about__hl-foot">
          <p className="about__hl-foot-text">
            A Jakarta-based creative studio working at the intersection of strategy,
            design, and technology — helping brands find their voice.
          </p>
          <span className="about__hl-foot-loc">Est. 2020</span>
        </div>
      </div>

      {/* ══ BODY: asymmetric photo + content ══ */}
      <div className="about__body">

        {/* Photo column — 38% */}
        <div className="about__photo-col">
          <img
            className="about__photo"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85&auto=format&fit=crop&crop=faces"
            alt="Studio founder"
            loading="lazy"
          />
          <div className="about__est">
            <span className="about__est-lbl">Est.</span>
            <span className="about__est-yr">2020</span>
          </div>
          <div className="about__photo-caption">LXY Creative Studio</div>
        </div>

        {/* Content column — 62% */}
        <div className="about__content-col">

          <div className="about__copy">
            {/* Pullquote */}
            <p className="about__quote">
              "Every pixel, every word, every interaction is intentional —
              and nothing is left to chance."
            </p>
            <p className="about__p">
              LXY Creative is a Jakarta-based studio founded in 2020. From
              early-stage startups to established companies, we partner with
              clients who care deeply about the details.
            </p>
            <p className="about__p">
              We don't just make things look good. We make them work —
              beautifully, consistently, and with purpose.
            </p>

            {/* Values */}
            <div className="about__values-label">What we believe</div>
            <div className="about__values-list">
              {VALUES.map(v => (
                <div key={v.name} className="about__value">
                  <span className="about__value-idx">{v.idx}</span>
                  <span className="about__value-name">{v.name}</span>
                  <span className="about__value-desc">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="about__stats">
            {STATS.map(s => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-num">{s.num}</span>
                <span className="about__stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="about__cta-strip">
            <p className="about__cta-phrase">
              Ready to make something <span>great?</span>
            </p>
            <div className="about__cta-btns">
              <a href="mailto:hello@lxy.co" className="about__btn-primary">
                <span>Start a project</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/about" className="about__btn-ghost">Our story</a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="about__marquee" aria-hidden="true">
        <div className="about__marquee-track">
          {MARQUEE_REPEATED.map((w, i) => (
            <span key={i} className="about__marquee-item">
              {w}<span className="about__marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;