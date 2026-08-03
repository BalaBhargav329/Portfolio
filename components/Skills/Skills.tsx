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
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // 1. Card container glides up smoothly
      tl.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // 2. Header items (titles, number) fade up
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
          "-=0.5"
        );
      }

      // 3. Skill categories stagger up sequentially
      if (gridRef.current) {
        const categories = gridRef.current.children;
        tl.fromTo(
          categories,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        );

        // 4. Individual pills pop in elegantly
        Array.from(categories).forEach((cat) => {
          const pills = cat.querySelectorAll("." + styles.pill);
          tl.fromTo(
            pills,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)" },
            "-=0.6" // Heavily overlap so it flows beautifully
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="skills">
      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <div ref={headerRef} className={styles.headerRow}>
            <div className={styles.headerTitles}>
              <span className={styles.subheading}>EXPERTISE</span>
              <h2 className={styles.mainTitle}>Technical <span className="text-gradient">Arsenal</span></h2>
            </div>

          </div>

          <div ref={gridRef} className={styles.skillsGrid}>
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

