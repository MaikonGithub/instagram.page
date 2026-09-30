"use client";

import { useEffect, useRef } from "react";
import { AmbientMotion } from "@/components/chrome/ambient/AmbientMotion";
import { createParticles, drawParticles, stepParticles } from "@/components/chrome/ambient/particles";
import { roseWash } from "@/components/chrome/ambient/roseWash";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function readAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0a84ff";
}

export function ParticleField() {
  const reduceMotion = useMediaQuery(REDUCED_MOTION);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const wash = washRef.current;
    if (!canvas || !wash) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = new AmbientMotion();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = createParticles(width, height);
    let frame = 0;
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      motion.setViewport(width, height);
      particles = createParticles(width, height);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame = requestAnimationFrame(tick);
    };

    const tick = (time: number) => {
      if (!running) return;
      const sample = motion.step(time);
      wash.style.background = roseWash(sample.roseX, sample.roseY);
      stepParticles(particles, sample, time, width, height);
      drawParticles(context, particles, readAccent(), time, width, height);
      frame = requestAnimationFrame(tick);
    };

    resize();
    const unbind = motion.bind(window);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      unbind();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      <div ref={washRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
    </>
  );
}
