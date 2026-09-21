import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(desktop && !reduced);
    if (!desktop || reduced) return;

    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="cursor-glow"
      style={{ transform: `translate3d(${position.x - 140}px, ${position.y - 140}px, 0)` }}
      aria-hidden="true"
    />
  );
}