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
                  download="Bala_Bhargav_Resume.pdf"
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
                src="/Bala_Bhargav_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit"
                title="Resume Preview"
              />
              <div className={styles.previewFade} />


            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
