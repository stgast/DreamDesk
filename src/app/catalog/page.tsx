"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DeviceCard } from "@/components/DeviceCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import type { Device } from "@/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type") ?? "";
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    type: string;
    brand: string;
    color: string;
    minPrice: string;
    maxPrice: string;
  }>({
    type: typeFromUrl,
    brand: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    setFilters((f) => ({ ...f, type: typeFromUrl || f.type }));
  }, [typeFromUrl]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.type) params.set("type", filters.type);
    if (filters.brand) params.set("brand", filters.brand);
    if (filters.color) params.set("color", filters.color);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    fetch(`/api/devices?${params}`)
      .then((r) => r.json())
      .then(setDevices)
      .finally(() => setLoading(false));
  }, [filters]);

  const filteredDevices = searchQuery.trim()
    ? devices.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : devices;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Каталог периферии</h1>
      <div className="max-w-xl">
        <input
          type="search"
          placeholder="Поиск по каталогу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-dark-border bg-dark-surface py-2.5 px-4 text-white placeholder-gray-500 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <CatalogFilters filters={filters} onChange={setFilters} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-dark-card border border-dark-border h-56 animate-pulse"
            />
          ))}
        </div>
      ) : filteredDevices.length === 0 ? (
        <div className="rounded-2xl bg-dark-surface border border-dark-border p-12 text-center text-gray-400">
          По выбранным фильтрам ничего не найдено.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} showAddToSetup />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="animate-pulse rounded-2xl bg-dark-card h-64" />}>
      <CatalogContent />
    </Suspense>
  );
}
