import React, { useState } from 'react';
import { Send, Upload, CheckCircle2, MessageSquare, Image as ImageIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_DATA } from '../data/content';

export const ContactFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selected].slice(0, 5)); // max 5 files
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSubmitted(true);

    // Open Mailto
    const fileNames = files.map(f => f.name).join(', ');
    const subject = `Möbelaufbau Anfrage von ${name}`;
    const body = `Hallo Nikolai,\n\nName: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\n\nNachricht / Möbel:\n${message}\n\n${fileNames ? `Fotos: ${fileNames}` : ''}`;
    
    window.location.href = `mailto:${BRAND_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const generateWhatsAppFromForm = () => {
    const text = `Hallo Nikolai! Ich möchte eine Anfrage für einen Möbelaufbau stellen:

👤 *Name:* ${name || 'Nicht angegeben'}
📞 *Telefon:* ${phone || 'Nicht angegeben'}
✉️ *E-Mail:* ${email || 'Nicht angegeben'}
📝 *Möbel / Nachricht:* ${message || 'Keine Nachricht'}

${files.length > 0 ? `(Ich sende dir gleich ${files.length} Foto(s) hier im Chat)` : ''}`;

    return `https://wa.me/4915756311853?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="kontakt" className="py-16 sm:py-24 bg-[#FCFAF6] border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-extrabold text-brand-teal-700 uppercase tracking-wider mb-2">
            Schnellkontakt
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Kostenloses Angebot anfordern
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Füllen Sie einfach die kurzen Angaben aus – ich melde mich zügig bei Ihnen mit einem festen Preis.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl relative overflow-hidden">
          
          {submitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="text-base text-slate-600 max-w-md mx-auto mb-6">
                Ich habe Ihre Daten erhalten und melde mich schnellstmöglich bei Ihnen mit einem unverbindlichen Festpreis.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                  setFiles([]);
                }}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-colors cursor-pointer"
              >
                Weitere Anfrage senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Ihr Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z. B. Max Mustermann"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-bold outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Telefonnummer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="z. B. 01575 1234567"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-bold outline-none transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  E-Mail-Adresse (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="z. B. name@beispiel.de"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-bold outline-none transition-all text-sm sm:text-base"
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  Welche Möbel sollen aufgebaut werden? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="z. B. IKEA PAX Schrank (2m breit), 1 Boxspringbett, Aufbau in Nienburg..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-medium outline-none transition-all text-sm sm:text-base resize-y"
                />
              </div>

              {/* Row 4: Photo Upload */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  Fotos / Kaufvertrag anhängen (optional)
                </label>
                
                <div className="relative border-2 border-dashed border-slate-300 hover:border-brand-teal-500 rounded-2xl p-6 text-center bg-slate-50 hover:bg-brand-teal-50/40 transition-all cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white text-brand-teal-600 flex items-center justify-center shadow-sm border border-slate-200">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-slate-800">
                      Foto hier ablegen oder anklicken zum Auswählen
                    </div>
                    <div className="text-xs text-slate-500">
                      PNG, JPG, WEBP (bis zu 5 Fotos)
                    </div>
                  </div>
                </div>

                {/* Selected Files Preview Pills */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 shadow-sm"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-brand-teal-600" />
                        <span className="max-w-[150px] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="w-4 h-4 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-brand-teal-500 hover:bg-brand-teal-600 text-white font-black text-base shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Anfrage jetzt absenden</span>
                </button>

                {/* Alternative WhatsApp Button with form data */}
                <a
                  href={generateWhatsAppFromForm()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Per WhatsApp senden</span>
                </a>

              </div>

              <div className="text-center text-xs text-slate-400 font-medium">
                🔒 Ihre Daten werden absolut vertraulich behandelt und niemals weitergegeben.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
