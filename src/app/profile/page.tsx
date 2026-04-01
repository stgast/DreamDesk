"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  ExternalLink,
  Wrench,
  Calendar,
  Package,
} from "lucide-react";
import { getSavedConfigs, deleteConfig, type SavedConfig } from "@/lib/storage";

export default function ProfilePage() {
  const [configs, setConfigs] = useState<SavedConfig[]>([]);

  useEffect(() => {
    setConfigs(getSavedConfigs());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Удалить эту конфигурацию?")) {
      deleteConfig(id);
      setConfigs(getSavedConfigs());
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Профиль</h1>
        <p className="text-sm text-gray-500 mt-1">
          Сохранённые конфигурации рабочего места
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-white">
            Мои сетапы
          </h2>
          <span className="text-xs text-gray-500">
            {configs.length} конфигураций
          </span>
        </div>

        {configs.length === 0 ? (
          <div className="rounded-xl bg-dark-card border border-dark-border p-12 text-center">
            <Wrench className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">
              У тебя пока нет сохранённых конфигураций
            </p>
            <Link
              href="/build"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition"
            >
              Собери свой первый сетап
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {configs.map((c) => (
              <div
                key={c.id}
                className="rounded-xl bg-dark-card border border-dark-border p-4 flex items-center justify-between gap-4 hover:border-dark-hover transition"
              >
                <div className="min-w-0">
                  <h3 className="font-medium text-white truncate">{c.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Package className="w-3 h-3" />
                      {c.deviceIds.length} устройств
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.savedAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/build"
                    className="rounded-lg bg-accent/10 text-accent border border-accent/20 px-3 py-2 text-xs font-medium hover:bg-accent/20 transition"
                  >
                    Открыть
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg border border-dark-border text-gray-500 p-2 hover:text-red-400 hover:border-red-500/30 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
