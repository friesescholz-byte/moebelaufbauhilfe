import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80' 
          : 'bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name (Never compressed / flex-shrink-0) */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-brand-teal-500 shadow-sm bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105 flex-shrink-0">
              <img 
                src={BRAND_DATA.logoUrl} 
                alt="Möbelaufbauhilfe Nienburg Logo – Nikolai Minko" 
                title="Möbelaufbauhilfe Nienburg Logo"
                className="w-full h-full object-contain"
                loading="eager"
                decoding="async"
                width={48}
                height={48}
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-black text-base sm:text-lg text-slate-950 tracking-tight leading-none">
                MÖBELAUFBAUHILFE
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-brand-teal-700 mt-0.5">
                Nienburg &bull; Nikolai Minko
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Spacious, Single-Line, Clean) */}
          <nav className="hidden xl:flex items-center gap-7">
            <a 
              href="#vorteile" 
              className="text-sm font-extrabold text-slate-700 hover:text-[#0C647B] transition-colors whitespace-nowrap"
            >
              So geht's
            </a>
            <a 
              href="#leistungen" 
              className="text-sm font-extrabold text-slate-700 hover:text-[#0C647B] transition-colors whitespace-nowrap"
            >
              Leistungen
            </a>
            <a 
              href="#galerie" 
              className="text-sm font-extrabold text-slate-700 hover:text-[#0C647B] transition-colors whitespace-nowrap"
            >
              Galerie
            </a>
            <a 
              href="#gebiet" 
              className="text-sm font-extrabold text-slate-700 hover:text-[#0C647B] transition-colors whitespace-nowrap"
            >
              Einsatzgebiet
            </a>
            <a 
              href="#kontakt" 
              className="text-sm font-extrabold text-brand-teal-700 hover:text-brand-teal-800 transition-colors whitespace-nowrap bg-brand-teal-50 px-3 py-1.5 rounded-xl border border-brand-teal-200/70"
            >
              Angebot anfordern
            </a>
            <a 
              href="#faq" 
              className="text-sm font-extrabold text-slate-700 hover:text-[#0C647B] transition-colors whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Direct Action Buttons (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            
            {/* Phone Button */}
            <a 
              href={`tel:${BRAND_DATA.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 font-extrabold text-xs sm:text-sm hover:border-[#0C647B] hover:text-[#0C647B] shadow-sm transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#0C647B]" />
              <span>01575 6311853</span>
            </a>

            {/* WhatsApp CTA Button */}
            <a 
              href={BRAND_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a 
              href={`tel:${BRAND_DATA.phone}`}
              className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm flex items-center justify-center sm:hidden"
              aria-label="Anrufen"
            >
              <Phone className="w-4 h-4" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="hidden sm:inline">Menü</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Compact Tablet Overlay Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xl px-5 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2.5 max-w-lg mx-auto">
            <a 
              href="#vorteile" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 py-3 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>So einfach geht's</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#leistungen" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 py-3 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Möbelarten & Leistungen</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#galerie" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 py-3 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Fotos meiner Montagen</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#gebiet" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 py-3 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Einsatzgebiet Nienburg</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#kontakt" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-brand-teal-800 bg-brand-teal-50 py-3 px-3 rounded-xl flex items-center justify-between border border-brand-teal-200"
            >
              <span>Kostenloses Angebot anfordern</span>
              <ArrowRight className="w-4 h-4 text-brand-teal-600" />
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-800 py-3 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Häufige Fragen (FAQ)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <a 
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-base shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Foto per WhatsApp schicken</span>
              </a>
              <a 
                href={`tel:${BRAND_DATA.phone}`}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 font-black text-base shadow-sm"
              >
                <Phone className="w-5 h-5 text-brand-teal-600" />
                <span>Anrufen: 01575 6311853</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
