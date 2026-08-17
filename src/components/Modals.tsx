import React from 'react';
import { X, CheckCircle2, Phone, Mail } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, badge, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-9 shadow-2xl border-2 border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100 mb-6">
          <div>
            <span className="inline-block bg-brand-teal-50 text-brand-teal-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              {badge}
            </span>
            <h3 className="text-2xl font-black text-slate-950">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-sm sm:text-base text-slate-700 space-y-6 leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-semibold">
            Möbelaufbauhilfe Nienburg &bull; von Nikolai
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-sm font-black transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export const ImpressumModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Impressum" badge="Rechtliche Angaben">
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
        <h4 className="font-black text-slate-950 text-base">Angaben gemäß § 5 TMG:</h4>
        <p className="font-semibold text-slate-800">
          <strong>Möbelaufbauhilfe Nienburg</strong><br />
          Inhaber: Nikolai<br />
          Standort / Region: Nienburg (Weser) & gesamter Landkreis<br />
          Deutschland
        </p>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-2">Kontaktmöglichkeiten:</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-teal-600" />
            <span><strong>Telefon & WhatsApp:</strong> {BRAND_DATA.phoneFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-teal-600" />
            <span><strong>E-Mail:</strong> {BRAND_DATA.email}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">Gegenstand der Dienstleistung:</h4>
        <p className="text-slate-600 text-sm">
          Montage, Aufbau und fachgerechte Aufstellung von Möbeln, Schrank- und Regalsystemen (u.a. IKEA PAX), Betten, Garten-Spielgeräten und Klettertürmen sowie zugehörige Kleinmontagen.
        </p>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">Verbraucherstreitbeilegung:</h4>
        <p className="text-slate-600 text-sm">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </BaseModal>
  );
};

export const DatenschutzModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Datenschutzerklärung" badge="DSGVO-Konform">
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">1. Datenschutz auf einen Blick</h4>
        <p className="text-slate-600 text-sm">
          Der Schutz Ihrer persönlichen Daten ist uns ein großes Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO).
        </p>
      </div>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
        <h4 className="font-black text-emerald-950 text-base mb-1">2. Kontaktaufnahme per WhatsApp & Telefon</h4>
        <p className="text-emerald-900 text-sm leading-relaxed">
          Wenn Sie uns per WhatsApp, E-Mail oder Anruf kontaktieren, werden Ihre übermittelten Daten (z. B. Rufnummer, Vorname, Fotos von Möbeln, Ort) ausschließlich zur Bearbeitung Ihrer Anfrage und Abstimmung des Montage-Termins verwendet. Eine Weitergabe an Dritte findet unter keinen Umständen statt.
        </p>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">3. Server-Log-Dateien & Sicherheit</h4>
        <p className="text-slate-600 text-sm">
          Diese Website wird auf hochsicheren Servern (Cloudflare / GitHub) betrieben. Es werden keine unnötigen Tracking-Cookies, keine Werbenetzwerke und keine invasiven Analyse-Tools eingesetzt.
        </p>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">4. Ihre Rechte</h4>
        <p className="text-slate-600 text-sm">
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Zweck sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
        </p>
      </div>
    </BaseModal>
  );
};

export const BarrierefreiheitModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Erklärung zur Barrierefreiheit" badge="Barrierearm & Seniorenfreundlich">
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">Unser Anspruch an Barrierefreiheit</h4>
        <p className="text-slate-600 text-sm">
          Die Möbelaufbauhilfe Nienburg ist bestrebt, ihren Webauftritt im Einklang mit den Richtlinien für barrierefreie Webinhalte (<strong>WCAG 2.1 Stufe AA</strong>) sowie dem Barrierefreiheitsstärkungsgesetz (<strong>BFSG</strong>) für alle Menschen – insbesondere für Seniorinnen, Senioren und Menschen mit Seh- oder Bewegungseinschränkungen – einfach zugänglich zu machen.
        </p>
      </div>

      <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h4 className="font-black text-slate-950 text-base">Umgesetzte Maßnahmen:</h4>
        
        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>Große, kontrastreiche Schrift:</strong> Optimale Lesbarkeit ohne Anstrengung der Augen.</span>
        </div>

        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>Einfache Bedienung & große Tasten:</strong> Extra große Klick- und Touchflächen für sichere Bedienung auf Smartphones und Tablets.</span>
        </div>

        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>Verzicht auf komplizierte Formulare:</strong> Direkter Draht per Anruf oder 1-Klick-WhatsApp-Nachricht.</span>
        </div>

        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>Vollständige Tastatur- & Screenreader-Kompatibilität:</strong> Semantisches HTML5 mit beschreibenden Alt-Texten für alle Bilder.</span>
        </div>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">Feedback und Kontakt</h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          Sollten Ihnen Mängel in Bezug auf die barrierefreie Gestaltung unserer Website auffallen, können Sie uns jederzeit kontaktieren:<br />
          <strong>Telefon / WhatsApp:</strong> {BRAND_DATA.phoneFormatted}<br />
          <strong>E-Mail:</strong> {BRAND_DATA.email}
        </p>
      </div>
    </BaseModal>
  );
};
