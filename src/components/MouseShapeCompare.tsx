
"use client";

import React from "react";
import type { Product } from "@/types";
import { COMPARE_MOUSE_COLORS } from "@/lib/mouseShapeSvg";

interface MouseShapeCompareProps {
  compared: Product[];
  hoveredId: string | null;
  maxL: number;
}

const CUSTOM_MICE_SVGS: Record<string, string> = {
  "Finalmouse UltralightX": "finalmouse_ultralightx",
  "Hitscan Hyperlight": "hitscan_hyperlight",
  "Logitech G Pro X2 Superlight": "logitech_g_pro_x2",
  "Logitech G Pro X2 Superstrike": "logitech_g_pro_x2",
  "Logitech MX Master 3S": "logitech_mx_master_3s",
  "Razer DeathAdder V3 Pro": "razer_deathadder_v3_pro",
  "Razer Viper V4 Pro": "razer_viper_v4_pro",
  "WLMOUSE Beast X Max": "wlmouse_beast_x_max",
};

export function MouseShapeCompare({ compared, hoveredId, maxL }: MouseShapeCompareProps) {
  const SVG_SIZE = 1500; 

  const renderView = (viewType: "top" | "side") => {
    return (
      <svg 
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {compared.map((p) => {
            // Более гибкий поиск по имени
            const nameKey = Object.keys(CUSTOM_MICE_SVGS).find(k => 
              p.name.toLowerCase().includes(k.toLowerCase()) || 
              k.toLowerCase().includes(p.name.toLowerCase())
            );
            const customName = nameKey ? CUSTOM_MICE_SVGS[nameKey] : null;

            if (!customName) return null;
            const suffix = viewType === "top" ? "1" : "2";
            const url = `/images/svg/${customName}_${suffix}.svg`;
            
            return (
              <mask id={`mask-${viewType}-${p.id}`} key={`mask-${p.id}`} maskUnits="userSpaceOnUse">
                <image 
                  href={url} 
                  x="0" 
                  y="0" 
                  width={SVG_SIZE} 
                  height={SVG_SIZE} 
                />
              </mask>
            );
          })}
        </defs>

        {compared.map((p, i) => {
          const nameKey = Object.keys(CUSTOM_MICE_SVGS).find(k => 
            p.name.toLowerCase().includes(k.toLowerCase()) || 
            k.toLowerCase().includes(p.name.toLowerCase())
          );
          const customName = nameKey ? CUSTOM_MICE_SVGS[nameKey] : null;
          if (!customName) return null;

          const color = COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length];
          const isHovered = hoveredId === p.id;
          const opacity = hoveredId ? (isHovered ? 1 : 0.15) : 0.9;

          const scale = (p.lengthMm ?? 125) / maxL;
          const size = SVG_SIZE * scale;
          const offset = (SVG_SIZE - size) / 2;

          return (
            <rect
              key={`rect-${p.id}`}
              x={offset}
              y={viewType === "top" ? offset : SVG_SIZE - size}
              width={size}
              height={size}
              fill={color}
              mask={`url(#mask-${viewType}-${p.id})`}
              opacity={opacity}
              className="transition-all duration-500 ease-in-out"
              style={{ pointerEvents: "none" }}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex flex-row w-full gap-8 items-center justify-center min-h-[600px] h-[600px]">
      <div className="w-1/2 flex items-center justify-center h-full">
        {renderView("top")}
      </div>
      <div className="w-1/2 flex items-center justify-center h-full">
        {renderView("side")}
      </div>
    </div>
  );
}
