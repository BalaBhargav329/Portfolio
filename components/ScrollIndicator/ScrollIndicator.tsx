"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ScrollIndicator.module.css";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Scroll to next section"
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className={styles.lineWrapper}>
        <div className={styles.line} />
      </div>
      <span className={styles.label}>Scroll</span>
    </div>
  );
}
