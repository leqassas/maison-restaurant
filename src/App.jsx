import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import useImagePreloader from './hooks/useImagePreloader';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import MenuShowcase from './components/sections/MenuShowcase';
import Chef from './components/sections/Chef';
import Reservation from './components/sections/Reservation';
import LoadingScreen from './components/ui/LoadingScreen';
import { menuItems } from './data/menu';

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
  const [loadingComplete, setLoadingComplete] = useState(false);
  useLenis();

  // Collect all images to preload
  const imageUrls = [
    // Static section images
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Hero
    'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Chef
    // Dynamic menu images
    ...menuItems.map(item => item.image.src)
  ];

  const { progress } = useImagePreloader(imageUrls);

  return (
    <>
      <LoadingScreen
        progress={progress}
        onComplete={() => setLoadingComplete(true)}
      />

      <main className={`
        relative w-full bg-[#0a0a0a] text-cream antialiased selection:bg-gold selection:text-[#0a0a0a] box-border
        transition-opacity duration-1000
        ${loadingComplete ? 'opacity-100' : 'opacity-0'}
      `}>
        <NoiseOverlay />
        <Header />
        <Hero />
        <Story />
        <MenuShowcase />
        <Chef />
        <Reservation />
        <Footer />
      </main>
    </>
  );
}

export default App;
