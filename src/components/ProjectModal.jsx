import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ProjectModal.css';

const ProjectModal = ({ project, projects, currentIndex, onClose, onNavigate }) => {
  const [closing, setClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    setImgLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft'  && currentIndex > 0)                  onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) onNavigate(currentIndex + 1);
    };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [handleClose, currentIndex, projects.length, onNavigate]);

  if (!project) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  return (
    <div
      className={`pm-backdrop ${closing ? 'pm-backdrop--out' : ''}`}
      onClick={e => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div className="pm">

        {/* ── Left: image panel ── */}
        <div className="pm__visual">
          <div className={`pm__img-wrap ${imgLoaded ? 'pm__img-wrap--loaded' : ''}`}>
            <img
              src={project.img}
              alt={project.title}
              className="pm__img"
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Number badge */}
          <div className="pm__badge">
            <span className="pm__badge-no">{project.no}</span>
          </div>

          {/* Nav arrows on image */}
          <div className="pm__img-nav">
            <button
              className="pm__img-nav-btn"
              onClick={() => hasPrev && onNavigate(currentIndex - 1)}
              disabled={!hasPrev}
              aria-label="Previous project"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="pm__img-nav-count">
              {currentIndex + 1} / {projects.length}
            </span>
            <button
              className="pm__img-nav-btn"
              onClick={() => hasNext && onNavigate(currentIndex + 1)}
              disabled={!hasNext}
              aria-label="Next project"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Right: content panel ── */}
        <div className="pm__content">

          {/* Header */}
          <div className="pm__head">
            <div className="pm__head-meta">
              <span className="pm__cat">{project.category}</span>
              {project.client && (
                <>
                  <span className="pm__meta-pipe" />
                  <span className="pm__client">{project.client}</span>
                </>
              )}
            </div>
            <button className="pm__close" onClick={handleClose} aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Title */}
          <h2 className="pm__title">{project.title}</h2>

          {/* Rule */}
          <div className="pm__rule" />

          {/* Long description */}
          <p className="pm__desc">{project.longDesc || project.desc}</p>

          {/* Details grid */}
          <div className="pm__details">
            {project.details?.map((d) => (
              <div className="pm__detail" key={d.label}>
                <span className="pm__detail-label">{d.label}</span>
                <span className="pm__detail-value">{d.value}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {project.tags && (
            <div className="pm__tags">
              {project.tags.map(tag => (
                <span className="pm__tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="pm__foot">
            <a href={project.link || '#'} className="pm__cta">
              <span>View Live Project</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <span className="pm__foot-hint">ESC to close · ← → to navigate</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;