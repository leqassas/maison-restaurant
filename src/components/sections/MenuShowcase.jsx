import { useEffect, useRef, useState } from 'react';
import { menuItems } from '../../data/menu';

// Linear interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function MenuShowcase() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    // Physics state
    const [targetProgress, setTargetProgress] = useState(0);
    const progressRef = useRef(0); // Current interpolated progress
    const velocityRef = useRef(0); // For skew effect

    // 1. Scroll Handler (Sets Target)
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            // Calculate scroll progress (0 to 1) within the container
            const maxScroll = elementHeight - windowHeight;
            const scrollPos = -rect.top;

            let p = scrollPos / maxScroll;
            p = Math.max(0, Math.min(p, 1)); // Clamp

            setTargetProgress(p);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Animation Loop (Lerps to Target)
    useEffect(() => {
        let animationFrame;

        const animate = () => {
            // Lerp current progress towards target
            // 0.05 is the 'weight' factor (lower = heavier/slower)
            const newProgress = lerp(progressRef.current, targetProgress, 0.05);

            // Calculate velocity for effect (skew)
            const velocity = (newProgress - progressRef.current) * 1000; // Amplify for effect
            velocityRef.current = lerp(velocityRef.current, velocity, 0.1); // Smooth velocity too

            progressRef.current = newProgress;

            // Apply transforms efficiently
            if (trackRef.current) {
                // Horizontal Move
                const x = -(newProgress * 100) + (newProgress * 100); // Wait, this logic was weird in previous code.
                // We want to move the track LEFT.
                // At 0 progress: 0 translateX
                // At 1 progress: -(totalWidth - viewportWidth)

                // Let's assume track width is large.
                // We have Intro + Outro + menuItems.length cards.
                // Total cards = menuItems.length + 2.
                // Each card is 100vw wide (w-screen).
                // Total Width = (menuItems.length + 2) * 100vw.
                // Max Translate = Total Width - 100vw. => (Length + 1) * -100vw.

                const totalScreens = menuItems.length + 2;
                const maxTranslateX = (totalScreens - 1) * 100; // in vw units

                const currentTranslateX = -newProgress * maxTranslateX;

                trackRef.current.style.transform = `translateX(${currentTranslateX}vw) skewX(${-velocityRef.current * 0.5}deg)`;
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [targetProgress]);

    return (
        <section
            id="menu"
            ref={sectionRef}
            className="relative h-[600vh] bg-charcoal"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center perspective-1000">

                {/* Decorative background lines */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/5" />
                    <div className="absolute bottom-24 left-0 right-0 h-px bg-gold/5" />
                </div>

                {/* Horizontal Track */}
                <div
                    ref={trackRef}
                    className="flex will-change-transform h-full items-center"
                    style={{
                        // Initial transform set by ref
                    }}
                >
                    {/* Intro Card */}
                    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-24 border-r border-cream/5 relative bg-charcoal z-10">
                        {/* Large decorative Number */}
                        <span className="absolute top-12 left-12 text-[20vw] font-editorial text-charcoal-50 leading-none select-none z-0">
                            00
                        </span>

                        <div className="max-w-4xl text-center relative z-10 mix-blend-screen">
                            <h2 className="font-editorial text-9xl text-cream mb-8">The Collection</h2>
                            <div className="w-full h-px bg-gold/30 mb-8" />
                            <p className="font-sans text-xl text-cream/50 max-w-xl mx-auto leading-relaxed tracking-wide">
                                Curated seasonal expressions. Scroll to explore.
                            </p>
                        </div>
                    </div>

                    {/* Dish Cards */}
                    {menuItems.map((dish, index) => (
                        <div
                            key={dish.id}
                            className="w-screen h-screen flex-shrink-0 grid md:grid-cols-12 border-r border-cream/5 bg-charcoal relative group"
                        >
                            {/* Text Side (5 cols) */}
                            <div className="col-span-12 md:col-span-5 h-full flex flex-col justify-center p-12 lg:p-24 relative z-10 bg-charcoal/95 border-r border-cream/5">
                                <span className="text-gold/60 font-mono text-sm tracking-[0.3em] mb-12 block">
                                    COURSE 0{index + 1}
                                </span>

                                <h3 className="font-editorial text-7xl lg:text-8xl text-cream mb-8 leading-[0.85] w-full">
                                    {dish.name}
                                </h3>

                                <div className="w-12 h-px bg-gold mb-12" />

                                <p className="font-sans text-lg lg:text-xl text-cream/60 font-light leading-relaxed max-w-sm mb-16">
                                    {dish.description}
                                </p>

                                <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-8">
                                    <span className="text-cream/40 text-sm tracking-widest uppercase">{dish.category}</span>
                                    <span className="font-editorial text-4xl text-cream">€{dish.price}</span>
                                </div>
                            </div>

                            {/* Image Side (7 cols) */}
                            <div className="col-span-12 md:col-span-7 h-full relative overflow-hidden bg-charcoal-50 flex items-center justify-center">
                                {/* The 'Plate' Frame */}
                                <div className="relative w-[70%] h-[80%] shadow-2xl overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-out brightness-90 contrast-125">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                        loading="eager"
                                    />
                                    {/* Vignette */}
                                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal/60" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro Card */}
                    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-24 bg-cream text-charcoal border-l border-cream/5">
                        <div className="max-w-4xl text-center">
                            <h2 className="font-editorial text-9xl mb-8 tracking-tighter">Fin</h2>
                            <p className="font-sans text-xl text-charcoal/60 max-w-xl mx-auto leading-relaxed mb-12">
                                We await your presence.
                            </p>
                            <button onClick={() => document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' })} className="px-16 py-6 border border-charcoal hover:bg-charcoal hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-sm">
                                Reserve Table
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
