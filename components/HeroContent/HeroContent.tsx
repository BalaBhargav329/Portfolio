"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroContent.module.css";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const nameText = "BALA BHARGAV";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Badge slides down
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
      );

      // Name letter by letter animation
      if (nameRef.current) {
        gsap.set(nameRef.current, { opacity: 1 }); // reveal container
        const letters = nameRef.current.children;
        tl.fromTo(
          letters,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          "-=0.4"
        );
      }

      // Subheading
      tl.fromTo(
        subheadingRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      // Actions (Buttons)
      tl.fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
      
      // Social Icons
      tl.fromTo(
        iconsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        {/* Open to Work Badge */}
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeDot} />
          OPEN TO WORK
        </div>

        {/* Main Name (Letter by Letter) */}
        <h1 ref={nameRef} className={styles.name}>
          {nameText.split("").map((char, index) => (
            <span key={index} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p ref={subheadingRef} className={styles.subheading}>
          SOFTWARE ENGINEER - FULL STACK DEVELOPER
        </p>

        {/* Actions Row */}
        <div className={styles.actionsRow}>
          <div ref={actionsRef} className={styles.actionsContainer}>
            <a href="#projects">
              <button className={styles.btnPrimary}>EXPLORE WORKS</button>
            </a>
            <a href="/Bala_Bhargav_CV.pdf" target="_blank" rel="noopener noreferrer">
              <button className={styles.btnSecondary}>DOWNLOAD CV</button>
            </a>
          </div>

          <div ref={iconsRef} className={styles.socialIcons}>
            <a href="https://github.com/BalaBhargav329" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

