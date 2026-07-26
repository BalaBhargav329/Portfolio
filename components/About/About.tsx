"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <div className={styles.headerRow}>
            <div className={styles.headerTitles}>
              <span className={styles.subheading}>ABOUT - PROFILE</span>
              <h2 className={styles.mainTitle}>WHO I AM</h2>
            </div>
            <div className={styles.largeNumber}>01</div>
          </div>

          <div className={styles.bodyContent}>
            <p className={styles.paragraph}>
              Computer Science Engineering student with a{" "}
              <span className={styles.highlight}>strong foundation</span> in
              software development and problem-solving. Currently holding a{" "}
              <span className={styles.highlight}>7.71 CGPA</span> at
              Kalasalingam Academy. Specialized in bridging the gap between AI
              research and practical applications, with{" "}
              <span className={styles.highlight}>3+ projects</span> built
              including real-time computer vision tools. Highly motivated to
              quickly learn new technologies and turn complex challenges into{" "}
              <span className={styles.highlight}>
                elegant, user-friendly experiences
              </span>
              .
            </p>
          </div>

          <div className={styles.pillsContainer}>
            <span className={styles.pill}>FULL STACK</span>
            <span className={styles.pill}>AI RESEARCH</span>
            <span className={styles.pill}>PROBLEM SOLVER</span>
            <span className={styles.pill}>WEB DEVELOPMENT</span>
            <span className={styles.pill}>SOFTWARE DEV</span>
          </div>
        </div>
      </div>
    </section>
  );
}
