import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import { Link } from "react-router-dom";

const BRANDS = ['KacaCreative', 'IndoBizCorner', 'BaliArtisan', 'SaromaseCo', 'Merantau.com', 'PilarTrust'];

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`hr-root${mounted ? ' hr-root--in' : ''}`}>
      <section className="hr">

        {/* ── LEFT — text ── */}
        <div className="hr__left">

          <div className="hr__headline-block">
            <h1 className="hr__headline">
              <span className="hr__hl hr__hl--1">WE</span>
              <span className="hr__hl hr__hl--2">
                COM<span className="hr__hl-red">PLETE</span>
              </span>
              <span className="hr__hl hr__hl--3">YOUR</span>
              <span className="hr__hl hr__hl--4">
                <span className="hr__hl-outline">CREATIVE</span>
              </span>
              <span className="hr__hl hr__hl--5">IDEAS</span>
            </h1>
          </div>

          {/*
            ── MOBILE IMAGE BLOCK ──
            Shown only on ≤ 900px via CSS (display: none on desktop).
            Sits between headline and bottom copy so the layout reads:
            Headline → Image → Tagline + CTA
          */}
          <div className="hr__mobile-img">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&auto=format&fit=crop&crop=center"
              alt="Design work"
              className="hr__img"
              loading="eager"
            />
            <div className="hr__img-overlay" />
            <div className="hr__img-tag">
              <span className="hr__img-tag-no">001</span>
              <span className="hr__img-tag-name">Brand Identity</span>
            </div>

            {/* floating secondary — inside mobile img block */}
            <div className="hr__mobile-img-float">
              <img
                src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=85&auto=format&fit=crop&crop=center"
                alt="Product design"
                className="hr__img"
                loading="lazy"
              />
              <div className="hr__img-overlay" />
            </div>

            {/* cross deco */}
            <div className="hr__mobile-cross" aria-hidden="true">
              <span /><span />
            </div>
          </div>

          <div className="hr__bottom">
            <p className="hr__tagline">
              Oasic is a visionary design agency that breathes
              life into ideas and transforms them into
              extraordinary realities.
            </p>
            <div className="hr__actions">
  <Link to="/contact" className="hr__cta-primary">
    Let's talk
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 16L16 4M16 4H7M16 4v9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>

  <Link to="/projects" className="hr__cta-secondary">
    See work
  </Link>
</div>
          </div>

        </div>

        {/* ── RIGHT — desktop images only ── */}
        <div className="hr__right">
          <div className="hr__img-main">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&auto=format&fit=crop&crop=center"
              alt="Design work"
              className="hr__img"
              loading="eager"
            />
            <div className="hr__img-overlay" />
            <div className="hr__img-tag">
              <span className="hr__img-tag-no">001</span>
              <span className="hr__img-tag-name">Brand Identity</span>
            </div>
          </div>

          <div className="hr__img-float">
            <img
              src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=85&auto=format&fit=crop&crop=center"
              alt="Product design"
              className="hr__img"
              loading="lazy"
            />
            <div className="hr__img-overlay" />
          </div>

          <div className="hr__cross" aria-hidden="true">
            <span /><span />
          </div>
        </div>

      </section>

      {/* ── LOGOS STRIP ── */}
      {/* ── LOGOS STRIP ── */}
<div className="hr__logos">
  <span className="hr__logos-label">Trusted by</span>
  <div className="hr__logos-track">
    <div className="hr__logos-marquee">
      {[...BRANDS, ...BRANDS].map((b, i) => (
        <span key={i} className="hr__logos-item">
          {b}
          <span className="hr__logos-sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  </div>
</div>
    </div>
  );
};

export default Hero;