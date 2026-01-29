import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import MenuShowcase from './components/sections/MenuShowcase';
import Chef from './components/sections/Chef';
import Reservation from './components/sections/Reservation';

// Simple SVG Noise Filter
const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

function App() {
  useLenis();

  return (
    <main className="relative w-full bg-charcoal text-cream antialiased selection:bg-gold selection:text-charcoal box-border">
      <NoiseOverlay />
      <Header />
      <Hero />
      <Story />
      <MenuShowcase />
      <Chef />
      <Reservation />
      <Footer />
    </main>
  );
}

export default App;
