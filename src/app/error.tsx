"use client";

// Граница ошибки сегмента — без неё Next.js показывает «missing required error components, refreshing...»
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold text-white mb-2">
        Что-то пошло не так
      </h1>
      <p className="text-on-surface-variant text-sm max-w-md mb-6">
        Не удалось загрузить страницу. Проверьте подключение к базе данных
        (DATABASE_URL в .env) и перезапустите сервер разработки.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/15 px-6 py-2.5 text-sm text-white hover:bg-white/5"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
