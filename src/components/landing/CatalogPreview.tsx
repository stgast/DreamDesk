// ============================================
// DreamDesk — Секция "Превью Каталога"
// ============================================

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function CatalogPreview() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <section className="py-24 px-6 md:px-12 bg-dark-bg border-t border-white/5 relative z-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white uppercase">
            {t("catalog")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[600px]">
          
          {/* Keyboards */}
          <Link href="/catalog?cat=keyboards" className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-2xl block">
             <div className="absolute inset-0 bg-dark-bg" />
             <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WG9Lvpkvp18r8gnwBPNN7DDglYl9DRM-gdeCArFENbAeDiCArgMDn2WD4qYzvn7alJ0KL1xA5YqCo82_1EsEyi7b54vAqZcc31LgjIwAys5LzOVr9eE6RJGD1dPxlCboTaYiK5cq24qdjZATw50EaziDW7d2YZhhfZF72T62hwujeK9wwLmBDj2v0ptvMV2Uo4QFJGJFbv3QIS6lGkG0q92P2kzT3H4Qma797pwcjxvoCr9qXDmKSKk_K9afimu6Yb-NVXNtWcA" 
               alt="Keyboards" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
             <div className="absolute bottom-8 left-8 right-8">
               <h3 className="text-3xl font-bold text-white mb-2 font-headline">{t("keyboards")}</h3>
               <p className="text-gray-300 mb-6 text-sm md:text-base">{t("keyboards_description")}</p>
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary group-hover:text-dark-bg transition-colors">
                  <ArrowRight className="w-5 h-5" />
               </div>
             </div>
          </Link>

          {/* Mice */}
          <Link href="/catalog?cat=mice" className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-xl block">
            <div className="absolute inset-0 bg-dark-bg" />
            <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuCOuoG5YGDyle_OVO24igUae_EEzVKBuDjIgk4gXOoV60HA-UC1eaO3kWuC2nyWsIumhHP1a45ocUSc_0OmfJh2R8CPpOauQ_OI7-RLILi8tVuoUblCJ1nSEYy4pnI6byowzaxU50i6gh7pB4uj9eCbKFNnCvvewmiFsDykuuXKIWWf5XByTK6mSNFoPvW3XFZ3DVVJNOPlGeN3xA2PRbNokAgDmzx40hFFh13l2o_xocJXoR9cez_2ktAnJKpN81yOZKBUNmSSA" 
               alt="Mice" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-1 font-headline">{t("mice")}</h3>
              <p className="text-gray-400 text-sm">{t("mice_description")}</p>
            </div>
          </Link>

          {/* Audio */}
          <Link href="/catalog?cat=headphones" className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-xl block">
            <div className="absolute inset-0 bg-dark-bg" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKoXe3LLLmWqai27QeSMw9foFmJGBgViEhZ4dFpwtXPpVfAhB7rKewcBefsuDViJau7c4lIjbKuVw52kZ0PW6m8OKbSST64YnK-3H92f8AcBCEPkEzZfs07E1AVQLbIvO8lzJqUViEu26Ds3foMnOKVQyqkxa_i56zJ_HZwjheC25A3b9taJA9wW8hbasN7ZioJIR_j3fn9lIywFQBrj1wa0hhri7MtRWjXDcfNKDDEA_VYOonsZevDquxXe7zBJkJbOspp6KME7o" 
              alt="Audio" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-xl font-bold text-white font-headline">{t("audio")}</h4>
            </div>
          </Link>

          {/* Microphones */}
          <Link href="/catalog?cat=microphones" className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-xl block">
            <div className="absolute inset-0 bg-dark-bg" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANbpBs90cumT8Yt6wt_tFLupaLmzWIb5ifkFJmuKNyCexr0Avm-i0nWl-9EQj-eJs7ttj27FUSjYL6gN4iHBKuLKbfZ9OKrd6wjsVoyK7vUoDnZAaRrLDTnfBxGzdKnSWI4o0BbOiAt3OT--Sq3tkVIZS4liQXrZPNSng7zgyF0ACA-QzlubtFdLGSrfdzlsn0yCFirxrHLF4cn_LfcBJrN7lf_oKdp9EhK-iQ20kEcE8ZRvyVfgab8hY8n2zAxDRJaNcTtt-jOFs" 
              alt="Microphones" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-xl font-bold text-white font-headline">{t("microphones")}</h4>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
