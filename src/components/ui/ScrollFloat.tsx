"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrollFloatProps {
  children: React.ReactNode;
  animationDuration?: number;
  stagger?: number;
}

export const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  animationDuration = 1,
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll(".char");
    if (!chars.length) return;

    // Reset initial state safely
    gsap.set(chars, { opacity: 0, y: 50, rotationZ: 10 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              rotationZ: 0,
              duration: animationDuration,
              stagger: stagger,
              ease: "back.out(2)",
              overwrite: "auto",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [animationDuration, stagger, children]);

  const text = typeof children === "string" ? children : React.Children.toArray(children).join("");

  return (
    <h2 ref={containerRef} className="inline-block overflow-hidden pb-2" style={{ perspective: "1000px" }}>
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" 
          style={{ whiteSpace: char === " " ? "pre" : "normal", opacity: 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
};
