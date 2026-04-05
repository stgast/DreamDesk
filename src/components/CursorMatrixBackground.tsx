"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  angle: number;
  currentAngle: number;
  size: number;
  color: string;
  speed: number;
  radius: number;
  baseTheta: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    // Случайный радиус от центра для формирования диска/водоворота
    this.radius = Math.random() * (Math.max(canvasWidth, canvasHeight) * 0.8) + 20;
    this.baseTheta = Math.random() * Math.PI * 2;
    
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    
    this.originX = cx + Math.cos(this.baseTheta) * this.radius;
    this.originY = cy + Math.sin(this.baseTheta) * this.radius;
    this.x = this.originX;
    this.y = this.originY;
    
    // Ориентация капсулы перпендикулярно радиусу (по касательной)
    this.angle = this.baseTheta + Math.PI / 2;
    this.currentAngle = this.angle;
    
    // Длина капсулы
    this.size = Math.random() * 8 + 6; 
    
    // Скорость вращения диска (внутренние быстрее, внешние медленнее, в разные стороны)
    this.speed = (Math.random() > 0.5 ? 1 : -1) * (0.0005 + Math.random() * 0.0015);

    // Google-подобная цветовая палитра для темной темы:
    const colors = [
      "59, 130, 246", // Blue
      "239, 68, 68",  // Red
      "234, 179, 8",  // Yellow
      "34, 197, 94",  // Green
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouse: { x: number; y: number; isActive: boolean }, cx: number, cy: number) {
    // 1. Глобальное вращение водоворота
    this.baseTheta += this.speed;
    this.originX = cx + Math.cos(this.baseTheta) * this.radius;
    this.originY = cy + Math.sin(this.baseTheta) * this.radius;
    
    // Базовый угол для касательной
    this.angle = this.baseTheta + Math.PI / 2;

    let targetX = this.originX;
    let targetY = this.originY;
    let targetAngle = this.angle;

    // 2. Взаимодействие с мышью (полеризация и отталкивание)
    if (mouse.isActive) {
      const dx = mouse.x - this.originX;
      const dy = mouse.y - this.originY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 250; 

      if (dist < influenceRadius) {
        const force = Math.pow((influenceRadius - dist) / influenceRadius, 2);
        
        // Капсулы отталкиваются от курсора словно магнит
        targetX -= (dx / dist) * force * 40;
        targetY -= (dy / dist) * force * 40;

        // Капсулы поворачиваются, указывая своим концом на курсор
        targetAngle = Math.atan2(dy, dx);
      }
    }

    // Инерция возвращения на место (spring-физика)
    this.x += (targetX - this.x) * 0.08;
    this.y += (targetY - this.y) * 0.08;

    // Плавный поворот угла (shortest path lerp)
    let dAngle = targetAngle - this.currentAngle;
    // Нормализация разницы углов для кратчайшего поворота
    while (dAngle > Math.PI) dAngle -= Math.PI * 2;
    while (dAngle < -Math.PI) dAngle += Math.PI * 2;
    this.currentAngle += dAngle * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = `rgba(${this.color}, 0.6)`;
    
    const halfSize = this.size / 2;
    const x1 = this.x - Math.cos(this.currentAngle) * halfSize;
    const y1 = this.y - Math.sin(this.currentAngle) * halfSize;
    const x2 = this.x + Math.cos(this.currentAngle) * halfSize;
    const y2 = this.y + Math.sin(this.currentAngle) * halfSize;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

export function CursorMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const initParticles = (width: number, height: number) => {
      particles = [];
      const particleCount = Math.min(window.innerWidth > 768 ? 1200 : 500, 2000); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouse = { x: -1000, y: -1000, isActive: false };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };
    
    const onMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        p.update(mouse, cx, cy);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
