// ============================================
// Процедурные силуэты мыши (вид сверху / сбоку)
// Вдохновлено визуализацией EloShapes — без копирования их SVG
// ============================================

/** Вид сверху: эллипс + точка сенсора по оси (вертикально 100x200) */
export function mouseTopGeometry(
  lengthMm: number,
  widthMm: number,
  maxL: number,
  maxW: number,
  humpPercent: number
) {
  const cx = 50;
  const cy = 100;
  // Масштабируем так, чтобы самая длинная мышь занимала 180 из 200 единиц высоты
  const ry = (lengthMm / maxL) * 90;
  // Ширина пропорционально ry
  const rx = (widthMm / lengthMm) * ry;
  
  const t = Math.min(100, Math.max(0, humpPercent)) / 100;
  const sensorY = cy - ry + 2 * ry * t;
  return { cx, cy, rx, ry, sensorX: cx, sensorY };
}

/** Силуэт сбоку: замкнутый path, нос слева (200x100) */
export function mouseSidePathD(
  lengthMm: number,
  heightMm: number,
  humpPercent: number,
  maxL: number, // Передаем maxL для общего масштаба
  maxH: number
): string {
  // Выравниваем масштаб по длине, чтобы совпало с видом сверху
  const x0 = 100 - ((lengthMm / maxL) * 180) / 2;
  const w = (lengthMm / maxL) * 180;
  const h = (heightMm / maxH) * 85;
  const baseY = 95;
  const steps = 64;
  const hump = Math.min(100, Math.max(0, humpPercent)) / 100;

  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + t * w;
    const bump =
      Math.exp(-Math.pow((t - hump) / 0.26, 2)) * 0.9 +
      (1 - t) * 0.05 +
      t * 0.04;
    const y = baseY - h * bump;
    pts.push([x, y]);
  }

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  }
  d += ` L ${(x0 + w).toFixed(2)} ${baseY} L ${x0.toFixed(2)} ${baseY} Z`;
  return d;
}

export const COMPARE_MOUSE_COLORS = [
  "#22d3ee",
  "#e879f9",
  "#facc15",
  "#4ade80",
] as const;
