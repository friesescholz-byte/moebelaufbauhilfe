import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Name */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-brand-teal-500 shadow-sm bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
              <img 
                src={BRAND_DATA.logoUrl} 
                alt="Möbelaufbauhilfe Nienburg Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                MÖBELAUFBAUHILFE
              </span>
              <span className="text-xs sm:text-sm font-bold text-brand-teal-600 mt-1">
                Nienburg &bull; von Nikolai
              </span>
            </div>
          </a>

          {/* Big Direct Action Buttons on Desktop */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Direct Phone Call Button */}
            <a 
              href={`tel:${BRAND_DATA.phone}`}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-900 font-extrabold text-sm sm:text-base hover:border-brand-teal-500 hover:text-brand-teal-700 shadow-sm transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-brand-teal-50 flex items-center justify-center text-brand-teal-600">
                <Phone className="w-4 h-4" />
              </div>
              <span>{BRAND_DATA.phoneFormatted}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a 
              href={BRAND_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp schreiben</span>
            </a>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a 
              href={`tel:${BRAND_DATA.phone}`}
              className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm flex items-center gap-1.5 text-xs font-bold"
              aria-label="Anrufen"
            >
              <Phone className="w-4 h-4" />
              <span>Anrufen</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-800"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-2xl px-5 py-6">
          <nav className="flex flex-col gap-4">
            <a 
              href="#vorteile" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-slate-800 py-2 border-b border-slate-100"
            >
              So einfach geht's
            </a>
            <a 
              href="#leistungen" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-slate-800 py-2 border-b border-slate-100"
            >
              Möbelarten & Leistungen
            </a>
            <a 
              href="#galerie" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-slate-800 py-2 border-b border-slate-100"
            >
              Fotos & Echte Arbeiten
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-slate-800 py-2 border-b border-slate-100"
            >
              Häufige Fragen
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <a 
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-base shadow"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Foto per WhatsApp schicken</span>
              </a>
              <a 
                href={`tel:${BRAND_DATA.phone}`}
                className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-brand-teal-600 text-white font-extrabold text-base shadow"
              >
                <Phone className="w-5 h-5" />
                <span>Anrufen: {BRAND_DATA.phoneFormatted}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
