import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "DreamDesk — Собери идеальное рабочее место",
  description:
    "Интерактивный конфигуратор рабочего места: каталог периферии, визуализация стола, AI-рекомендации",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-dark-bg text-white antialiased">
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col min-w-0 min-h-screen">
              <Header />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
