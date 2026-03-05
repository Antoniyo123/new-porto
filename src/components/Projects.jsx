import React, { useState, useRef, useEffect } from 'react';
import '../styles/Projects.css';
import ProjectModal from './ProjectModal';

/* ─────────────────────────────────────────────
   Projects — LXY Creative Studio
   Layout:
     Row A (62/38) — full-bleed image cells,
     gate list below for remaining projects.
───────────────────────────────────────────── */

const FEATURED = 2;

const projects = [
  {
    no: '01', title: 'Verdant', category: 'Branding · Web', year: '2025',
    client: 'Verdant Co.',
    desc: 'A sustainable lifestyle brand identity built around organic forms and earthy tones.',
    longDesc: 'Verdant is a full-scale brand identity project for an eco-conscious lifestyle company. The design language revolves around organic geometric forms, a restrained earthy palette, and a typographic system that communicates warmth without sacrificing authority.',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85&auto=format&fit=crop',
    details: [{ label: 'Role', value: 'Brand + Web' }, { label: 'Duration', value: '8 Weeks' }, { label: 'Year', value: '2025' }],
    tags: ['Branding', 'Logo Design', 'Web Design', 'Figma', 'Next.js'],
    link: '#',
  },
  {
    no: '02', title: 'Forma', category: 'UI/UX · Design', year: '2025',
    client: 'Forma Labs',
    desc: 'Minimal product design system for a B2B SaaS analytics platform.',
    longDesc: 'Forma is a comprehensive design system built for a B2B SaaS analytics platform. The system covers foundations, 80+ components, and interaction patterns — documented in Storybook and delivered as a Figma library.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=85&auto=format&fit=crop',
    details: [{ label: 'Role', value: 'UI/UX Design' }, { label: 'Duration', value: '12 Weeks' }, { label: 'Year', value: '2025' }],
    tags: ['Design System', 'UI/UX', 'Figma', 'Storybook'],
    link: '#',
  },
  {
    no: '03', title: 'Kōdo', category: 'Identity · Motion', year: '2024',
    client: 'Kōdo Inc.',
    desc: 'Japanese-inspired tech brand identity with motion guidelines.',
    longDesc: 'Kōdo is a Tokyo-based software consultancy that needed an identity rooted in precision and cultural depth. Motion guidelines were developed in After Effects and exported as Lottie files.',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=85&auto=format&fit=crop',
    details: [{ label: 'Role', value: 'Identity + Motion' }, { label: 'Duration', value: '6 Weeks' }, { label: 'Year', value: '2024' }],
    tags: ['Identity', 'Motion Design', 'After Effects', 'Lottie'],
    link: '#',
  },
  {
    no: '04', title: 'Solus', category: 'Web · Development', year: '2024',
    client: 'Solus Finance',
    desc: 'High-performance marketing site for a seed-stage fintech startup.',
    longDesc: 'Solus is a seed-stage fintech startup that needed a high-performance marketing site. Built with Next.js on Vercel, achieving a Lighthouse score of 99/100.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&auto=format&fit=crop',
    details: [{ label: 'Role', value: 'Design + Dev' }, { label: 'Duration', value: '5 Weeks' }, { label: 'Year', value: '2024' }],
    tags: ['Web Design', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: '#',
  },
];

const Arrow = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Image cell ── */
const PjCell = ({ project, size = 'main', onOpen }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pj-cell pj-cell--${size}${vis ? ' pj-cell--in' : ''}`}
      onClick={onOpen}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
      aria-label={`Open ${project.title} case study`}
    >
      <img className="pj-cell__img" src={project.img} alt={project.title} loading="lazy"/>
      <div className="pj-cell__grad"/>
      <span className="pj-cell__ghost" aria-hidden="true">{project.no}</span>
      <div className="pj-cell__body">
        <div className="pj-cell__top">
          <span className="pj-cell__no">{project.no}</span>
          <span className="pj-cell__cat">{project.category}</span>
          <span className="pj-cell__yr">{project.year}</span>
        </div>
        <div className="pj-cell__bottom">
          <span className="pj-cell__title">{project.title}</span>
          <div className="pj-cell__foot">
            <p className="pj-cell__desc">{project.desc}</p>
            <button
              className="pj-cell__cta"
              onClick={e => { e.stopPropagation(); onOpen(); }}
            >
              Open case <Arrow/>
            </button>
          </div>
        </div>
      </div>
      <div className="pj-cell__accent"/>
    </div>
  );
};

/* ── Gate row ── */
const PjGate = ({ project, onOpen }) => (
  <div
    className="pj-gate"
    onClick={onOpen}
    role="button" tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onOpen()}
  >
    <span className="pj-gate__no">{project.no}</span>
    <span className="pj-gate__title">{project.title}</span>
    <span className="pj-gate__cat">{project.category}</span>
    <span className="pj-gate__yr">{project.year}</span>
    <span className="pj-gate__arr" aria-hidden="true"><Arrow/></span>
  </div>
);

/* ═══════════════ MAIN ═══════════════ */
const Projects = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const featured = projects.slice(0, FEATURED);
  const gated    = projects.slice(FEATURED);

  return (
    <>
      <section
        className={`projects${vis ? ' projects--in' : ''}`}
        id="projects" ref={ref}
      >

        {/* ── Header ── */}
        <div className="projects__header">
          <div className="projects__header-top">
            <div className="projects__header-left">
              <div className="projects__eyebrow">
                <span className="projects__eyebrow-dot"/>
                Selected Work
              </div>
              <h2 className="projects__h1">
                Our<br /><em>Projects</em>
              </h2>
            </div>
            <div className="projects__header-right">
              <span className="projects__count">01 — 0{projects.length}</span>
              <a href="/work" className="projects__viewall">
                View all <Arrow/>
              </a>
            </div>
          </div>
        </div>

        {/* ── Featured grid: row A 62/38 ── */}
        <div className="projects__grid">
          <div className="pj-row pj-row--a">
            <PjCell project={featured[0]} size="main" onOpen={() => setModalIndex(0)}/>
            <PjCell project={featured[1]} size="side" onOpen={() => setModalIndex(1)}/>
          </div>
        </div>

        {/* ── Gate: remaining projects ── */}
        <div className="projects__gate-wrap">
          <div className="projects__gate-head">More work</div>

          {gated.map((p, i) => (
            <PjGate key={p.no} project={p} onOpen={() => setModalIndex(i + FEATURED)}/>
          ))}

          <div className="projects__gate-cta">
            <p className="projects__gate-phrase">
              Want to see <span>everything?</span>
            </p>
            <a href="/work" className="projects__gate-btn">
              <span>View all {projects.length} projects</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </section>

      {modalIndex !== null && (
        <ProjectModal
          project={projects[modalIndex]}
          projects={projects}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={i => setModalIndex(i)}
        />
      )}
    </>
  );
};

export default Projects;
export { projects };