import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

interface FooterProps {
  onOpenImpressum: () => void;
  onOpenDatenschutz: () => void;
  onOpenBarrierefreiheit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenImpressum, 
  onOpenDatenschutz,
  onOpenBarrierefreiheit
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={BRAND_DATA.logoUrl} 
                alt="Möbelaufbauhilfe Logo" 
                className="w-11 h-11 rounded-full border border-slate-700 bg-white p-0.5"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight">
                  MÖBELAUFBAUHILFE
                </span>
                <span className="text-xs text-brand-teal-400 font-semibold">
                  Nienburg &bull; von {BRAND_DATA.owner}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Ihr zuverlässiger Partner für professionellen Möbelaufbau, IKEA PAX-Systeme, Betten und Spieltürme in Nienburg (Weser) und Umgebung.
            </p>

            <div className="pt-2">
              <a
                href={BRAND_DATA.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Gruppe besuchen</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#vorteile" className="hover:text-white transition-colors">So einfach geht's</a>
              </li>
              <li>
                <a href="#leistungen" className="hover:text-white transition-colors">Leistungen & Möbelarten</a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-white transition-colors">Fotos meiner Montagen</a>
              </li>
              <li>
                <a href="#gebiet" className="hover:text-white transition-colors">Einsatzgebiet Landkreis Nienburg</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Häufige Fragen (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Direktkontakt
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href={`tel:${BRAND_DATA.phone}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-brand-teal-400 flex-shrink-0" />
                  <span>{BRAND_DATA.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a href={BRAND_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white transition-colors text-emerald-400 font-semibold">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp: 01575 6311853</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND_DATA.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-brand-teal-400 flex-shrink-0" />
                  <span>{BRAND_DATA.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-brand-teal-400 flex-shrink-0 mt-0.5" />
                <span>Nienburg (Weser) & bis zu 35 km Umkreis</span>
              </li>
            </ul>
          </div>

          {/* Legal, Accessibility & Service Times */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Rechtliches & Service
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              <strong className="text-slate-300">Montag – Samstag:</strong> 08:00 – 20:00 Uhr<br />
              <span className="text-[11px] text-slate-500">Termine nach Vereinbarung auch kurzfristig möglich.</span>
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <button 
                onClick={onOpenImpressum}
                className="text-left text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Impressum
              </button>
              <button 
                onClick={onOpenDatenschutz}
                className="text-left text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Datenschutzerklärung
              </button>
              <button 
                onClick={onOpenBarrierefreiheit}
                className="text-left text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline flex items-center gap-1 text-emerald-400"
              >
                <span>Erklärung zur Barrierefreiheit</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Agentur Scholz & Friese Credit */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Möbelaufbauhilfe Nienburg – von Nikolai. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Konzipiert & gestaltet von</span>
            <span className="font-bold text-slate-200">Scholz & Friese Webdesign</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
