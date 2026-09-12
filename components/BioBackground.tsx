"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BioBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Check dark mode
    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
      updateThemeLighting();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 48);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. PRIMARY 3D DNA DOUBLE HELIX (Right/Center)
    // ==========================================
    const dnaGroup1 = new THREE.Group();
    dnaGroup1.position.set(16, 2, -5);
    dnaGroup1.rotation.z = Math.PI / 5.5; // diagonal bio tilt
    dnaGroup1.rotation.x = Math.PI / 12;
    scene.add(dnaGroup1);

    // ==========================================
    // 2. SECONDARY DEEP BACKGROUND DNA HELIX (Left)
    // ==========================================
    const dnaGroup2 = new THREE.Group();
    dnaGroup2.position.set(-18, -4, -18);
    dnaGroup2.rotation.z = -Math.PI / 4.5;
    dnaGroup2.rotation.y = Math.PI / 6;
    scene.add(dnaGroup2);

    // ==========================================
    // 3. SINGLE-STRANDED RNA RIBBON / HAIRPIN LOOP
    // ==========================================
    const rnaGroup = new THREE.Group();
    rnaGroup.position.set(-6, 12, -8);
    scene.add(rnaGroup);

    // Shared Nucleotide Materials (Soft, elegant light tones)
    const matA = new THREE.MeshPhongMaterial({
      color: 0x67e8f9, // Soft Light Cyan (Adenine)
      emissive: 0x0891b2,
      emissiveIntensity: 0.15,
      shininess: 60,
      transparent: true,
      opacity: 0.72
    });

    const matT = new THREE.MeshPhongMaterial({
      color: 0x6ee7b7, // Soft Light Emerald/Mint (Thymine)
      emissive: 0x059669,
      emissiveIntensity: 0.15,
      shininess: 60,
      transparent: true,
      opacity: 0.72
    });

    const matG = new THREE.MeshPhongMaterial({
      color: 0xc4b5fd, // Soft Light Lavender/Violet (Guanine)
      emissive: 0x7c3aed,
      emissiveIntensity: 0.15,
      shininess: 60,
      transparent: true,
      opacity: 0.72
    });

    const matC = new THREE.MeshPhongMaterial({
      color: 0xfde68a, // Soft Light Cream-Amber (Cytosine)
      emissive: 0xd97706,
      emissiveIntensity: 0.15,
      shininess: 60,
      transparent: true,
      opacity: 0.72
    });

    const matU = new THREE.MeshPhongMaterial({
      color: 0xbae6fd, // Soft Light Sky Blue (Uracil in RNA)
      emissive: 0x0284c7,
      emissiveIntensity: 0.18,
      shininess: 70,
      transparent: true,
      opacity: 0.75
    });

    const matBond = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.4,
      metalness: 0.5,
      transparent: true,
      opacity: 0.35
    });

    const sphereGeom = new THREE.SphereGeometry(0.48, 14, 14);
    const smallSphereGeom = new THREE.SphereGeometry(0.38, 12, 12);
    const bondCylGeom = new THREE.CylinderGeometry(0.065, 0.065, 1, 6);

    // Build DNA Helix 1 (Primary - 34 base pairs)
    const numPairs1 = 34;
    const radius1 = 4.8;
    const spacing1 = 1.05;
    const twist1 = 0.26;

    for (let i = 0; i < numPairs1; i++) {
      const y = (i - numPairs1 / 2) * spacing1;
      const angle = i * twist1;

      const x1 = Math.cos(angle) * radius1;
      const z1 = Math.sin(angle) * radius1;
      const x2 = Math.cos(angle + Math.PI) * radius1;
      const z2 = Math.sin(angle + Math.PI) * radius1;

      const isAT = i % 2 === 0;
      const s1 = new THREE.Mesh(sphereGeom, isAT ? matA : matG);
      s1.position.set(x1, y, z1);
      dnaGroup1.add(s1);

      const s2 = new THREE.Mesh(sphereGeom, isAT ? matT : matC);
      s2.position.set(x2, y, z2);
      dnaGroup1.add(s2);

      // Hydrogen Bond connection rung
      const bond = new THREE.Mesh(bondCylGeom, matBond);
      const midpoint = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2);
      bond.position.copy(midpoint);

      const p1 = new THREE.Vector3(x1, y, z1);
      const p2 = new THREE.Vector3(x2, y, z2);
      const dist = p1.distanceTo(p2);
      bond.scale.set(1, dist, 1);

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      bond.setRotationFromQuaternion(quat);
      dnaGroup1.add(bond);
    }

    // Build DNA Helix 2 (Deep Background - 26 base pairs)
    const numPairs2 = 26;
    const radius2 = 3.6;
    const spacing2 = 0.95;
    const twist2 = 0.3;

    for (let i = 0; i < numPairs2; i++) {
      const y = (i - numPairs2 / 2) * spacing2;
      const angle = i * twist2;

      const x1 = Math.cos(angle) * radius2;
      const z1 = Math.sin(angle) * radius2;
      const x2 = Math.cos(angle + Math.PI) * radius2;
      const z2 = Math.sin(angle + Math.PI) * radius2;

      const isAT = i % 3 === 0;
      const s1 = new THREE.Mesh(smallSphereGeom, isAT ? matA : matC);
      s1.position.set(x1, y, z1);
      dnaGroup2.add(s1);

      const s2 = new THREE.Mesh(smallSphereGeom, isAT ? matT : matG);
      s2.position.set(x2, y, z2);
      dnaGroup2.add(s2);

      const bond = new THREE.Mesh(bondCylGeom, matBond);
      const midpoint = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2);
      bond.position.copy(midpoint);

      const p1 = new THREE.Vector3(x1, y, z1);
      const p2 = new THREE.Vector3(x2, y, z2);
      bond.scale.set(1, p1.distanceTo(p2), 1);

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      bond.setRotationFromQuaternion(quat);
      dnaGroup2.add(bond);
    }

    // Build Single-Stranded RNA Hairpin Loop (Sinusoidal ribbon curve)
    const rnaPointsCount = 28;
    const rnaNodes: THREE.Mesh[] = [];
    for (let i = 0; i < rnaPointsCount; i++) {
      const t = i / rnaPointsCount;
      const rx = Math.sin(t * Math.PI * 2.2) * 6;
      const ry = (t - 0.5) * 16 + Math.cos(t * Math.PI * 3) * 2;
      const rz = Math.cos(t * Math.PI * 2.2) * 3;

      // In RNA: Uracil (matU), Adenine (matA), Guanine (matG), Cytosine (matC)
      let rnaMat = matU;
      if (i % 4 === 1) rnaMat = matA;
      if (i % 4 === 2) rnaMat = matG;
      if (i % 4 === 3) rnaMat = matC;

      const rnaNode = new THREE.Mesh(smallSphereGeom, rnaMat);
      rnaNode.position.set(rx, ry, rz);
      rnaGroup.add(rnaNode);
      rnaNodes.push(rnaNode);
    }

    // Connect RNA backbone with dynamic curve line
    const rnaCurvePoints = rnaNodes.map((n) => n.position);
    const rnaCurve = new THREE.CatmullRomCurve3(rnaCurvePoints);
    const rnaCurveGeom = new THREE.TubeGeometry(rnaCurve, 64, 0.08, 6, false);
    const rnaBackboneMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6
    });
    const rnaBackbone = new THREE.Mesh(rnaCurveGeom, rnaBackboneMat);
    rnaGroup.add(rnaBackbone);

    // ==========================================
    // 4. FLOATING BIOMOLECULAR LATTICE & PARTICLES
    // ==========================================
    const particleCount = 110;
    const particleGeom = new THREE.BufferGeometry();
    const particleCoords: number[] = [];
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particleCoords.push(
        (Math.random() - 0.5) * 65,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 35
      );
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particleGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particleCoords, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.38,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Dynamic Molecular Bond Lines between nearby floating particles
    const lineGeom = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const connectionLines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(connectionLines);

    // ==========================================
    // 5. LIGHTING & VOLUMETRIC GLOW (Gentle, elegant ambient illumination)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.1);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x67e8f9, isDark ? 1.6 : 1.0, 70);
    lightCyan.position.set(18, 12, 15);
    scene.add(lightCyan);

    const lightEmerald = new THREE.PointLight(0x6ee7b7, isDark ? 1.4 : 0.9, 70);
    lightEmerald.position.set(-18, -12, 10);
    scene.add(lightEmerald);

    const lightViolet = new THREE.PointLight(0xc4b5fd, isDark ? 1.2 : 0.8, 60);
    lightViolet.position.set(0, 20, -10);
    scene.add(lightViolet);

    function updateThemeLighting() {
      ambientLight.intensity = isDark ? 0.8 : 1.1;
      lightCyan.intensity = isDark ? 1.6 : 1.0;
      lightEmerald.intensity = isDark ? 1.4 : 0.9;
      lightViolet.intensity = isDark ? 1.2 : 0.8;
    }

    // ==========================================
    // 6. MOUSE PARALLAX & INERTIA
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 3.5;
      targetCameraY = -mouseY * 2.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ==========================================
    // 7. MAIN 3D ANIMATION LOOP
    // ==========================================
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate DNA double helices
      dnaGroup1.rotation.y = elapsed * 0.14;
      dnaGroup1.position.y = 2 + Math.sin(elapsed * 0.5) * 0.8;

      dnaGroup2.rotation.y = -elapsed * 0.1;
      dnaGroup2.position.y = -4 + Math.cos(elapsed * 0.4) * 0.6;

      // Undulate RNA hairpin
      rnaGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.4;
      rnaGroup.rotation.z = Math.cos(elapsed * 0.15) * 0.2;
      rnaGroup.position.y = 12 + Math.sin(elapsed * 0.6) * 0.9;

      // Animate floating particles
      const positions = particleGeom.attributes.position.array as Float32Array;
      const linePositions: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += particleVelocities[i].x;
        positions[idx + 1] += particleVelocities[i].y;
        positions[idx + 2] += particleVelocities[i].z;

        // Boundary wrap
        if (Math.abs(positions[idx]) > 35) particleVelocities[i].x *= -1;
        if (Math.abs(positions[idx + 1]) > 30) particleVelocities[i].y *= -1;
        if (Math.abs(positions[idx + 2]) > 20) particleVelocities[i].z *= -1;

        // Form dynamic hydrogen bonds with nearby nodes
        for (let j = i + 1; j < particleCount; j++) {
          const jdx = j * 3;
          const dx = positions[idx] - positions[jdx];
          const dy = positions[idx + 1] - positions[jdx + 1];
          const dz = positions[idx + 2] - positions[jdx + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 36) {
            // Bond line between node i and node j
            linePositions.push(
              positions[idx],
              positions[idx + 1],
              positions[idx + 2],
              positions[jdx],
              positions[jdx + 1],
              positions[jdx + 2]
            );
          }
        }
      }

      particleGeom.attributes.position.needsUpdate = true;
      lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

      // Camera parallax smoothing
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 3D WebGL Genomic Canvas */}
      <div ref={mountRef} className="absolute inset-0 h-full w-full opacity-80 dark:opacity-95" />

      {/* Deep Space Bioluminescent Ambient Glow Spheres */}
      <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-bio-cyan/12 blur-[140px] dark:bg-bio-cyan/18" />
      <div className="absolute top-[40%] -right-32 h-[500px] w-[500px] rounded-full bg-bio-emerald/10 blur-[150px] dark:bg-bio-emerald/14" />
      <div className="absolute -bottom-32 left-[20%] h-[550px] w-[550px] rounded-full bg-bio-violet/10 blur-[150px] dark:bg-purple-900/18" />

      {/* Atmospheric Genomic Coordinate Stream Overlays */}
      <div className="absolute top-3 left-6 right-6 flex items-center justify-between font-mono text-[9px] tracking-widest text-ink-400/40 select-none dark:text-cyan-400/30">
        <span className="hidden sm:inline">REF_GENOME: Tenualosa_ilisha_v2.1 [CHR_M: 1..16,589 bp]</span>
        <span className="hidden md:inline">FOUNDATION_MODELS: DNABERT-2 (768-d) ⟷ ESM-2 (1280-d)</span>
        <span>STATUS: 3D_GENOMIC_LATTICE_ONLINE</span>
      </div>

      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between font-mono text-[9px] tracking-widest text-ink-400/40 select-none dark:text-emerald-400/30">
        <span>STRAND: 5&apos;-A T G C C G T A A T G C-3&apos;</span>
        <span className="hidden sm:inline">CODON_BIAS: RSCU_OPTIMIZED</span>
        <span className="hidden md:inline">SYSTEM: BAU_BIOINFORMATICS_ENGINEERING</span>
      </div>

      {/* Ultra-subtle Bioinformatics Grid Overlay */}
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-50 dark:bg-grid-lines-dark dark:opacity-40" />
    </div>
  );
}
