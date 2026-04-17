"use client";

import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function TermsPage() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.1] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black font-headline text-white mb-4 uppercase tracking-tighter">
            {t("terms_title_main")}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            {t("terms_subtitle")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative rounded-2xl overflow-hidden p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.08] to-white/[0.02] backdrop-blur-lg border border-white/[0.15]" />
          
          <div className="relative z-10 space-y-6 text-on-surface-variant leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("terms_1_title")}</h2>
              <p>
                {t("terms_1_text")}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("terms_2_title")}</h2>
              <p>
                {t("terms_2_text")}
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
                <li>{t("terms_2_list_1")}</li>
                <li>{t("terms_2_list_2")}</li>
                <li>{t("terms_2_list_3")}</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("terms_3_title")}</h2>
              <p>
                {t("terms_3_text")}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{t("terms_4_title")}</h2>
              <p>
                {t("terms_4_text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
