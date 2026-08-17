import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { SIMPLE_SERVICES } from '../data/content';

export const ServicesSection = () => {
  return (
    <section id="leistungen" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-sm font-extrabold text-brand-teal-700 uppercase tracking-wider mb-2">
            Meine Leistungen
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Was darf ich für Sie aufbauen?
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mt-3">
            Große Schränke, Garten-Spieltürme, Betten oder Wohnwände – fachgerecht & stabil.
          </p>
        </div>

        {/* 4 Large Services Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SIMPLE_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Giant Image Header */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-300 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-white/20">
                  {service.badge}
                </div>
              </div>

              {/* Content Box with Large Readable Text */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3 mb-8">
                    {service.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-3 text-sm sm:text-base font-bold text-slate-900">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Big Direct Card CTA */}
                <a
                  href={`https://wa.me/4915756311853?text=Hallo%20Nikolai%2C%20ich%20m%C3%B6chte%20einen%20Preis%20f%C3%BCr%20folgende%20Leistung%20anfragen%3A%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-brand-teal-50 hover:bg-brand-teal-500 text-brand-teal-800 hover:text-white border-2 border-brand-teal-300 hover:border-brand-teal-500 font-black text-base shadow-sm transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Dafür Festpreis anfragen</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
