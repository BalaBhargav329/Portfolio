"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import HeroContent from "@/components/HeroContent/HeroContent";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import styles from "./VideoIntro.module.css";

export default function VideoIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const soundHintRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // ── Entrance Animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Video fades in fast — same time as hero content
      tl.fromTo(
        bgVideoRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Overlay and gradients — appear with video
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.6"
      );

      // Controls appear quickly
      tl.fromTo(
        controlsRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // â”€â”€ Auto-hide sound hint â”€â”€
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSoundHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // â”€â”€ Hide sound hint when unmuted â”€â”€
  useEffect(() => {
    if (!isMuted) {
      setShowSoundHint(false);
    }
  }, [isMuted]);

  // â”€â”€ Auto-Pause when out of view (Stops sound when scrolling away) â”€â”€
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!bgVideoRef.current) return;
          
          if (entry.isIntersecting) {
            // Play video if it comes back into view (and wasn't manually paused)
            if (isPlaying) {
              bgVideoRef.current.play().catch(() => {});
            }
          } else {
            // Pause video when out of view to stop sound and save battery
            bgVideoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  // â”€â”€ Play/Pause â”€â”€
  const togglePlay = useCallback(() => {
    const bgVid = bgVideoRef.current;
    if (!bgVid) return;

    if (isPlaying) {
      bgVid.pause();
    } else {
      bgVid.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // â”€â”€ Mute/Unmute â”€â”€
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      // Manually update DOM immediately to prevent React reconciliation stutter/lag
      if (bgVideoRef.current) {
        bgVideoRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* â”€â”€ Background Ambient Video â”€â”€ */}
      <div className={styles.bgVideoWrapper}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted={isMuted} // Bound to state so React doesn't fight the DOM
          playsInline
          preload="auto"
        />
      </div>

      {/* â”€â”€ Gradient Overlays â”€â”€ */}
      <div ref={overlayRef} className={styles.gradientOverlay}>
        <div className={styles.gradientLeft} />
        <div className={styles.gradientBottom} />
        <div className={styles.gradientTop} />
      </div>

      {/* â”€â”€ Content Overlay â”€â”€ */}
      <HeroContent />

      {/* â”€â”€ Sound Hint Badge â”€â”€ */}
      <div
        ref={soundHintRef}
        className={`${styles.soundHint} ${
          showSoundHint ? styles.soundHintVisible : styles.soundHintHidden
        }`}
        onClick={toggleMute}
      >
        <span className={styles.soundHintDot} />
        <span>Tap for sound</span>
      </div>

      {/* â”€â”€ Controls â”€â”€ */}
      <div ref={controlsRef} className={styles.controls}>
        {/* Play/Pause */}
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>

        {/* Mute/Unmute */}
        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" opacity="0.3" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" opacity="0.3" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>

      {/* â”€â”€ Scroll Indicator â”€â”€ */}
      <ScrollIndicator />
    </section>
  );
}

