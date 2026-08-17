import { MessageSquare, Calendar, Smile, ArrowRight, Phone, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const SimpleStepsSection = () => {
  const steps = [
    {
      stepNumber: "1",
      title: "Foto oder Modell senden",
      description: "Schicken Sie mir einfach ein Foto vom Möbelstück / Karton per WhatsApp oder rufen Sie mich kurz an.",
      icon: <MessageSquare className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      stepNumber: "2",
      title: "Festpreis & Termin erhalten",
      description: "Sie bekommen sofort ein klares, faires Festpreisangebot. Keine versteckten Kosten, keine Überraschungen.",
      icon: <Calendar className="w-8 h-8 text-brand-teal-600" />,
      color: "bg-brand-teal-50 border-brand-teal-200"
    },
    {
      stepNumber: "3",
      title: "Entspannt zurücklehnen",
      description: "Ich komme mit vollem Profi-Werkzeug zu Ihnen, baue alles auf und hinterlasse den Raum besenrein.",
      icon: <Smile className="w-8 h-8 text-amber-600" />,
      color: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section id="vorteile" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-sm font-extrabold text-brand-teal-700 uppercase tracking-wider mb-2">
            In 3 einfachen Schritten
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            So einfach funktioniert's
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mt-3">
            Keine komplizierten Formulare. Ein kurzer Anruf oder eine WhatsApp-Nachricht genügt!
          </p>
        </div>

        {/* 3 Giant Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl p-8 border-2 shadow-sm flex flex-col justify-between ${s.color} hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-200">
                    {s.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-400/50">
                    0{s.stepNumber}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 mb-3">
                  {s.title}
                </h3>
                
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clean, Professional "Über mich" Card (Nikolai - Ihr Möbelmonteur vor Ort) */}
        <div className="bg-[#FAF8F5] rounded-3xl border-2 border-brand-teal-200 shadow-md p-6 sm:p-10 lg:p-12 mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Clean Image Box (Without overlay badges) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-square bg-slate-900 relative group">
                <img
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/pexels-artbovich-6508346_ergebnis.webp"
                  alt="Nikolai - Möbelaufbauhilfe Nienburg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-100 text-brand-teal-800 text-xs font-black uppercase tracking-wider mb-4">
                <UserCheck className="w-4 h-4" />
                <span>Persönlich & Vor Ort</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-4">
                Hallo, ich bin Nikolai – <br />
                <span className="text-[#0C647B]">Ihr Möbelmonteur aus Nienburg.</span>
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium mb-6">
                Hinter der Möbelaufbauhilfe steht kein anonymes Vermittlungsportal, sondern echtes Handwerk aus der Nachbarschaft. Ich berate Sie persönlich, nenne Ihnen faire Festpreise und baue Ihre Möbel mit eigenem Profi-Werkzeug zuverlässig und passgenau auf.
              </p>

              {/* 2 Key Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Persönliche Montage vor Ort</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Pünktlich & 100% besenrein</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={BRAND_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direkt mit mir schreiben</span>
                </a>

                <a
                  href={`tel:${BRAND_DATA.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm border-2 border-slate-300 transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-teal-600" />
                  <span>{BRAND_DATA.phoneFormatted}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Big Action Bar under steps */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xl sm:text-2xl font-black mb-1">
              Haben Sie Möbel, die aufgebaut werden müssen?
            </div>
            <div className="text-slate-300 text-sm sm:text-base">
              Ich bin im gesamten Landkreis Nienburg und bis zu 35 km Umkreis für Sie da.
            </div>
          </div>

          <a
            href={BRAND_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-lg transition-transform hover:scale-105 flex-shrink-0"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Jetzt WhatsApp öffnen</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
