import React from 'react';
import { MapPin, Navigation, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { BRAND_DATA, SERVICE_LOCATIONS } from '../data/content';

export const ServiceAreaSection: React.FC = () => {
  return (
    <section id="gebiet" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-brand-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-500/20 text-brand-teal-300 border border-brand-teal-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                <Navigation className="w-4 h-4" />
                <span>Regional vor Ort</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Einsatzgebiet in Nienburg & Umgebung
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Ich bin im gesamten Landkreis Nienburg (Weser) sowie in den angrenzenden Regionen für Sie im Einsatz. Schnelle Anfahrt, flexible Termine und faire Konditionen direkt vor Ihrer Haustür.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={BRAND_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Termin in meinem Ort anfragen</span>
                </a>
                <a
                  href={`tel:${BRAND_DATA.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-teal-300" />
                  <span>{BRAND_DATA.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Right Towns Pill Grid */}
            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Städte & Gemeinden im Einsatzgebiet:</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICE_LOCATIONS.map((loc, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{loc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-slate-300">
                  📍 <em>Ihr Ort nicht aufgelistet? Fragen Sie einfach kurz nach – in den meisten Fällen lässt sich das problemlos einrichten!</em>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
