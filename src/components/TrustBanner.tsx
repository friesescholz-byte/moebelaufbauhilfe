export const TrustBanner = () => {
  const brands = [
    { name: "IKEA (PAX, PLATSA, BESTÅ)", badge: "Spezialist" },
    { name: "Poco & Roller", badge: "Montage" },
    { name: "Jysk & XXLutz", badge: "Möbel" },
    { name: "Wickey & FATMOOSE", badge: "Spieltürme" },
    { name: "Bauhaus & Hornbach", badge: "Aufbau" },
    { name: "Home24 & Wayfair", badge: "Online-Möbel" }
  ];

  return (
    <div className="border-y border-slate-200/80 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Montage aller Marken:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            {brands.map((brand, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 hover:border-brand-teal-300 hover:bg-brand-teal-50/50 transition-colors"
              >
                <span>{brand.name}</span>
                <span className="text-[10px] bg-brand-teal-100/80 text-brand-teal-800 px-1.5 py-0.5 rounded font-semibold">
                  {brand.badge}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
