"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

interface Particle {
  baseX: number;
  baseY: number;
  baseZ: number;
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
  baseOpacity: number;
  opacityFreq: number;
  opacityPhase: number;
}

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Circular particle texture ──
    const canvas2d = document.createElement("canvas");
    canvas2d.width = 64;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.6)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas2d);

    // ── Particle Configuration ──
    const PARTICLE_COUNT = 120;
    const particles: Particle[] = [];
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);

    const warmOrange = new THREE.Color(0xe8863a);
    const brightOrange = new THREE.Color(0xff9f4a);
    const warmWhite = new THREE.Color(0xfff5e6);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        ampX: 0.3 + Math.random() * 1.2,
        ampY: 0.3 + Math.random() * 1.0,
        freqX: 0.1 + Math.random() * 0.3,
        freqY: 0.1 + Math.random() * 0.25,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        baseOpacity: 0.2 + Math.random() * 0.6,
        opacityFreq: 0.05 + Math.random() * 0.15,
        opacityPhase: Math.random() * Math.PI * 2,
      });

      // Color: 70% warm orange tones, 30% warm white
      const colorRoll = Math.random();
      let color: THREE.Color;
      if (colorRoll < 0.4) {
        color = warmOrange.clone().lerp(brightOrange, Math.random());
      } else if (colorRoll < 0.7) {
        color = brightOrange.clone().lerp(warmWhite, Math.random() * 0.5);
      } else {
        color = warmWhite.clone();
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.5 + Math.random() * 3.5;
      opacities[i] = particles[i].baseOpacity;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // ── Custom shader for per-particle size and opacity ──
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      varying float vOpacity;
      uniform float uTime;
      
      void main() {
        vColor = color;
        float pulse = 0.85 + 0.15 * sin(uTime * 0.5 + position.x * 0.3);
        vOpacity = pulse;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (180.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vOpacity;
      uniform sampler2D uTexture;
      
      void main() {
        vec4 texColor = texture2D(uTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, texColor.a * vOpacity * 0.7);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: particleTexture },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Animation Loop ──
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      // Update particle positions with sine-wave oscillation
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        posArray[i * 3] =
          p.baseX + Math.sin(elapsed * p.freqX + p.phaseX) * p.ampX;
        posArray[i * 3 + 1] =
          p.baseY + Math.sin(elapsed * p.freqY + p.phaseY) * p.ampY;
        posArray[i * 3 + 2] =
          p.baseZ + Math.sin(elapsed * 0.15 + p.phaseX) * 0.5;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth mouse parallax
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.03;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.03;
      camera.position.x = smoothMouse.x * 0.6;
      camera.position.y = smoothMouse.y * 0.4;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
