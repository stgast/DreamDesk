import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-black text-white/20 mb-2">404</p>
      <h1 className="font-heading text-2xl font-bold text-white mb-2">
        Страница не найдена
      </h1>
      <p className="text-on-surface-variant text-sm max-w-md mb-8">
        Такого адреса нет. Если вы только что сохранили проект, перезапустите{" "}
        <code className="text-primary">npm run dev</code> и откройте приложение с
        того же порта.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90"
      >
        На главную
      </Link>
    </div>
  );
}
