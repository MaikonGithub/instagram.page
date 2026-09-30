import type { AmbientSample } from "@/components/chrome/ambient/AmbientMotion";

export type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  phase: number;
  speed: number;
  r: number;
};

const LINK_DISTANCE = 78;

function countForWidth(width: number) {
  return width < 768 ? 90 : 160;
}

export function createParticles(width: number, height: number): Particle[] {
  const count = countForWidth(width);
  return Array.from({ length: count }, () => {
    const depth = 0.35 + Math.random() * 0.65;
    const ox = Math.random() * width;
    const oy = Math.random() * height;
    return {
      ox,
      oy,
      x: ox,
      y: oy,
      vx: 0,
      vy: 0,
      depth,
      phase: Math.random() * Math.PI * 2,
      speed: (0.12 + Math.random() * 0.18) * depth,
      r: depth > 0.7 ? 1.05 : 0.65,
    };
  });
}

function wrap(particle: Particle, width: number, height: number) {
  if (particle.ox < -24) particle.ox = width + 24;
  if (particle.ox > width + 24) particle.ox = -24;
  if (particle.oy < -24) particle.oy = height + 24;
  if (particle.oy > height + 24) particle.oy = -24;
}

export function stepParticles(
  particles: Particle[],
  sample: AmbientSample,
  time: number,
  width: number,
  height: number,
) {
  for (const particle of particles) {
    particle.ox += Math.cos(particle.phase) * particle.speed;
    particle.oy += Math.sin(particle.phase * 1.3) * particle.speed * 0.7;
    wrap(particle, width, height);

    const swayX = Math.sin(time * 0.00028 + particle.phase) * 26 * particle.depth;
    const swayY = Math.cos(time * 0.00022 + particle.phase) * 20 * particle.depth;
    const goalX =
      particle.ox + swayX + sample.windX * particle.depth + sample.forceX * 36 * particle.depth;
    const goalY =
      particle.oy +
      swayY +
      sample.windY * particle.depth +
      (sample.forceY * 36 + sample.scrollImpulse * 48) * particle.depth;
    particle.vx += (goalX - particle.x) * 0.02;
    particle.vy += (goalY - particle.y) * 0.02;
    particle.vx *= 0.9;
    particle.vy *= 0.9;
    particle.x += particle.vx;
    particle.y += particle.vy;
  }
}

export function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  accent: string,
  time: number,
  width: number,
  height: number,
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = accent;
  context.strokeStyle = accent;
  context.lineWidth = 1;
  context.shadowColor = "transparent";
  context.shadowBlur = 0;

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist > LINK_DISTANCE) continue;
      context.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.12;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
  }

  context.shadowColor = accent;
  context.shadowBlur = 10;
  for (const particle of particles) {
    const pulse = 0.5 + Math.sin(time * 0.0011 + particle.phase) * 0.5;
    context.globalAlpha = 0.28 + particle.depth * 0.28 + pulse * 0.22;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    context.fill();
  }
}
