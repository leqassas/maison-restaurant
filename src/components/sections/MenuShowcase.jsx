import { useEffect, useRef, useState } from 'react';
import { menuItems } from '../../data/menu';

// Linear interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function MenuShowcase() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [isMobile, setIsMobile] = useState(true); // Default to safe mobile layout

    // Physics state
    const [targetProgress, setTargetProgress] = useState(0);
    const progressRef = useRef(0);
    const velocityRef = useRef(0);

    // Check viewport size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 1. Scroll Handler (Desktop Only)
    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            const maxScroll = elementHeight - windowHeight;
            const scrollPos = -rect.top;

            let p = scrollPos / maxScroll;
            p = Math.max(0, Math.min(p, 1)); // Clamp

            setTargetProgress(p);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // 2. Animation Loop (Desktop Only)
    useEffect(() => {
        if (isMobile) {
            // Reset transforms on mobile
            if (trackRef.current) {
                trackRef.current.style.transform = '';
            }
            return;
        }

        let animationFrame;

        const animate = () => {
            const newProgress = lerp(progressRef.current, targetProgress, 0.05);
            const velocity = (newProgress - progressRef.current) * 1000;
            velocityRef.current = lerp(velocityRef.current, velocity, 0.1);

            progressRef.current = newProgress;

            if (trackRef.current) {
                const totalScreens = menuItems.length + 2;
                const maxTranslateX = (totalScreens - 1) * 100; // in vw units
                const currentTranslateX = -newProgress * maxTranslateX;

                trackRef.current.style.transform = `translateX(${currentTranslateX}vw) skewX(${-velocityRef.current * 0.5}deg)`;
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [targetProgress, isMobile]);

    return (
        <section
            id="menu"
            ref={sectionRef}
            className={`
                relative bg-[#0a0a0a]
                ${isMobile ? 'h-auto overflow-hidden' : 'h-[600vh]'}
            `}
        >
            <div
                className={`
                    w-full flex items-center
                    ${isMobile ? 'flex-col relative h-auto' : 'sticky top-0 h-screen overflow-hidden perspective-1000'}
                `}
            >
                {/* Decorative background lines (Desktop only for performance/cleanliness) */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/5" />
                    <div className="absolute bottom-24 left-0 right-0 h-px bg-gold/5" />
                </div>

                {/* Track Container */}
                <div
                    ref={trackRef}
                    className={`
                        will-change-transform items-center
                        ${isMobile ? 'flex flex-col w-full px-4 py-8 space-y-32' : 'flex h-full'}
                    `}
                    style={isMobile ? { transform: 'none' } : {}}
                >
                    {/* Intro Card */}
                    <div
                        className={`
                            flex-shrink-0 flex items-center justify-center relative bg-charcoal z-10
                            ${isMobile ? 'w-full min-h-[50vh] py-16 border-b border-cream/5 text-center' : 'w-screen h-screen p-24 border-r border-cream/5'}
                        `}
                    >
                        <span className={`
                            font-editorial text-charcoal-50 leading-none select-none z-0
                            ${isMobile ? 'text-[30vw] absolute top-0 left-1/2 -translate-x-1/2' : 'absolute top-12 left-12 text-[20vw]'}
                         `}>
                            00
                        </span>

                        <div className="max-w-4xl relative z-10 mix-blend-screen px-4">
                            <h2 className="font-editorial text-5xl md:text-9xl text-cream mb-4 md:mb-8">The Collection</h2>
                            <div className="w-24 md:w-full h-px bg-gold/30 mb-8 mx-auto" />
                            <p className="font-sans text-lg md:text-xl text-cream/50 max-w-xl mx-auto leading-relaxed tracking-wide">
                                Curated seasonal expressions.
                                {isMobile ? ' Scroll down.' : ' Scroll to explore.'}
                            </p>
                        </div>
                    </div>

                    {/* Dish Cards */}
                    {menuItems.map((dish, index) => (
                        <div
                            key={dish.id}
                            className={`
                                flex-shrink-0 bg-charcoal relative group
                                ${isMobile ? 'w-full flex flex-col-reverse gap-8 py-8 border-b border-cream/5' : 'w-screen h-screen grid md:grid-cols-12 border-r border-cream/5'}
                            `}
                        >
                            {/* Text Side */}
                            <div className={`
                                flex flex-col justify-center relative z-10 bg-charcoal/95
                                ${isMobile ? 'w-full px-4 text-center items-center' : 'col-span-12 md:col-span-5 h-full p-12 lg:p-24 border-r border-cream/5'}
                            `}>
                                <span className="text-gold/60 font-mono text-xs tracking-[0.3em] mb-4 md:mb-12 block">
                                    COURSE 0{index + 1}
                                </span>

                                <h3 className="font-editorial text-6xl md:text-7xl lg:text-8xl text-cream mb-6 md:mb-8 leading-[0.85] w-full">
                                    {dish.name}
                                </h3>

                                <div className="w-12 h-px bg-gold mb-8 md:mb-12 mx-auto md:mx-0" />

                                <p className="font-sans text-base md:text-xl text-cream/60 font-light leading-relaxed max-w-sm mb-8 md:mb-16 mx-auto md:mx-0">
                                    {dish.description}
                                </p>

                                <div className={`
                                    flex items-end justify-between border-t border-white/10 pt-8 w-full
                                    ${isMobile ? 'max-w-xs' : 'mt-auto'}
                                `}>
                                    <span className="text-cream/40 text-sm tracking-widest uppercase">{dish.category}</span>
                                    <span className="font-editorial text-3xl md:text-4xl text-cream">€{dish.price}</span>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className={`
                                relative overflow-hidden bg-charcoal-50 flex items-center justify-center
                                ${isMobile ? 'w-full aspect-square' : 'col-span-12 md:col-span-7 h-full'}
                            `}>
                                <div className={`
                                    relative shadow-2xl overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-out brightness-90 contrast-125
                                    ${isMobile ? 'w-[85%] h-[85%]' : 'w-[70%] h-[80%]'}
                                `}>
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal/60" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro Card */}
                    <div
                        className={`
                            flex-shrink-0 flex items-center justify-center p-12 md:p-24 bg-cream text-charcoal
                            ${isMobile ? 'w-full aspect-[4/5]' : 'w-screen h-screen border-l border-cream/5'}
                        `}
                    >
                        <div className="max-w-4xl text-center">
                            <h2 className="font-editorial text-7xl md:text-9xl mb-8 tracking-tighter">Fin</h2>
                            <p className="font-sans text-lg md:text-xl text-charcoal/60 max-w-xl mx-auto leading-relaxed mb-12 px-4">
                                We await your presence.
                            </p>
                            <button onClick={() => document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' })} className="px-12 py-4 md:px-16 md:py-6 border border-charcoal hover:bg-charcoal hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm">
                                Reserve Table
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
