import { useState } from 'react';
import { ChevronDown, Star, MessageSquare, Phone } from 'lucide-react';
import { FAQ_SIMPLE, BRAND_DATA } from '../data/content';

export const TestimonialsFAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const reviews = [
    {
      name: "Marcus & Sabine",
      town: "Nienburg",
      text: "Großer 3-Meter IKEA PAX Schrank aufgebaut. Nikolai war pünktlich, freundlich und der Schrank steht perfekt gerade. Absolut top!",
      stars: 5
    },
    {
      name: "Familie Weber",
      town: "Steimbke",
      text: "Großer Spielturm im Garten aufgebaut. Hätten wir alleine nie so stabil hinbekommen. Die Kinder sind begeistert!",
      stars: 5
    },
    {
      name: "Christian M.",
      town: "Marklohe",
      text: "Super schnell, fairer Festpreis und kein Müllchaos hinterlassen. Sehr zu empfehlen!",
      stars: 5
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Feedback */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-sm font-extrabold text-brand-teal-700 uppercase tracking-wider mb-2">
              Kundenstimmen
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Das sagen Nachbarn aus der Region
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(r.stars)].map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mb-6">
                    „{r.text}“
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="font-black text-slate-950 block">{r.name}</span>
                  <span className="text-sm font-bold text-brand-teal-600">{r.town}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Häufige Fragen
            </h3>
            <p className="text-slate-600 text-base sm:text-lg mt-2">
              Die wichtigsten Antworten kurz und einfach zusammengefasst:
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_SIMPLE.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-slate-950 text-lg sm:text-xl hover:text-brand-teal-600"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-brand-teal-50 text-brand-teal-600' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-base sm:text-lg text-slate-700 font-medium leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Help Callout */}
          <div className="mt-10 text-center bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm">
            <div className="text-xl font-black text-slate-950 mb-2">
              Sie haben noch eine andere Frage?
            </div>
            <div className="text-base text-slate-600 mb-6">
              Rufen Sie mich einfach an oder schreiben Sie mir kurz bei WhatsApp.
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Nachricht</span>
              </a>
              <a
                href={`tel:${BRAND_DATA.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{BRAND_DATA.phoneFormatted}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
