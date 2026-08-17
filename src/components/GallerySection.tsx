import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, MessageSquare, ZoomIn } from 'lucide-react';
import { ALL_GALLERY_IMAGES, BRAND_DATA } from '../data/content';

export const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual scroll with working arrows
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5,
        behavior: 'smooth'
      });
    }
  };

  // We show all images in a smooth scrolling track
  const displayImages = [...ALL_GALLERY_IMAGES, ...ALL_GALLERY_IMAGES];

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="text-sm font-extrabold text-brand-teal-700 uppercase tracking-wider mb-2">
              Eindrücke & Ergebnisse
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Fotos meiner Montagen
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2">
              Klicken Sie auf ein beliebiges Foto für die Großansicht.
            </p>
          </div>

          {/* Working Left & Right Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-brand-teal-500 text-slate-800 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Nach links scrollen"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-brand-teal-500 text-slate-800 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Nach rechts scrollen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* GPU-Accelerated Smooth Slider Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-4 sm:px-8 py-2"
      >
        <div className="animate-marquee gap-5 sm:gap-6">
          {displayImages.map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              onClick={() => setSelectedImg(img.url)}
              className="flex-shrink-0 w-[240px] sm:w-[300px] lg:w-[350px] h-[320px] sm:h-[380px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-slate-200 hover:border-brand-teal-400 transition-all duration-300 relative group cursor-pointer bg-slate-900 flex items-center justify-center"
            >
              {/* Image rendered with unified framing */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />

              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform">
                  <ZoomIn className="w-5 h-5 text-brand-teal-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Zoom Modal (Handles both portrait & landscape perfectly) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl relative border-2 border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors"
              aria-label="Schließen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Large Image Viewport */}
            <div className="flex-1 max-h-[72vh] bg-slate-950 flex items-center justify-center p-2">
              <img
                src={selectedImg}
                alt="Möbelaufbauhilfe Nienburg - Großansicht"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div>
                <div className="font-extrabold text-base sm:text-lg text-slate-950">
                  Möbelaufbauhilfe Nienburg – von Nikolai
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Schnell. Sauber. Stressfrei.
                </div>
              </div>

              <a
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Preis für ähnlichen Aufbau per WhatsApp anfragen</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
