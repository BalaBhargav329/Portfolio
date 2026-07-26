"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Timeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  {
    year: "2022 — 2026",
    title: "B.Tech in Computer Science & Engineering",
    subtitle: "Kalasalingam Academy of Research and Education",
    location: "Virudhunagar, Tamil Nadu",
    detail: "CGPA: 7.71 / 10",
    type: "education" as const,
  },
  {
    year: "2020 — 2022",
    title: "Intermediate (MPC)",
    subtitle: "Narayana Junior College",
    location: "Andhra Pradesh",
    detail: "Percentage: 87%",
    type: "education" as const,
  },
  {
    year: "2019 — 2020",
    title: "Secondary School Certificate (SSC)",
    subtitle: "Nakshathra Em High School",
    location: "Andhra Pradesh",
    detail: "Percentage: 87%",
    type: "education" as const,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animated line draws on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        }
      );

      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(
          `.${styles.timelineItem}`
        );
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="experience">
      <div className={styles.container}>
        <div ref={headingRef} className={styles.heading}>
          <div className={styles.decorativeLine} />
          <span className={styles.tag}>Education & Experience</span>
          <h2 className={styles.title}>
            My <span className={styles.titleAccent}>Journey</span>
          </h2>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          <div ref={lineRef} className={styles.timelineLine} />

          {TIMELINE_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.itemLeft : styles.itemRight
              }`}
            >
              <div className={styles.timelineDot}>
                <div className={styles.dotInner} />
              </div>

              <div className={styles.timelineCard}>
                <span className={styles.cardYear}>{item.year}</span>
                <span
                  className={`${styles.cardType} ${
                    item.type === "experience"
                      ? styles.cardTypeExperience
                      : ""
                  }`}
                >
                  {item.type === "education" ? "Education" : "Project"}
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>
                {item.location && (
                  <p className={styles.cardLocation}>{item.location}</p>
                )}
                <p className={styles.cardDetail}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
