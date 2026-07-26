"use client";

import Navbar from "@/components/Navbar/Navbar";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import Timeline from "@/components/Timeline/Timeline";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoIntro />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
