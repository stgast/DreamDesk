// ============================================
// DreamDesk — Страница профиля (/profile)
// Dark Minimalism + Soft UI Auth & Profile
// ============================================

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginForm } from "@/components/profile/LoginForm";
import { RegisterForm } from "@/components/profile/RegisterForm";
import { ProfileView, type MockSetup } from "@/components/profile/ProfileView";
import type { SavedConfig } from "@/lib/saved-configs";
import { loadSavedConfigs, deleteSavedConfig as removeConfig } from "@/lib/saved-configs";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [userData, setUserData] = useState<{ image?: string | null; name?: string | null } | null>(null);
  
  // Avatar states
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Layout Parallax State
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load user profile from API
  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/user/me")
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [session]);

  // Load configs
  useEffect(() => {
    if (session?.user) {
      fetch("/api/setups")
        .then((res) => res.json())
        .then((data) => {
          if (data.setups) {
            setConfigs(
              data.setups.map((s: any) => ({
                id: s.id,
                name: s.name,
                items: s.items || [],
                totalPrice: s.totalPrice || 0,
                savedAt: s.createdAt,
              }))
            );
          }
        })
        .catch(() => setConfigs([]));
    } else {
      setConfigs(loadSavedConfigs());
    }
  }, [session]);

  // Real-time setup sync listener
  useEffect(() => {
    const handleNewSetup = (e: any) => {
      const newSetup = e.detail?.setup;
      if (newSetup) {
        setConfigs((prev) => {
          // Check if it already exists (to avoid doubles)
          if (prev.some(s => s.id === newSetup.id)) return prev;
          
          const mapped = {
            id: newSetup.id,
            name: newSetup.name,
            items: newSetup.items ? (typeof newSetup.items === 'string' ? JSON.parse(newSetup.items) : newSetup.items) : [],
            totalPrice: newSetup.totalPrice || 0,
            savedAt: newSetup.createdAt,
          };
          return [mapped, ...prev];
        });
      }
    };

    window.addEventListener("dreamdesk-setup-saved", handleNewSetup);
    return () => window.removeEventListener("dreamdesk-setup-saved", handleNewSetup);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Sensitivity
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  const handleGoogleSignIn = () => signIn("google");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setAvatarPreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !session?.user) return;
    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", avatarFile);
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await update(); 
        const meRes = await fetch("/api/user/me");
        const meData = await meRes.json();
        setUserData(meData);
        setAvatarFile(null);
        setAvatarPreview("");
      }
    } catch {
      console.error("Avatar upload failed");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setConfigs([]);
  };

  const handleDeleteSetup = async (id: string) => {
    if (!confirm("Удалить эту сборку?")) return;
    if (session?.user) {
      try {
        const res = await fetch(`/api/setups/${id}`, { method: "DELETE" });
        if (res.ok) setConfigs(configs.filter((c) => c.id !== id));
      } catch {
        console.error("Delete failed");
      }
    } else {
      removeConfig(id);
      setConfigs(loadSavedConfigs());
    }
  };

  const handleUpdateSetup = (id: string, updates: any) => {
    setConfigs((prev) => 
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#121318] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // --- AUTHENTICATED VIEW ---
  if (session?.user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#121318] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <ProfileView
            userName={userData?.name || session.user.name || session.user.email || "User"}
            userEmail={session.user.email || ""}
            userImage={userData?.image || ""}
            onLogout={handleLogout}
            setups={
              configs.map((c) => ({
                id: c.id,
                name: c.name,
                price: c.totalPrice,
                devices: c.items?.length || 0,
                date: c.savedAt,
                items: c.items, // Pass raw items for modal details
              })) as MockSetup[]
            }
            onDeleteSetup={handleDeleteSetup}
            onUpdateSetup={handleUpdateSetup}
            avatarFile={avatarFile}
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
            onAvatarUpload={handleAvatarUpload}
            avatarUploading={avatarUploading}
          />
        </div>
      </div>
    );
  }

  // --- UNAUTHENTICATED PREMIUM DARK MINIMALISM VIEW ---
  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-[calc(100vh-80px)] w-full flex bg-[#050507] relative overflow-hidden text-gray-200"
    >
      
      {/* Subtle Background Grid (Dark Minimalism) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
        aria-hidden="true"
      />

      {/* LEFT COLUMN: Deep Negative Space & Single Soft Glow */}
      <div className="hidden lg:flex w-[55%] relative z-0 flex-col justify-center px-16 xl:px-24">
        
        {/* Parallax Container for the Orb */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
          style={{ transform: `translate3d(${mousePos.x * 2}px, ${mousePos.y * 2}px, 0)` }}
        >
          {/* Subtle Outer Glow */}
          <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-[pulse-slow]" />
          
          {/* Main Central Soft Sphere */}
          <div className="relative z-10 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/80 via-purple-500/60 to-cyan-400/40 blur-[40px] shadow-[0_0_150px_rgba(99,102,241,0.2)] mix-blend-screen" />
          
          {/* Core Solid Light */}
          <div className="absolute z-20 w-32 h-32 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-[20px] shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]" />
        </div>

        {/* Minimalist Text (Staggered Fade-Up) */}
        <div className="relative z-20 mt-32 max-w-lg">
          <div className="overflow-hidden mb-6 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
            <h2 className="text-5xl xl:text-6xl font-black tracking-tighter leading-[1.1] font-headline text-white">
              Собери идеальный<br/>
              сетап. Шаг за шагом.
            </h2>
          </div>
          <div className="overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-lg text-gray-500 leading-relaxed font-body">
              Ваш умный гид по миру профессиональной периферии. Сравнение, синхронизация, AI-рекомендации.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Soft UI Auth Card */}
      <div 
        className="w-full lg:w-[45%] relative z-20 flex items-center justify-center p-6 sm:p-12 transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0)` }}
      >
        {mode === "login" ? (
          <LoginForm
            onSwitchToRegister={() => setMode("register")}
            onGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={() => setMode("login")}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </div>

    </div>
  );
}
