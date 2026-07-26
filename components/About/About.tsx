"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const meRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<HTMLDivElement>(null);

  const headingText = "ABOUT";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Triggers when the section is nicely in view
        },
      });

      // Heading animation (Words)
      if (headingRef.current && meRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        tl.fromTo(
          meRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Text blocks stagger in smoothly
      if (textBlocksRef.current) {
        const blocks = textBlocksRef.current.children;
        tl.fromTo(
          blocks,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className={styles.container}>
        
        <div className={styles.leftColumn}>
          <h2 className={styles.heading}>
            <div ref={headingRef} className="text-gradient">
              ABOUT
            </div>
            <div ref={meRef} className={`${styles.headingHighlight} text-gradient`}>
              ME
            </div>
          </h2>
        </div>

        <div className={styles.rightColumn} ref={textBlocksRef}>
          <div className={styles.textBlock}>
            <h3 className={styles.subheading}>01 // PASSION</h3>
            <p className={styles.paragraph}>
              I am a Full Stack Developer and AI Researcher deeply passionate about bridging artificial intelligence with elegant, practical web applications.
            </p>
          </div>
          
          <div className={styles.textBlock}>
            <h3 className={styles.subheading}>02 // ADAPTABILITY</h3>
            <p className={styles.paragraph}>
              I thrive in dynamic, fast-paced environments. Whether solving complex backend architectural challenges or fine-tuning frontend performance, I adapt quickly to deliver seamless results.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3 className={styles.subheading}>03 // CONTINUOUS LEARNING</h3>
            <p className={styles.paragraph}>
              The technology landscape evolves rapidly, and so do I. I am constantly mastering new frameworks, algorithms, and real-time computer vision tools to build the future of digital experiences.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

