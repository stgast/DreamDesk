import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Desk Setup Builder — Собери своё рабочее место",
  description: "Проектирование станции: каталог периферии, виртуальный стол, AI-рекомендации",
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
          <Sidebar />
          <div className="app-content flex flex-1 flex-col min-w-0 pl-[72px] min-h-screen bg-dark-bg">
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
