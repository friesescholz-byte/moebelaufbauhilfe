import React from 'react';
import { X, CheckCircle2, Phone, Mail, Shield, Lock, Server, MessageSquare, Database } from 'lucide-react';
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
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
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
            Möbelaufbauhilfe Nienburg &bull; von Nikolei Minko
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-sm font-black transition-colors cursor-pointer"
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
        <h4 className="font-black text-slate-950 text-base">Angaben gemäß § 5 TMG / § 18 MStV:</h4>
        <p className="font-semibold text-slate-800">
          <strong>Möbelaufbauhilfe Nienburg</strong><br />
          Inhaber: Nikolei Minko<br />
          Einsatzgebiet: Stadt & Landkreis Nienburg (Weser) sowie bis zu 50 km Umkreis<br />
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
          Montage, Aufbau und fachgerechte Aufstellung von Möbeln, Schrank- und Regalsystemen (u. a. IKEA PAX), Betten, Garten-Spielgeräten und Klettertürmen sowie zugehörige Kleinmontagen für Privat- und Geschäftskunden.
        </p>
      </div>

      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">Haftung für Inhalte und Links:</h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für externe Links zu Webseiten Dritter (z. B. Facebook oder externe Messenger-Dienste) können wir keine Gewähr übernehmen; für deren Inhalte ist stets der jeweilige Anbieter verantwortlich.
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
      
      {/* 1. Verantwortlicher */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <h4 className="font-black text-slate-950 text-base mb-1 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-teal-600" />
          <span>1. Name und Kontaktdaten des Verantwortlichen</span>
        </h4>
        <p className="text-slate-700 text-sm leading-relaxed">
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):<br />
          <strong>Möbelaufbauhilfe Nienburg</strong><br />
          Inhaber: Nikolei Minko<br />
          Standort: 31582 Nienburg (Weser)<br />
          Telefon & WhatsApp: {BRAND_DATA.phoneFormatted}<br />
          E-Mail: {BRAND_DATA.email}
        </p>
      </div>

      {/* 2. Datenschutz auf einen Blick */}
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-teal-600" />
          <span>2. Datenschutz auf einen Blick & Verschlüsselung</span>
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Website nutzt aus Sicherheitsgründen eine moderne <strong>SSL/TLS-Verschlüsselung</strong>. Dadurch können Daten, die Sie über unsere Formulare übertragen, nicht von unbefugten Dritten mitgelesen werden.
        </p>
      </div>

      {/* 3. Hosting & CDN */}
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1 flex items-center gap-2">
          <Server className="w-4 h-4 text-brand-teal-600" />
          <span>3. Hosting & Content Delivery Network (Cloudflare)</span>
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-2">
          Diese Website wird gehostet über <strong>Cloudflare Workers & Cloudflare Pages</strong>, einen Dienst der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          Beim Aufruf unserer Seiten werden technisch notwendige Zugriffsdaten (wie IP-Adresse, Datum, Uhrzeit des Abrufs, Browsertyp) über das weltweite Edge-Netzwerk von Cloudflare geleitet, um Ausfallsicherheit, Schutz vor DDoS-Angriffen und extrem kurze Ladezeiten zu gewährleisten. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und fehlerfreien Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübertragung in die USA erfolgt auf Grundlage von Standardvertragsklauseln (SCC) der EU-Kommission sowie des EU-U.S. Data Privacy Framework.
        </p>
      </div>

      {/* 4. Cloudflare Turnstile */}
      <div className="bg-brand-teal-50/70 p-4 rounded-2xl border border-brand-teal-200">
        <h4 className="font-black text-brand-teal-950 text-base mb-1 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-teal-700" />
          <span>4. Cloudflare Turnstile (Spamschutz ohne CAPTCHA)</span>
        </h4>
        <p className="text-brand-teal-900 text-sm leading-relaxed">
          Zum Schutz unseres Kontaktformulars vor missbräuchlicher automatisierter Nutzung (Spam-Bots) nutzen wir <strong>Cloudflare Turnstile</strong>. Turnstile prüft im Hintergrund anhand technischer Parameter (z. B. Mausbewegungen, Browser-Header, IP-Adresse), ob die Eingabe durch einen echten Menschen erfolgt, ohne dass Sie unleserliche Bilder erraten müssen. Es werden keine Cookies für Werbezwecke gesetzt. Rechtsgrundlage ist unser berechtigtes Interesse an der Abwehr von Spam und der IT-Sicherheit unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </div>

      {/* 5. Kontaktformular & Datenerfassung */}
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1 flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-teal-600" />
          <span>5. Kontaktformular & Angebotserstellung</span>
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-2">
          Wenn Sie uns über das Kontaktformular auf unserer Website eine Anfrage senden, werden die von Ihnen eingegebenen Daten (Name, Telefonnummer, E-Mail-Adresse, Angaben zu den Möbeln sowie optional hochgeladene Fotos/Dokumente) erhoben.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          <strong>Zweck & Rechtsgrundlage:</strong> Die Erhebung dient ausschließlich der Bearbeitung Ihrer Montageanfrage, der Kalkulation des Festpreisangebots sowie der Terminabstimmung (Art. 6 Abs. 1 lit. b DSGVO, Durchführung vorvertraglicher Maßnahmen). Zur zuverlässigen Bearbeitung wird die Anfrage an unsere zuständige Postfachadresse übermittelt. Eine Weitergabe an unbefugte Dritte oder zu Werbezwecken findet unter keinen Umständen statt.
        </p>
      </div>

      {/* 6. WhatsApp-Kommunikation */}
      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
        <h4 className="font-black text-emerald-950 text-base mb-1 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>6. Kontaktaufnahme über WhatsApp</span>
        </h4>
        <p className="text-emerald-900 text-sm leading-relaxed">
          Wenn Sie uns freiwillig per WhatsApp kontaktieren (z. B. durch Klicken auf unsere WhatsApp-Schaltflächen), verarbeitet die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland, Ihre Daten. Die Nutzung erfolgt freiwillig zur unkomplizierten Übermittlung von Fotos und Terminanfragen (Art. 6 Abs. 1 lit. a und lit. b DSGVO).
        </p>
      </div>

      {/* 7. Keine Tracking-Cookies */}
      <div>
        <h4 className="font-black text-slate-950 text-base mb-1">7. Keine Marketing- oder Tracking-Cookies</h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          Unsere Website verzichtet bewusst auf Tracking-Pixel (z. B. Google Analytics, Facebook Pixel) und werbliche Profilbildung. Wir respektieren Ihre Privatsphäre.
        </p>
      </div>

      {/* 8. Ihre Rechte */}
      <div>
        <h4 className="font-black text-slate-950 text-base mb-2">8. Ihre Rechte als betroffene Person</h4>
        <ul className="text-slate-600 text-sm space-y-1.5 list-disc list-inside leading-relaxed">
          <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht auf Auskunft über Ihre von uns verarbeiteten Daten.</li>
          <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können unverzüglich die Berichtigung unrichtiger Daten verlangen.</li>
          <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten Daten zu verlangen.</li>
          <li><strong>Einschränkung (Art. 18 DSGVO) & Datenübertragbarkeit (Art. 20 DSGVO)</strong></li>
          <li><strong>Widerspruchsrecht (Art. 21 DSGVO)</strong> gegen die Verarbeitung auf Grundlage berechtigter Interessen.</li>
          <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie können sich jederzeit an die zuständige Aufsichtsbehörde wenden (z. B. Landesbeauftragte für den Datenschutz Niedersachsen).</li>
        </ul>
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
