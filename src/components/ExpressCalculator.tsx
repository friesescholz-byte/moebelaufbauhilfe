import { useState } from 'react';
import { 
  Calculator, 
  Send, 
  MessageSquare, 
  Check, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_DATA } from '../data/content';

export const ExpressCalculator = () => {
  const [furnitureType, setFurnitureType] = useState<string>('pax');
  const [brand, setBrand] = useState<string>('ikea');
  const [extras, setExtras] = useState<string[]>(['kartons']);
  const [location, setLocation] = useState<string>('Nienburg (Weser)');
  const [notes, setNotes] = useState<string>('');

  const furnitureOptions = [
    { id: 'pax', label: 'PAX / Kleiderschrank', icon: '🚪', desc: 'Schiebetür oder Drehtür' },
    { id: 'spielturm', label: 'Spielturm / Klettergerüst', icon: '🎪', desc: 'Outdoor Garten-Montage' },
    { id: 'bett', label: 'Bett / Boxspringbett', icon: '🛏️', desc: 'Inkl. Kopfteil & Lattenrost' },
    { id: 'wohnwand', label: 'Wohnwand / Sideboard', icon: '📺', desc: 'TV-Board & Hängeschränke' },
    { id: 'garten', label: 'Garten- & Loungemöbel', icon: '🌿', desc: 'Terrasse & Balkon' },
    { id: 'sonstiges', label: 'Mehrere Teile / Sonstiges', icon: '📦', desc: 'Komplette Raumeinrichtung' },
  ];

  const brandOptions = [
    { id: 'ikea', label: 'IKEA (PAX, etc.)' },
    { id: 'poco_roller', label: 'Poco / Roller' },
    { id: 'jysk_xxl', label: 'Jysk / XXLutz' },
    { id: 'wickey_fatmoose', label: 'Wickey / FATMOOSE' },
    { id: 'online', label: 'Online bestellt (Amazon/Wayfair)' },
    { id: 'andere', label: 'Andere Marke' },
  ];

  const extraOptions = [
    { id: 'wand', label: 'Wandbefestigung / Dübeln erforderlich' },
    { id: 'abbau', label: 'Altes Möbelstück muss vorher abgebaut werden' },
    { id: 'kartons', label: 'Verpackungsmaterial ordentlich zusammenfalten' },
    { id: 'express', label: 'Möglichst kurzfristiger Termin (Express)' },
  ];

  const toggleExtra = (id: string) => {
    if (extras.includes(id)) {
      setExtras(extras.filter(item => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  const getSelectedFurnitureLabel = () => {
    return furnitureOptions.find(f => f.id === furnitureType)?.label || furnitureType;
  };

  const getSelectedBrandLabel = () => {
    return brandOptions.find(b => b.id === brand)?.label || brand;
  };

  const getSelectedExtrasLabels = () => {
    return extras.map(e => extraOptions.find(opt => opt.id === e)?.label).filter(Boolean);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hallo Nikolai! Ich möchte ein unverbindliches Festpreis-Angebot für meinen Möbelaufbau anfragen:
    
📋 *Möbelart:* ${getSelectedFurnitureLabel()}
🏷️ *Händler / Marke:* ${getSelectedBrandLabel()}
📍 *Ort:* ${location}
✨ *Zusatzwünsche:* ${getSelectedExtrasLabels().join(', ') || 'Keine'}
📝 *Zusatzinfo:* ${notes ? notes : 'Keine weiteren Angaben'}

Bitte nenne mir den Festpreis und wann du Zeit hättest.`;

    return `https://wa.me/4915756311853?text=${encodeURIComponent(text)}`;
  };

  const generateMailtoUrl = () => {
    const subject = `Möbelaufbau Anfrage - ${getSelectedFurnitureLabel()} in ${location}`;
    const body = `Hallo Nikolai,\n\nich möchte ein Festpreis-Angebot anfragen:\n\nMöbelart: ${getSelectedFurnitureLabel()}\nMarke: ${getSelectedBrandLabel()}\nOrt: ${location}\nBesonderheiten: ${getSelectedExtrasLabels().join(', ')}\nNotizen: ${notes}\n\nBitte melden Sie sich bei mir.\n\nViele Grüße`;
    return `mailto:${BRAND_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleTriggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="rechner" className="py-20 lg:py-28 bg-[#F4EFE6] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-amber-700" />
            <span>Interaktiver Schnell-Assistent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Festpreis in 2 Minuten anfragen
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Wähle dein Möbelstück aus – schicke die Daten direkt per WhatsApp oder E-Mail an Nikolai und erhalte blitzschnell dein unverbindliches Festpreisangebot!
          </p>
        </div>

        {/* Main Interactive Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          
          <div className="space-y-8">
            
            {/* Step 1: Möbelart */}
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-teal-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Was soll aufgebaut werden?</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {furnitureOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFurnitureType(opt.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      furnitureType === opt.id
                        ? 'border-brand-teal-500 bg-brand-teal-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-2">{opt.icon}</div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.label}</div>
                      <div className="text-[11px] text-slate-500 hidden sm:block">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Hersteller */}
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-teal-500 text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Wo wurde das Möbelstück gekauft / welcher Hersteller?</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {brandOptions.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBrand(b.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      brand === b.id
                        ? 'border-brand-teal-500 bg-brand-teal-500 text-white font-bold shadow-sm'
                        : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Besonderheiten & Extras */}
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-teal-500 text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Zusatzoptionen & Besonderheiten</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {extraOptions.map((ext) => {
                  const isChecked = extras.includes(ext.id);
                  return (
                    <button
                      key={ext.id}
                      type="button"
                      onClick={() => toggleExtra(ext.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all text-xs font-medium ${
                        isChecked
                          ? 'border-brand-teal-400 bg-brand-teal-50/70 text-brand-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isChecked ? 'bg-brand-teal-500 border-brand-teal-500 text-white' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{ext.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Ort & Notizen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Einsatzort (Stadt / Gemeinde in Nienburg & Umkreis)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="z.B. Nienburg, Marklohe, Steimbke..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200 text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Möbelname, Link oder Notiz (optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="z.B. 2,50m PAX mit Spiegeltüren, 3 Schubladen"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-200 text-sm font-medium outline-none"
                />
              </div>
            </div>

            {/* Summary Box with Direct Submission Actions */}
            <div className="pt-6 border-t border-slate-200">
              
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-amber-200/70 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    Deine ausgewählte Konfiguration:
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Unverbindlich
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {getSelectedFurnitureLabel()} ({getSelectedBrandLabel()}) in <span className="text-brand-teal-700">{location || 'Nienburg'}</span>
                </div>
                {getSelectedExtrasLabels().length > 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    Inklusive: {getSelectedExtrasLabels().join(' • ')}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WhatsApp Button */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleTriggerCelebration}
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] text-center"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Jetzt per WhatsApp senden (Empfohlen)</span>
                </a>

                {/* Email Button */}
                <a
                  href={generateMailtoUrl()}
                  onClick={handleTriggerCelebration}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-teal-500 hover:bg-brand-teal-600 text-white font-bold text-sm shadow-md transition-all text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Per E-Mail anfragen</span>
                </a>

              </div>

              <div className="text-center mt-3">
                <span className="text-[11px] text-slate-500">
                  ⚡ Antwortzeit in der Regel innerhalb von 15 bis 60 Minuten während der Öffnungszeiten.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
