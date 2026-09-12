"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  angle: number;
  radius: number;
  alpha: number;
  phase: number;
}

interface ClickParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  char: string;
  alpha: number;
  scale: number;
}

const NUCLEOTIDES = ["A", "T", "G", "C", "U"];
const COLORS = ["#67E8F9", "#6EE7B7", "#C4B5FD", "#FDE68A", "#BAE6FD"];

export default function DnaMouseCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop/pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let isHovering = false;
    let isMouseDown = false;
    let isVisible = false;
    let rotation = 0;

    const trail: TrailPoint[] = [];
    const maxTrailPoints = 24;
    const particles: ClickParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      // Check if cursor is over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], [tabindex], .btn-primary, .btn-secondary, [data-interactive='true'], .card-3d"
        );
        isHovering = !!interactive;
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn bursting nucleotide base particles on click
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.4;
        const speed = 2.0 + Math.random() * 2.8;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[i % COLORS.length],
          char: NUCLEOTIDES[i % NUCLEOTIDES.length],
          alpha: 1.0,
          scale: 0.8 + Math.random() * 0.5
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("click", handleClick);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for trailing 3D helix
      mouseX += (targetX - mouseX) * 0.4;
      mouseY += (targetY - mouseY) * 0.4;

      // Continuous rotation
      const spinSpeed = isHovering ? 0.14 : 0.07;
      rotation += spinSpeed;

      const currentRadius = isHovering ? 18 : 12;

      if (isVisible) {
        // Add new point to trail
        trail.unshift({
          x: mouseX,
          y: mouseY,
          angle: rotation,
          radius: currentRadius,
          alpha: 1.0,
          phase: rotation
        });
      }

      // Trim trail
      while (trail.length > maxTrailPoints) {
        trail.pop();
      }

      // 1. Draw 3D DNA / RNA Double Helix Trailing Wave
      if (trail.length > 1) {
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const progress = 1 - i / trail.length;
          const alpha = progress * 0.72;
          const r = pt.radius * (0.35 + progress * 0.65);

          const angle = pt.phase + i * 0.24;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          const tiltY = 0.55;

          // Strand A: Soft Light Cyan (#67E8F9)
          const ax = pt.x + cosA * r;
          const ay = pt.y + sinA * r * tiltY;
          const aDepth = sinA;

          // Strand B: Soft Light Mint (#6EE7B7)
          const bx = pt.x - cosA * r;
          const by = pt.y - sinA * r * tiltY;
          const bDepth = -sinA;

          // Draw Hydrogen Bond Rung
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(103, 232, 249, ${alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            const mx = (ax + bx) / 2;
            const my = (ay + by) / 2;
            ctx.beginPath();
            ctx.arc(mx, my, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
            ctx.fill();
          }

          // Strand A Base Sphere
          const aSize = Math.max(1.1, (2.0 + aDepth * 0.6) * progress);
          ctx.beginPath();
          ctx.arc(ax, ay, aSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(103, 232, 249, ${Math.max(0.1, alpha * 0.8)})`;
          ctx.shadowColor = "#67E8F9";
          ctx.shadowBlur = isHovering ? 5 : 2;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Strand B Base Sphere
          const bSize = Math.max(1.1, (2.0 + bDepth * 0.6) * progress);
          ctx.beginPath();
          ctx.arc(bx, by, bSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(110, 231, 183, ${Math.max(0.1, alpha * 0.8)})`;
          ctx.shadowColor = "#6EE7B7";
          ctx.shadowBlur = isHovering ? 5 : 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 2. Draw Custom DNA / Biomolecular Pointer Indicator at Exact Target (0ms latency)
      if (isVisible) {
        const px = targetX;
        const py = targetY;

        // Outer Molecular Orbital Halo (Expands on Hover)
        const ringRadius = isHovering ? (isMouseDown ? 20 : 23) : 9;
        ctx.beginPath();
        ctx.arc(px, py, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovering ? "rgba(103, 232, 249, 0.5)" : "rgba(103, 232, 249, 0.3)";
        ctx.lineWidth = isHovering ? 1.4 : 1.0;
        if (isHovering) {
          ctx.setLineDash([3, 3]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbiting Base Pair Satellites around cursor tip on hover
        if (isHovering) {
          const orbitR = 23;
          const s1x = px + Math.cos(rotation * 1.5) * orbitR;
          const s1y = py + Math.sin(rotation * 1.5) * orbitR * 0.6;
          const s2x = px - Math.cos(rotation * 1.5) * orbitR;
          const s2y = py - Math.sin(rotation * 1.5) * orbitR * 0.6;

          // Satellite A (Cyan - Adenine)
          ctx.beginPath();
          ctx.arc(s1x, s1y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#67E8F9";
          ctx.shadowColor = "#67E8F9";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Satellite B (Emerald - Thymine)
          ctx.beginPath();
          ctx.arc(s2x, s2y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#6EE7B7";
          ctx.shadowColor = "#6EE7B7";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Faint hydrogen connector between satellites
          ctx.beginPath();
          ctx.moveTo(s1x, s1y);
          ctx.lineTo(s2x, s2y);
          ctx.strokeStyle = "rgba(103, 232, 249, 0.2)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // 4 Micro Bio-Reticle Ticks around the cursor tip when not hovering
          const tickDist = 11;
          const tickLen = 2.5;
          ctx.strokeStyle = "rgba(103, 232, 249, 0.4)";
          ctx.lineWidth = 1;

          // Top, Right, Bottom, Left ticks
          ctx.beginPath();
          ctx.moveTo(px, py - tickDist);
          ctx.lineTo(px, py - tickDist + tickLen);
          ctx.moveTo(px + tickDist, py);
          ctx.lineTo(px + tickDist - tickLen, py);
          ctx.moveTo(px, py + tickDist);
          ctx.lineTo(px, py + tickDist - tickLen);
          ctx.moveTo(px - tickDist, py);
          ctx.lineTo(px - tickDist + tickLen, py);
          ctx.stroke();
        }

        // Inner Sharp Core Pointer Pin (The precise click point)
        const coreRadius = isMouseDown ? 2.0 : isHovering ? 3.8 : 2.8;
        ctx.beginPath();
        ctx.arc(px, py, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = isHovering ? "#67E8F9" : "#6EE7B7";
        ctx.shadowBlur = isHovering ? 10 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Render Burst Particles on Click
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.alpha -= 0.03;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = `bold ${Math.floor(11 * p.scale)}px monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
