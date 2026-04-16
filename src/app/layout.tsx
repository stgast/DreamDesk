// ============================================
// DreamDesk — Root Layout
// Server Component: подключает провайдеры и общий каркас
// ============================================

import type { Metadata } from "next";
import "./globals.css";
import ClickSpark from "@/components/ui/ClickSpark";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Footer } from "@/components/Footer";

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
        <Providers>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 overflow-auto">{children}</main>
              <Footer />
              <AIChatWidget />
            </div>
          </ClickSpark>
        </Providers>
      </body>
    </html>
  );
}
