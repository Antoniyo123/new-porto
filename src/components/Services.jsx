import React, { useState, useRef, useEffect } from 'react';
import '../styles/Services.css';

const SERVICES = [
  {
    no: '01',
    title: 'LOGO & BRANDING',
    desc: 'Identity systems built to define and differentiate your brand across every touchpoint.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '02',
    title: 'WEB DESIGN',
    desc: 'With our commitment to creativity, innovation and order, we work closely with you to produce a website that fits your unique needs and vision.',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '03',
    title: 'MOBILE APP',
    desc: 'Native and cross-platform apps designed for clarity, speed, and real-world usability.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '04',
    title: 'ILLUSTRATION',
    desc: 'Custom illustrations that give your brand a distinct visual language and personality.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '05',
    title: 'DEVELOPMENT',
    desc: 'Fast, modern, production-ready builds. Clean code that scales with your business.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=380&q=80&auto=format&fit=crop',
  },
];

const TESTIMONIALS = [
  {
    name: 'Martin Rosser',
    role: 'CEO, Pentlar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: '"We are very happy to work with such an amazing team! Our working experience is great. They have a deep understanding of our brand vision and values, and are able to present them in creative and impressive designs."',
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Arkon Studio',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: '"The team transformed our entire brand identity in just a few weeks. Professional, creative, and incredibly detail-oriented. The results exceeded every expectation we had."',
  },
];

const Services = () => {
  const [active, setActive]       = useState(null);
  const [visible, setVisible]     = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setTestimonial(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setTestimonial(i => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[testimonial];

  return (
    <section
      className={`services${visible ? ' services--in' : ''}`}
      id="services"
      ref={ref}
    >
      {/* ── Header ── */}
      <div className="services__header">
        <div className="services__eyebrow">// OUR SERVICES</div>
        <h2 className="services__heading">OUR AREA OF SPECIALIZATION</h2>
      </div>

      {/* ── Service rows ── */}
      <div className="services__list">
        {SERVICES.map((s, i) => (
          <div
            key={s.no}
            className={`svc${active === i ? ' svc--active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {/* floating preview image — only visible on active */}
            <div className="svc__preview">
              <img src={s.img} alt={s.title} />
            </div>

            <div className="svc__inner">
              <h3 className="svc__title">{s.title}</h3>
              <span className="svc__no">{s.no}</span>
              <p className="svc__desc">{s.desc}</p>
              <div className="svc__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Testimonial ── */}
      <div className="testimonial">
        <div className="testimonial__person">
          <img className="testimonial__avatar" src={t.avatar} alt={t.name} />
          <div>
            <div className="testimonial__name">{t.name}</div>
            <div className="testimonial__role">{t.role}</div>
          </div>
          <div className="testimonial__nav">
            <button className="testimonial__btn" onClick={prev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="testimonial__btn" onClick={next} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="testimonial__quote-col">
          <span className="testimonial__mark" aria-hidden="true">"</span>
          <p className="testimonial__quote">{t.quote}</p>
        </div>
      </div>
    </section>
  );
};

export default Services;