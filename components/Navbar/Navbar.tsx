"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  // â”€â”€ Scroll handler â”€â”€
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Determine active section
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // â”€â”€ Entrance animation â”€â”€
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, "#hero")}
        >
          BB<span className={styles.logoDot}>.</span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.link} ${
                  activeSection === link.href.slice(1) ? styles.linkActive : ""
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className={`${styles.hamburger} ${
            mobileOpen ? styles.hamburgerOpen : ""
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.mobileLink} ${
                  activeSection === link.href.slice(1)
                    ? styles.mobileLinkActive
                    : ""
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

