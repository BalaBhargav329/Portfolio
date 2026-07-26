"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "PROGRAMMING LANGUAGES",
    skills: ["Python", "Java", "SQL"],
  },
  {
    title: "WEB DEVELOPMENT",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "DEVELOPER TOOLS",
    skills: ["Git", "GitHub", "Google Colab", "VS Code"],
  },
  {
    title: "ACADEMIC & CONCEPTS",
    skills: [
      "Data Structures",
      "Operating Systems",
      "Object Oriented Programming",
    ],
  },
];

export default function Skills() {
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
    <section ref={sectionRef} className={styles.section} id="skills">
      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <div className={styles.headerRow}>
            <div className={styles.headerTitles}>
              <span className={styles.subheading}>ABOUT - ARSENAL</span>
              <h2 className={styles.mainTitle}>TECHNICAL SKILLS</h2>
            </div>
            <div className={styles.largeNumber}>02</div>
          </div>

          <div className={styles.skillsGrid}>
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className={styles.categoryGroup}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.pillsContainer}>
                  {category.skills.map((skill) => (
                    <span key={skill} className={styles.pill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
