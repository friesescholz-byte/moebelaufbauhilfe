import { ShieldCheck, Clock, Wrench, Sparkles, UserCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const WhyNikolaiSection = () => {
  const steps = [
    {
      step: "01",
      title: "Foto oder Link schicken",
      description: "Schicken Sie mir einfach ein Foto vom Möbelstück, dem Kartonstapel oder den Link aus dem Onlineshop per WhatsApp.",
      icon: "📱"
    },
    {
      step: "02",
      title: "Festpreis & Wunschtermin",
      description: "Sie erhalten in kürzester Zeit ein verbindliches Festpreis-Angebot und wir stimmen einen passenden Termin ab.",
      icon: "📅"
    },
    {
      step: "03",
      title: "Entspannt zurücklehnen",
      description: "Ich komme mit eigenem Profi-Werkzeug, baue alles zügig und millimetergenau auf und hinterlasse die Wohnung besenrein.",
      icon: "🛋️"
    }
  ];

  const guarantees = [
    {
      title: "100% Festpreis-Garantie",
      description: "Keine versteckten Anfahrtsgebühren oder plötzlichen Aufschläge. Was vereinbart ist, gilt.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Komplettes Werkzeug inklusive",
      description: "Sie müssen absolut nichts bereitlegen. Vom Profi-Schrauber bis zum Spezialdübel habe ich alles im Gepäck.",
      icon: <Wrench className="w-6 h-6 text-brand-teal-500" />
    },
    {
      title: "Pünktlichkeit & Zuverlässigkeit",
      description: "Termine sind heilig. Wenn wir 14:00 Uhr vereinbaren, stehe ich um 14:00 Uhr vor Ihrer Tür.",
      icon: <Clock className="w-6 h-6 text-amber-500" />
    },
    {
      title: "Besenreine Übergabe",
      description: "Kein Styropor- oder Schraubenchaos im Raum. Kartons werden sauber und platzsparend gefaltet.",
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FCFAF6] relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Step Process Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-50 border border-brand-teal-200 text-brand-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-4 h-4" />
            <span>So einfach funktioniert's</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            In 3 einfachen Schritten zum fertigen Möbelstück
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Keine zeitraubenden Formulare, keine Vorauskasse. Einfach, direkt und transparent.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft relative flex flex-col justify-between hover:border-brand-teal-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-4xl font-black text-brand-teal-100">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              {idx < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-brand-teal-500 text-white flex items-center justify-center shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* The 4 Guarantees Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Die 4 Nikolai-Garantien
            </h3>
            <p className="text-sm text-slate-500">
              Weil Vertrauen im Handwerk das Wichtigste ist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FCFAF6] border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {g.icon}
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">{g.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={BRAND_DATA.logoUrl} 
                alt="Möbelaufbauhilfe" 
                className="w-12 h-12 rounded-full border border-slate-200"
              />
              <div>
                <div className="font-bold text-sm text-slate-900">Möbelaufbauhilfe Nienburg – von Nikolai</div>
                <div className="text-xs text-slate-500">Ihr verlässlicher Partner in der Nachbarschaft</div>
              </div>
            </div>

            <a
              href={BRAND_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direkt via WhatsApp anfragen</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
