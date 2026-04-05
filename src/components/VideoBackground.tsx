"use client";

import { useEffect, useRef, useCallback } from "react";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentTransform = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize mouse position to 0-1 range
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Target offset: map mouse 0-1 to a pixel range (e.g., -30px to +30px)
      const targetX = (mouseRef.current.x - 0.5) * 60;
      const targetY = (mouseRef.current.y - 0.5) * 60;

      // Smooth interpolation (lerp)
      currentTransform.current.x += (targetX - currentTransform.current.x) * 0.04;
      currentTransform.current.y += (targetY - currentTransform.current.y) * 0.04;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${currentTransform.current.x}px, ${currentTransform.current.y}px) scale(1.15)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div
        ref={containerRef}
        className="absolute inset-[-60px] will-change-transform"
        style={{ transform: "scale(1.15)" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/anim.mp4"
        />
      </div>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/40 to-surface/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
