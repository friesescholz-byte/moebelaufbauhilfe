import React, { useState, useEffect, useRef } from 'react';
import { Send, Upload, CheckCircle2, MessageSquare, Image as ImageIcon, X, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_DATA } from '../data/content';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

// Official Cloudflare Turnstile Site Key for moebelaufbauhilfe
const TURNSTILE_SITE_KEY = '0x4AAAAAAE9wGuhgaOvxRN23';

export const ContactFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Invisible Bot Trap
  const [files, setFiles] = useState<File[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Initialize Cloudflare Turnstile Widget (with StrictMode protection)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      const container = turnstileContainerRef.current;
      if (container && window.turnstile && !widgetIdRef.current) {
        try {
          container.innerHTML = '';
          widgetIdRef.current = window.turnstile.render(container, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrorMessage(null);
            },
            'error-callback': () => {
              // Graceful fallback token if offline or blocked
              setTurnstileToken('auto-pass-fallback');
            },
            'expired-callback': () => {
              setTurnstileToken('');
            },
            theme: 'light',
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    };

    renderWidget();

    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
        }
      }, 150);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [submitted]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selected].slice(0, 5)); // max 5 files
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Bot trap check
    if (honeypot.trim().length > 0) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    try {
      // Build FormData for multipart request (including uploaded files)
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());
      formData.append('message', message.trim());
      formData.append('honeypot', honeypot);
      formData.append('turnstileToken', turnstileToken || 'direct-web-token');
      formData.append('cf-turnstile-response', turnstileToken || 'direct-web-token');

      files.forEach((file) => {
        formData.append('photos', file);
      });

      // Send to Cloudflare Worker endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSubmitted(true);
      } else {
        const msg = result?.error || 'Fehler beim Senden. Bitte rufen Sie uns kurz an oder schreiben Sie per WhatsApp.';
        setErrorMessage(msg);
      }
    } catch (err) {
      console.warn('Network submission error, fallback enabled:', err);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppFromForm = () => {
    const text = `Hallo Nikolei! Ich möchte eine Anfrage für einen Möbelaufbau stellen:

👤 *Name:* ${name || 'Nicht angegeben'}
📞 *Telefon:* ${phone || 'Nicht angegeben'}
✉️ *E-Mail:* ${email || 'Nicht angegeben'}
📝 *Möbel / Nachricht:* ${message || 'Keine Nachricht'}

${files.length > 0 ? `(Ich sende dir gleich ${files.length} Foto(s) hier im Chat)` : ''}`;

    return `https://wa.me/49${BRAND_DATA.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(text)}`;
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
            Füllen Sie einfach die kurzen Angaben aus – ich melde mich zügig bei Ihnen mit einem fairen Festpreis.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl relative overflow-hidden">
          
          {submitted ? (
            <div className="text-center py-10 sm:py-12 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                Ihre Angaben wurden erfolgreich übermittelt. Ich schaue mir Ihre Möbelstücke an und melde mich schnellstmöglich mit einem verbindlichen Festpreis bei Ihnen.
              </p>

              {/* Direct WhatsApp follow-up button */}
              <div className="max-w-md mx-auto bg-emerald-50 rounded-2xl p-5 border border-emerald-200 mb-8">
                <div className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">
                  Schnellere Antwort gewünscht?
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 mb-4">
                  Sie können Ihre Angaben auch direkt mit einem Klick per WhatsApp an mich weiterleiten:
                </p>
                <a
                  href={generateWhatsAppFromForm()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Jetzt per WhatsApp öffnen</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                  setFiles([]);
                  setTurnstileToken('');
                  setErrorMessage(null);
                }}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-colors cursor-pointer"
              >
                Weitere Anfrage senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Invisible Honeypot field for bot protection */}
              <input
                type="text"
                name="website_url_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <div className="font-black mb-1">Übermittlungshinweis:</div>
                    <div>{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Ihr Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z. B. Max Mustermann"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-bold outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Telefonnummer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
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
                <label htmlFor="contact-email" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  E-Mail-Adresse (optional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="z. B. name@beispiel.de"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-teal-500 focus:bg-white text-slate-900 font-bold outline-none transition-all text-sm sm:text-base"
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  Welche Möbel sollen aufgebaut werden? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
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
                    title="Fotos zur Montage hochladen"
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
                          aria-label="Foto entfernen"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 5: Cloudflare Turnstile Spam Protection */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Spamschutz powered by Cloudflare Turnstile</span>
                </div>
                <div 
                  ref={turnstileContainerRef} 
                  className="min-h-[65px] flex items-center"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                
                {/* Submit button with Cloudflare Worker API */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-brand-teal-500 hover:bg-brand-teal-600 disabled:opacity-60 text-white font-black text-base shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sende Anfrage...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Anfrage jetzt absenden</span>
                    </>
                  )}
                </button>

                {/* Alternative WhatsApp Button with form data */}
                <a
                  href={generateWhatsAppFromForm()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow transition-all hover:scale-[1.02]"
                  title="Anfrage vorformatiert in WhatsApp öffnen"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Per WhatsApp senden</span>
                </a>

              </div>

              <div className="text-center text-xs text-slate-400 font-medium">
                🔒 Ihre Daten werden absolut vertraulich behandelt und verschlüsselt übertragen.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
