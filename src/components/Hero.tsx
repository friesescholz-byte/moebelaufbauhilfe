import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Wrench, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

const HERO_SLIDES = [
  {
    url: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/drive/IMG-20260813-WA0006_ergebnis.webp",
  },
  {
    url: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/drive/IMG-20260319-WA0000_ergebnis.webp",
  },
  {
    url: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/drive/IMG-20260715-WA0000_ergebnis.webp",
  },
  {
    url: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/566228463_24962822413366882_8069612601508198053_n_ergebnis.webp",
  },
  {
    url: "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/moebelaufbauhilfe/pexels-mart-production-7491109_ergebnis.webp",
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[#FCFAF6]">
      
      {/* Background Slideshow Canvas on Right Half with Designer Blend */}
      <div className="absolute inset-0 z-0">
        
        {/* Crossfading Background Images */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transition-transform duration-[7000ms]`}
          >
            <img
              src={slide.url}
              alt="Möbelaufbauhilfe Nienburg"
              className="w-full h-full object-cover object-center lg:object-right"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Designer Horizontal Gradient Blend (Left Solid to Right Open Image) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FCFAF6] via-[#FCFAF6]/90 via-48% to-transparent/15" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-[#FCFAF6]" />

        {/* Mobile / Tablet Blend */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#FCFAF6] via-[#FCFAF6]/95 via-65% to-[#FCFAF6]/60" />

        {/* Designer Transition Downwards into the Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Conversion Column */}
          <div className="lg:col-span-7 flex flex-col items-start pt-2 lg:pt-0">
            
            {/* Region Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal-50 border border-brand-teal-200/80 text-brand-teal-800 text-sm font-extrabold mb-5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Nienburg (Weser) & Umkreis &bull; von Nikolai</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] mb-5">
              Möbel gekauft? <br />
              <span className="text-[#0C647B]">Ich baue sie für Sie auf.</span>
            </h1>

            {/* Clean Subline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-medium leading-snug mb-6 max-w-xl">
              Egal ob <strong className="text-slate-950 font-bold">IKEA PAX-Schrank</strong>, gemütliches Bett oder <strong className="text-slate-950 font-bold">Spielturm im Garten</strong>: Ich erledige die Montage schnell, gerade und besenrein.
            </p>

            {/* Slogan Box */}
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-brand-teal-200 shadow-sm mb-7 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-brand-teal-50 flex items-center justify-center text-brand-teal-600 flex-shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-teal-700 uppercase tracking-wider">Mein Versprechen:</div>
                <div className="text-base sm:text-lg font-black text-slate-900">
                  „Du bringst die Möbel – ich bringe das Werkzeug!“
                </div>
              </div>
            </div>

            {/* Giant Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full max-w-lg mb-7">
              
              {/* WhatsApp Button */}
              <a
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-600/25 transition-all hover:scale-105 text-center"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Foto per WhatsApp</span>
              </a>

              {/* Phone Button */}
              <a
                href={`tel:${BRAND_DATA.phone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-base sm:text-lg border-2 border-slate-300 hover:border-brand-teal-500 shadow-sm transition-all text-center"
              >
                <Phone className="w-5 h-5 text-brand-teal-600" />
                <span>{BRAND_DATA.phoneFormatted}</span>
              </a>

            </div>

            {/* 3 Quick Checkpoints */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-lg">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Werkzeug da</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Fester Preis</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span>Besenrein</span>
              </div>
            </div>

          </div>

          {/* Right Area: Open view */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>

      </div>

      {/* Decorative Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 sm:h-16 text-white fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

    </section>
  );
};
