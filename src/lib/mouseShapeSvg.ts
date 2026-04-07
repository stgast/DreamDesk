// ============================================
// Процедурные силуэты мыши (вид сверху / сбоку)
// Вдохновлено визуализацией EloShapes — без копирования их SVG
// ============================================

/** Вид сверху: эллипс + точка сенсора по оси */
export function mouseTopGeometry(
  lengthMm: number,
  widthMm: number,
  maxL: number,
  maxW: number,
  humpPercent: number
) {
  const cx = 100;
  const cy = 50;
  const rx = Math.max(8, (widthMm / maxW) * 44);
  const ry = Math.max(14, (lengthMm / maxL) * 46);
  const t = Math.min(100, Math.max(0, humpPercent)) / 100;
  const sensorY = cy - ry + 2 * ry * t;
  return { cx, cy, rx, ry, sensorX: cx, sensorY };
}

/** Силуэт сбоку: замкнутый path, нос слева */
export function mouseSidePathD(
  lengthMm: number,
  heightMm: number,
  humpPercent: number,
  maxH: number
): string {
  const x0 = 12;
  const w = 176;
  const baseY = 86;
  const steps = 56;
  const hNorm = heightMm / maxH;
  const hump = Math.min(100, Math.max(0, humpPercent)) / 100;

  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + t * w;
    const bump =
      Math.exp(-Math.pow((t - hump) / 0.24, 2)) * 0.9 +
      (1 - t) * 0.06 +
      t * 0.05;
    const y = baseY - hNorm * 58 * bump;
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
