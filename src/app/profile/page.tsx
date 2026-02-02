"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <h1 className="text-2xl font-bold text-white mb-2">Профиль</h1>
      <p className="text-gray-400 mb-8">
        Здесь отображаются сохранённые конфигурации стола.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">
          Мои сохранённые столы
        </h2>
        {configs.length === 0 ? (
          <div className="rounded-2xl bg-dark-surface border border-dark-border p-8 text-center text-gray-400">
            Пока нет сохранённых конфигураций.{" "}
            <Link href="/build" className="text-accent hover:underline">
              Собери стол
            </Link>{" "}
            и нажми «Сохранить конфигурацию».
          </div>
        ) : (
          <div className="space-y-4">
            {configs.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl bg-dark-card border border-dark-border p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-white">{c.name}</h3>
                  <p className="text-sm text-gray-400">
                    Устройств: {c.deviceIds.length} ·{" "}
                    {new Date(c.savedAt).toLocaleDateString("ru-RU")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/build"
                    className="rounded-xl bg-accent/20 text-accent border border-accent/40 px-3 py-2 text-sm font-medium hover:bg-accent/30 transition"
                  >
                    Открыть
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="rounded-xl border border-dark-border text-gray-400 px-3 py-2 text-sm hover:text-white hover:border-red-500/50 transition"
                  >
                    Удалить
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
