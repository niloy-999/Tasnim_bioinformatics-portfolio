"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCw } from "lucide-react";

interface DnaCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function DnaCanvas3D({
  className = "",
  interactive = true
}: DnaCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeBase, setActiveBase] = useState<string>("A-T / G-C Base Pairing");
  const isPlayingRef = useRef(true);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 36);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for DNA helix
    const dnaGroup = new THREE.Group();
    dnaGroup.rotation.z = Math.PI / 8; // slight aesthetic diagonal tilt
    scene.add(dnaGroup);

    // Materials for nucleotides & backbone (Soft, elegant light tones)
    const matA = new THREE.MeshPhongMaterial({
      color: 0x67e8f9, // Soft Light Cyan (Adenine)
      emissive: 0x0891b2,
      emissiveIntensity: 0.15,
      shininess: 60
    });
    const matT = new THREE.MeshPhongMaterial({
      color: 0x6ee7b7, // Soft Light Emerald/Mint (Thymine)
      emissive: 0x059669,
      emissiveIntensity: 0.15,
      shininess: 60
    });
    const matG = new THREE.MeshPhongMaterial({
      color: 0xc4b5fd, // Soft Light Lavender/Violet (Guanine)
      emissive: 0x7c3aed,
      emissiveIntensity: 0.15,
      shininess: 60
    });
    const matC = new THREE.MeshPhongMaterial({
      color: 0xfde68a, // Soft Light Cream-Amber (Cytosine)
      emissive: 0xd97706,
      emissiveIntensity: 0.15,
      shininess: 60
    });
    const matBond = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75
    });

    // Generate Double Helix
    const numPairs = 28;
    const helixRadius = 5.5;
    const verticalSpacing = 0.95;
    const twistFactor = 0.28;

    const sphereGeom = new THREE.SphereGeometry(0.52, 16, 16);
    const bondCylinderGeom = new THREE.CylinderGeometry(0.09, 0.09, 1, 8);

    for (let i = 0; i < numPairs; i++) {
      const y = (i - numPairs / 2) * verticalSpacing;
      const angle = i * twistFactor;

      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;

      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;

      // Base pair assignment (alternate A-T and G-C)
      const isAT = i % 2 === 0;
      const sphere1 = new THREE.Mesh(sphereGeom, isAT ? matA : matG);
      sphere1.position.set(x1, y, z1);
      dnaGroup.add(sphere1);

      const sphere2 = new THREE.Mesh(sphereGeom, isAT ? matT : matC);
      sphere2.position.set(x2, y, z2);
      dnaGroup.add(sphere2);

      // Hydrogen Bond connection rung
      const bond = new THREE.Mesh(bondCylinderGeom, matBond);
      const midpoint = new THREE.Vector3(
        (x1 + x2) / 2,
        (y + y) / 2,
        (z1 + z2) / 2
      );
      bond.position.copy(midpoint);

      const p1 = new THREE.Vector3(x1, y, z1);
      const p2 = new THREE.Vector3(x2, y, z2);
      const distance = p1.distanceTo(p2);
      bond.scale.set(1, distance, 1);

      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      bond.setRotationFromQuaternion(quaternion);

      dnaGroup.add(bond);
    }

    // Floating molecular particle network around the helix
    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = (Math.random() - 0.5) * 32;
      particlePositions[i + 2] = (Math.random() - 0.5) * 22;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.35,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x67e8f9, 1.8, 50);
    pointLight1.position.set(15, 15, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6ee7b7, 1.5, 50);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xc4b5fd, 1.3, 50);
    pointLight3.position.set(0, 20, -10);
    scene.add(pointLight3);

    // Mouse & Touch interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousTouchX = 0;
    let previousTouchY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotationY = mouseX * 0.8;
      targetRotationX = mouseY * 0.5;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousTouchX = e.touches[0].clientX;
        previousTouchY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousTouchX;
      const deltaY = e.touches[0].clientY - previousTouchY;
      dnaGroup.rotation.y += deltaX * 0.01;
      dnaGroup.rotation.x += deltaY * 0.01;
      previousTouchX = e.touches[0].clientX;
      previousTouchY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isPlayingRef.current) {
        dnaGroup.rotation.y += 0.012;
      }

      // Smooth inertia towards mouse/target
      dnaGroup.rotation.x += (targetRotationX - dnaGroup.rotation.x) * 0.04;

      // Particle oscillation
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove);
        container.removeEventListener("touchend", onTouchEnd);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className={`relative flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-paper to-ink-100/40 dark:border-line-dark dark:from-paper-dark/90 dark:to-ink-900/50 ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="h-[340px] w-full cursor-grab active:cursor-grabbing sm:h-[400px] lg:h-[440px]"
        aria-label="Interactive 3D DNA Double Helix Model"
      />

      {/* Floating Modern HUD overlay */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-bio-cyan/40 bg-white/80 px-2.5 py-1 text-[11px] font-mono font-medium text-ink-800 shadow-sm backdrop-blur dark:bg-ink-900/80 dark:text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio-cyan opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bio-cyan"></span>
          </span>
          3D DNA Double Helix
        </span>
        <span className="hidden rounded-full border border-line bg-white/60 px-2 py-0.5 text-[10px] font-mono text-ink-500 backdrop-blur dark:border-line-dark dark:bg-ink-900/60 dark:text-ink-400 sm:inline-block">
          B-form · 10.5 bp/turn
        </span>
      </div>

      {/* Base Pair Legend & Controls bar */}
      <div className="flex w-full flex-wrap items-center justify-between gap-2 border-t border-line/80 bg-white/60 px-3 py-2 text-xs backdrop-blur dark:border-line-dark/80 dark:bg-ink-900/60 sm:px-4">
        {/* Nucleotide color codes */}
        <div className="flex items-center gap-2.5 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-ink-700 dark:text-ink-200">
            <span className="h-2.5 w-2.5 rounded-full bg-[#67E8F9]" />
            <strong className="text-cyan-600 dark:text-cyan-300">A</strong>denine
          </span>
          <span className="flex items-center gap-1 text-ink-700 dark:text-ink-200">
            <span className="h-2.5 w-2.5 rounded-full bg-[#6EE7B7]" />
            <strong className="text-emerald-600 dark:text-emerald-300">T</strong>hymine
          </span>
          <span className="flex items-center gap-1 text-ink-700 dark:text-ink-200">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C4B5FD]" />
            <strong className="text-purple-600 dark:text-purple-300">G</strong>uanine
          </span>
          <span className="flex items-center gap-1 text-ink-700 dark:text-ink-200">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FDE68A]" />
            <strong className="text-amber-600 dark:text-amber-300">C</strong>ytosine
          </span>
        </div>

        {/* Play / Pause toggle */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1 rounded-md border border-line bg-paper px-2 py-1 text-[11px] font-medium text-ink-700 hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-ink-800 dark:text-ink-200"
            title={isPlaying ? "Pause rotation" : "Resume rotation"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "Pause" : "Spin"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
