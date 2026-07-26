"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroContent.module.css";

const SKILLS = ["PYTHON", "JAVA", "HTML", "CSS", "SQL"];

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Badge slides down
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
      );

      // Name entrance
      tl.fromTo(
        nameRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        "-=0.4"
      );

      // Subheading
      tl.fromTo(
        subheadingRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Skills pills stagger
      if (pillsRef.current) {
        const pills = pillsRef.current.children;
        tl.fromTo(
          pillsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          "-=0.4"
        );
        tl.fromTo(
          pills,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.1"
        );
      }

      // Actions row
      tl.fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
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

        {/* Main Name */}
        <h1 ref={nameRef} className={styles.name}>
          BALA BHARGAV
        </h1>

        {/* Subheading */}
        <p ref={subheadingRef} className={styles.subheading}>
          SOFTWARE ENGINEER - FULL STACK DEVELOPER
        </p>

        {/* Skills Pills */}
        <div ref={pillsRef} className={styles.pillsContainer}>
          {SKILLS.map((skill) => (
            <span key={skill} className={styles.pill}>
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div ref={actionsRef} className={styles.actionsContainer}>
          <a href="#projects">
            <button className={styles.btnPrimary}>VIEW PROJECTS</button>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkSecondary}
          >
            GITHUB &gt;
          </a>
        </div>
      </div>
    </div>
  );
}
