import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  bright: number;
}

/**
 * Subtle premium cursor particle trail.
 * - Tiny 2-5px blue-white sparkles
 * - Soft fade within 400-700ms
 * - 60fps via rAF, GPU-accelerated canvas
 * - Brighter on hover over interactive elements
 * - Small burst of 10-15 particles on click
 * - Default OS cursor stays visible (canvas is pointer-events:none)
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, moved: false });
  const hoverBoost = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (x: number, y: number, count: number, boost = 0) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.05;
        const maxLife = 400 + Math.random() * 300; // 400-700ms
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.05,
          life: 0,
          maxLife,
          size: 1.6 + Math.random() * 3.2, // ~2-5px
          bright: 0.5 + Math.random() * 0.3 + boost,
        });
      }
      // cap to keep performance smooth
      if (particles.current.length > 220) {
        particles.current.splice(0, particles.current.length - 220);
      }
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.current.lastX;
      const dy = e.clientY - mouse.current.lastY;
      const dist = Math.hypot(dx, dy);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.moved = true;

      // emit proportionally to movement, but keep subtle
      const target = e.target as HTMLElement;
      const interactive = !!target.closest(
        "button, a, input, select, textarea, [role='button'], .card-hover, .nav-item, tr, .interactive"
      );
      if (interactive) hoverBoost.current = Math.min(hoverBoost.current + 0.04, 0.35);
      else hoverBoost.current = Math.max(hoverBoost.current - 0.02, 0);

      const count = Math.min(2, Math.floor(dist / 14));
      if (count > 0) spawn(e.clientX, e.clientY, count, hoverBoost.current);
      mouse.current.lastX = e.clientX;
      mouse.current.lastY = e.clientY;
    };

    const onDown = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY, 12, 0.4); // 10-15 burst
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 32);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particles.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          arr.splice(i, 1);
          continue;
        }
        // smooth interpolation toward rest
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.vy += 0.0008 * dt; // very slight drift
        const t = p.life / p.maxLife;
        const alpha = (1 - t) * p.bright * 0.85;
        const r = p.size * (1 - t * 0.4);

        // soft glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grad.addColorStop(0, `rgba(180, 210, 255, ${alpha})`);
        grad.addColorStop(0.4, `rgba(120, 162, 217, ${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(120, 162, 217, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // core sparkle
        ctx.fillStyle = `rgba(235, 244, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  return <canvas id="cursor-trail" ref={canvasRef} aria-hidden="true" />;
}
