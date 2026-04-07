// ============================================
// DreamDesk — Client Layout
// Client Component для доступа к контексту языка
// ============================================

"use client";

import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { AIChatWidget } from "@/components/AIChatWidget";
import { useApp } from "@/context/AppContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useApp();

  return (
    <html lang={language.toLowerCase()}>
      <body className="min-h-screen bg-dark-bg text-white antialiased">
        <Providers>
          <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col min-w-0 min-h-screen relative">
              <Header />
              <main className="flex-1 overflow-auto">{children}</main>
              <AIChatWidget />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <LayoutContent>{children}</LayoutContent>;
}