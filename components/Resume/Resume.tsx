"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Resume.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Section label entrance
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      // CTA panel slides in from left
      if (ctaRef.current) {
        const items = ctaRef.current.children;
        tl.fromTo(
          items,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Preview card scales in from right
      if (previewRef.current) {
        tl.fromTo(
          previewRef.current,
          { x: 40, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        );
      }

      // Stats bar stagger
      if (statsRef.current) {
        const stats = statsRef.current.children;
        tl.fromTo(
          stats,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="resume">
      {/* Background decorative grid */}
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Section Label */}
        <div className={styles.sectionLabel} ref={labelRef}>
          <div className={styles.decorativeLine} />
          <span className={styles.tag}>Curriculum Vitae</span>
          <h2 className={styles.sectionTitle}>
            My <span className={styles.sectionTitleAccent}>Resume</span>
          </h2>
        </div>

        {/* Two-Column Content */}
        <div className={styles.contentGrid}>
          {/* Left: CTA Panel */}
          <div className={styles.ctaPanel} ref={ctaRef}>
            <h3 className={styles.ctaHeading}>
              Crafting Digital
              <span className={styles.ctaHeadingAccent}>Experiences</span>
            </h3>

            <p className={styles.ctaDescription}>
              Full-Stack Developer & AI Researcher with expertise in building
              scalable web applications, immersive interfaces, and intelligent systems.
              Take a look at my qualifications and professional journey.
            </p>

            {/* Highlight Items */}
            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>⚡</div>
                <span className={styles.highlightText}>
                  <span className={styles.highlightLabel}>Full-Stack Development</span> — React, Next.js, Node.js, Python
                </span>
              </div>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>🧠</div>
                <span className={styles.highlightText}>
                  <span className={styles.highlightLabel}>AI & Machine Learning</span> — Computer Vision, NLP, Deep Learning
                </span>
              </div>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>🎨</div>
                <span className={styles.highlightText}>
                  <span className={styles.highlightLabel}>Creative Technologist</span> — UI/UX, Motion Design, 3D Web
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.buttonsRow}>
              <div className={styles.downloadWrapper}>
                <div className={styles.pulseRing} />
                <a
                  href="/Bala_Bhargav_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                  id="resume-download-cv"
                >
                  <span className={styles.downloadIconBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </span>
                  <span>Download CV</span>
                </a>
              </div>

              <a
                href="/Bala_Bhargav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
                id="resume-view-fullscreen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>View Full Screen</span>
              </a>
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className={styles.previewCard} ref={previewRef}>
            {/* Mock browser bar */}
            <div className={styles.browserBar}>
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
              <span className={styles.browserUrlBar}>Bala_Bhargav_Resume.pdf</span>
            </div>

            {/* PDF Preview */}
            <div className={styles.previewBody}>
              <div className={styles.previewGlowOrb} />
              <iframe
                className={styles.pdfEmbed}
                src="/Bala_Bhargav_Resume.pdf"
                title="Resume Preview"
              />
              <div className={styles.previewFade} />

              {/* File badge */}
              <div className={styles.fileBadge}>
                <span className={styles.fileBadgeIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
                  </svg>
                </span>
                <span className={styles.fileBadgeName}>Bala_Bhargav_Resume.pdf</span>
                <span className={styles.fileBadgeSize}>• 272 KB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar} ref={statsRef}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>2+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Tech Stacks</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>∞</span>
            <span className={styles.statLabel}>Passion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
