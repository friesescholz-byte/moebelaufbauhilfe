import { MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#074555] to-slate-900 p-8 sm:p-14 lg:p-16 text-white shadow-2xl text-center">
          
          <div className="max-w-3xl mx-auto">
            
            <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Termine kurzfristig verfügbar
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Möbel schon im Wohnzimmer? <br />
              <span className="text-amber-400">Ich kümmere mich drum!</span>
            </h2>

            <p className="text-slate-200 text-lg sm:text-2xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Foto per WhatsApp schicken oder kurz anrufen – und Sie bekommen direkt Ihren Festpreis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl shadow-xl transition-all hover:scale-105"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Foto per WhatsApp senden</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={`tel:${BRAND_DATA.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xl border-2 border-white/30 transition-all"
              >
                <Phone className="w-6 h-6 text-brand-teal-300" />
                <span>{BRAND_DATA.phoneFormatted}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
