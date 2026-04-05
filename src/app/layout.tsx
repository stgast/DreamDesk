// ============================================
// DreamDesk — Root Layout
// Server Component: подключает провайдеры и общий каркас
// ============================================

import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { SetupProvider } from "@/context/SetupContext";
import { Header } from "@/components/Header";
import { AIChatWidget } from "@/components/AIChatWidget";

export const metadata: Metadata = {
  title: "DreamDesk — Собери идеальное рабочее место",
  description:
    "Умный конфигуратор периферии: каталог устройств, проверка совместимости, AI-рекомендации",
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
          <SetupProvider>
            <div className="flex min-h-screen">
              <div className="flex flex-1 flex-col min-w-0 min-h-screen relative">
                <Header />
                <main className="flex-1 overflow-auto">{children}</main>
                <AIChatWidget />
              </div>
            </div>
          </SetupProvider>
        </AppProvider>
      </body>
    </html>
  );
}
