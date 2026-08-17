import { Phone, MessageSquare } from 'lucide-react';
import { BRAND_DATA } from '../data/content';

export const StickyMobileBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-slate-300 p-3 shadow-[0_-10px_25px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={`tel:${BRAND_DATA.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-900 text-white font-black text-sm active:bg-slate-800 shadow"
        >
          <Phone className="w-5 h-5 text-emerald-400" />
          <span>Anrufen</span>
        </a>

        <a
          href={BRAND_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 text-white font-black text-sm active:bg-emerald-700 shadow-md"
        >
          <MessageSquare className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
