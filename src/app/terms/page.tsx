export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.1] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black font-headline text-white mb-4 uppercase tracking-tighter">
            Условия использования
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Прочитайте наши условия перед использованием DreamDesk
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
              <h2 className="text-2xl font-bold text-white mb-3">1. Общие условия</h2>
              <p>
                Используя DreamDesk, вы согласны с этими условиями использования и нашей политикой конфиденциальности. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">2. Использование сервиса</h2>
              <p>
                Вы используете DreamDesk только в личных целях. Вам запрещается:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
                <li>Распространять вредоносный код или атаков на наш сервис</li>
                <li>Использовать автоматизированные инструменты без разрешения</li>
                <li>Нарушать права интеллектуальной собственности</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">3. Ответственность</h2>
              <p>
                DreamDesk предоставляется "как есть". Мы не отвечаем за прямые или косвенные убытки, вытекающие из использования сервиса или невозможности его использования.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">4. Изменения условий</h2>
              <p>
                Мы можем изменять эти условия в любое время. Изменения вступают в силу незамедлительно после публикации на сайте.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
