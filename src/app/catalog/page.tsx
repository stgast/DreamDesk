"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { DeviceCard } from "@/components/DeviceCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { DeviceModal } from "@/components/DeviceModal";
import type { Device } from "@/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeFromUrl = searchParams.get("type") ?? "";

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
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

  const addToSetup = useCallback(
    (device: Device) => {
      router.push(`/build?add=${device.id}`);
    },
    [router]
  );

  return (
    <div className="p-6 space-y-5">
      {/* Search + Filter toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Поиск по названию или бренду..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-dark-border bg-dark-surface py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition ${
            showFilters
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-dark-border text-gray-400 hover:text-white"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
        </button>
      </div>

      {/* Filters */}
      {showFilters && <CatalogFilters filters={filters} onChange={setFilters} />}

      {/* Results count */}
      <div className="text-sm text-gray-500">
        {loading ? "Загрузка..." : `Найдено: ${filteredDevices.length}`}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-dark-border h-64 skeleton"
            />
          ))}
        </div>
      ) : filteredDevices.length === 0 ? (
        <div className="rounded-xl bg-dark-card border border-dark-border p-12 text-center">
          <p className="text-gray-400 mb-2">По выбранным фильтрам ничего не найдено</p>
          <p className="text-sm text-gray-600">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              showAddToSetup
              onAdd={() => addToSetup(device)}
              onClick={() => setSelectedDevice(device)}
            />
          ))}
        </div>
      )}

      {/* Device modal */}
      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onAddToSetup={() => {
            addToSetup(selectedDevice);
            setSelectedDevice(null);
          }}
        />
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <div className="skeleton rounded-xl h-64" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
