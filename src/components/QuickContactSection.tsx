import { Phone, MessageSquare, MapPin, Navigation, CheckCircle2 } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const QuickContactSection = () => {
  return (
    <section id="gebiet" className="py-16 sm:py-24 bg-[#0C647B] text-white relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact Hero CTA */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          
          <div className="inline-block bg-white/20 text-amber-300 font-extrabold text-sm px-4 py-1.5 rounded-full mb-6">
            Einfach & Direkt
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Keine Lust auf lange Formulare?
          </h2>

          <p className="text-lg sm:text-2xl text-slate-100 leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
            Rufen Sie mich einfach an oder schicken Sie mir ein Foto vom Möbelstück per WhatsApp. Ich antworte Ihnen zügig mit einem festen Preis!
          </p>

          {/* 2 Massive Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            
            {/* WhatsApp Big Button */}
            <a
              href={BRAND_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl shadow-2xl transition-transform hover:scale-105"
            >
              <MessageSquare className="w-6 h-6" />
              <span>Foto per WhatsApp schicken</span>
            </a>

            {/* Phone Call Big Button */}
            <a
              href={`tel:${BRAND_DATA.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-slate-900 font-black text-xl hover:bg-slate-100 shadow-2xl transition-transform hover:scale-105"
            >
              <Phone className="w-6 h-6 text-[#0C647B]" />
              <span>Anrufen: {BRAND_DATA.phoneFormatted}</span>
            </a>

          </div>

        </div>

        {/* Modern, Chic Service Radius & Einsatzgebiet Hub (Clean Designer Layout) */}
        <div className="max-w-5xl mx-auto bg-slate-950/40 backdrop-blur-md rounded-3xl p-6 sm:p-10 border-2 border-white/20 shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                  Regional & Schnell vor Ort
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Mein Einsatzgebiet rund um Nienburg (Weser)
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs sm:text-sm font-extrabold text-white self-start sm:self-auto">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Bis zu 35 km Umkreis</span>
            </div>
          </div>

          {/* 3 Regional Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            
            {/* Card 1 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <div className="text-amber-300 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Kernzone</span>
              </div>
              <div className="font-extrabold text-lg text-white mb-2">
                Stadt Nienburg (Weser)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zentrum, Langendamm, Erichshagen-Wölpe, Holtorf, Schäferhof & alle Ortsteile.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <div className="text-emerald-400 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Landkreis Nienburg</span>
              </div>
              <div className="font-extrabold text-lg text-white mb-2">
                Samtgemeinden & Umland
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Marklohe, Drakenburg, Steimbke, Liebenau, Stolzenau, Heemsen, Hoya, Rehburg-Loccum.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <div className="text-cyan-300 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Erweiterter Radius</span>
              </div>
              <div className="font-extrabold text-lg text-white mb-2">
                Nachbarregionen
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Neustadt am Rübenberge, Verden (Aller), Sulingen, Wunstorf und angrenzende Orte.
              </p>
            </div>

          </div>

          {/* Bottom Reassurance Banner */}
          <div className="flex items-center gap-3 pt-4 text-xs sm:text-sm font-semibold text-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Faire, transparente Festpreise – egal ob Sie mitten in der Stadt oder auf dem Land wohnen!</span>
          </div>

        </div>

      </div>
    </section>
  );
};
