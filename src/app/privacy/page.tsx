"use client";

import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function PrivacyPage() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.1] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black font-headline text-white mb-4 uppercase tracking-tighter">
            {t("privacy_title_main")}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            {t("privacy_subtitle")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative rounded-2xl overflow-hidden p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.08] to-white/[0.02] backdrop-blur-lg border border-white/[0.15]" />
          
          <div className="relative z-10 space-y-6 text-on-surface-variant leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("privacy_intro_title")}</h2>
              <p>
                {t("privacy_intro_text")}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("privacy_data_title")}</h2>
              <p>
                {t("privacy_data_text")}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("privacy_security_title")}</h2>
              <p>
                {t("privacy_security_text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
