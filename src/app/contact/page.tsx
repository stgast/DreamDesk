export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-headline font-bold text-white mb-4">Наши контакты</h1>
        <p className="text-on-surface-variant mb-6">
          Свяжитесь с нами по любым вопросам, касающимся конфигуратора DreamDesk.
        </p>
        <p className="text-primary font-mono select-all">
          support@dreamdesk.com
        </p>
      </div>
    </div>
  );
}
