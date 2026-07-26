"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Oral Cancer Detection System",
    description:
      "AI-powered web application using Python, Flask, and PyTorch to detect oral cancer from clinical images using CNN models like EfficientNetV2 and ConvNeXt. Integrated Grad-CAM for explainable predictions, automated PDF reports, and SMTP-based email delivery.",
    tags: ["Python", "Flask", "PyTorch", "AI/ML", "Grad-CAM"],
    image: "/images/project-cancer.png",
    github: "https://github.com/BalaBhargav329",
  },
  {
    title: "Real-Time Number Plate Scanner",
    description:
      "Real-time number plate recognition system using Python, OpenCV, and EasyOCR to extract vehicle numbers from webcam and image inputs. Integrated Flask, Streamlit, and Backendless to match data with a database and generate downloadable PDF reports.",
    tags: ["Python", "OpenCV", "EasyOCR", "Flask", "Streamlit"],
    image: "/images/project-plate.png",
    github: "https://github.com/BalaBhargav329",
  },
  {
    title: "Speech Recognition Website",
    description:
      "Real-time speech-to-text web application using HTML, CSS, JavaScript, and the Web Speech API for accurate browser-based voice recognition. Features live voice transcription with a responsive, interactive user interface.",
    tags: ["HTML", "CSS", "JavaScript", "Web Speech API"],
    image: "/images/project-speech.png",
    github: "https://github.com/BalaBhargav329",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(
          `.${styles.projectCard}`
        );
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="projects">
      <div className={styles.container}>
        <div ref={headingRef} className={styles.heading}>
          <div className={styles.decorativeLine} />
          <span className={styles.tag}>Selected Portfolio</span>
          <h2 className={styles.title}>
            Featured <span className="text-gradient">Works</span>
          </h2>
        </div>

        <div ref={cardsRef} className={styles.grid}>
          {PROJECTS.map((project) => (
            <div key={project.title} className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={340}
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

