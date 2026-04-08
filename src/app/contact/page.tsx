export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.1] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black font-headline text-white mb-4 uppercase tracking-tighter">
            Свяжитесь с нами
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Ответим на любые вопросы о DreamDesk и поможем вам создать идеальный сетап.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative rounded-2xl overflow-hidden p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.08] to-white/[0.02] backdrop-blur-lg border border-white/[0.15]" />
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-container/30 flex items-center justify-center mx-auto mb-8 border border-primary/20">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">Email</h2>
            <p className="text-xl text-primary font-mono mb-2 select-all font-bold">support@dreamdesk.com</p>
            <p className="text-on-surface-variant">Мы ответим вам в течение 24 часов</p>
          </div>
        </div>
      </div>
    </div>
  );
}
