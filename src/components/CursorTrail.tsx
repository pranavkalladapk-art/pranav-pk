import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 24;
const TRAIL_FADE_MS = 1000;

interface TrailDot {
  x: number;
  y: number;
  timestamp: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<TrailDot[]>([]);
  const animFrameRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current.shift();
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Remove expired dots
      trail.current = trail.current.filter(
        (dot) => now - dot.timestamp < TRAIL_FADE_MS
      );

      for (let i = 0; i < trail.current.length; i++) {
        const dot = trail.current[i];
        const age = now - dot.timestamp;
        const life = 1 - age / TRAIL_FADE_MS;
        const size = life * 6;
        const alpha = life * 0.35;

        // Cyan-blue glow matching the cursor
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, size * 3
        );
        gradient.addColorStop(0, `hsla(200, 100%, 80%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(210, 90%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(220, 80%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
