"use client";

// Сбой в корневом layout — нужны свои html/body
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold mb-2">Критическая ошибка</h1>
          <p className="text-gray-400 text-sm mb-6">
            Перезагрузите страницу или проверьте консоль сервера.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-white text-black px-5 py-2 text-sm font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  );
}
