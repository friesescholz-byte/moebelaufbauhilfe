import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SimpleStepsSection } from './components/SimpleStepsSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { QuickContactSection } from './components/QuickContactSection';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ImpressumModal, DatenschutzModal, BarrierefreiheitModal } from './components/Modals';

export function App() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [barrierefreiheitOpen, setBarrierefreiheitOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6] text-[#1E293B] antialiased selection:bg-[#0C647B] selection:text-white font-sans text-base">
      
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <SimpleStepsSection />
        <ServicesSection />
        <GallerySection />
        <QuickContactSection />
        <TestimonialsFAQ />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenImpressum={() => setImpressumOpen(true)}
        onOpenDatenschutz={() => setDatenschutzOpen(true)}
        onOpenBarrierefreiheit={() => setBarrierefreiheitOpen(true)}
      />

      {/* Mobile Sticky Bar */}
      <StickyMobileBar />

      {/* Legal Modals */}
      <ImpressumModal 
        isOpen={impressumOpen} 
        onClose={() => setImpressumOpen(false)} 
      />
      <DatenschutzModal 
        isOpen={datenschutzOpen} 
        onClose={() => setDatenschutzOpen(false)} 
      />
      <BarrierefreiheitModal
        isOpen={barrierefreiheitOpen}
        onClose={() => setBarrierefreiheitOpen(false)}
      />

    </div>
  );
}

export default App;
