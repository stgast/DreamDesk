// ============================================
// DreamDesk — Providers
// ============================================

"use client";

import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/context/AppContext";
import { SetupProvider } from "@/context/SetupContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        <SetupProvider>
          {children}
        </SetupProvider>
      </AppProvider>
    </SessionProvider>
  );
}