import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ progress, onComplete }) {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const lineRef = useRef(null);
    const progressRef = useRef(null);
    const curtainsRef = useRef({ top: null, bottom: null });

    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        // Initial state: hidden elements
        gsap.set(logoRef.current, { opacity: 0, y: 20 });
        gsap.set(lineRef.current, { scaleX: 0 });
        gsap.set(progressRef.current, { opacity: 0 });

        // Initial entrance
        const tl = gsap.timeline();
        tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' })
            .to(lineRef.current, { scaleX: 1, duration: 2, ease: 'expo.inOut' }, '-=1')
            .to(progressRef.current, { opacity: 1, duration: 0.8 }, '-=0.5');

        setIsStarted(true);
    }, []);

    useEffect(() => {
        if (progress === 100 && isStarted) {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            // Brief hold at 100%
            tl.to(progressRef.current, { opacity: 0, duration: 0.5, delay: 0.5 })
                .to(logoRef.current, { opacity: 0, y: -20, duration: 0.8, ease: 'expo.in' }, '-=0.3')
                .to(lineRef.current, { scaleX: 0, duration: 0.8, ease: 'expo.in' }, '-=0.6')
                // Curtain Reveal
                .to(curtainsRef.current.top, { y: '-100%', duration: 1.2, ease: 'power4.inOut' })
                .to(curtainsRef.current.bottom, { y: '100%', duration: 1.2, ease: 'power4.inOut' }, '-=1.2')
                .to(containerRef.current, { visibility: 'hidden', duration: 0 });
        }
    }, [progress, onComplete, isStarted]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
            {/* Curtains */}
            <div
                ref={el => curtainsRef.current.top = el}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-0"
            />
            <div
                ref={el => curtainsRef.current.bottom = el}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-0"
            />

            <div className="relative z-10 text-center">
                <h1
                    ref={logoRef}
                    className="font-editorial text-cream text-5xl md:text-7xl tracking-[0.2em] uppercase mb-6"
                >
                    Maison
                </h1>

                {/* Minimalist Line Loader */}
                <div className="w-48 md:w-64 h-[1px] bg-white/5 overflow-hidden relative mx-auto">
                    <div
                        ref={lineRef}
                        className="absolute inset-0 bg-gold origin-center"
                        style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 0.4s ease-out' }}
                    />
                </div>

                <div
                    ref={progressRef}
                    className="mt-6 font-mono text-[10px] text-gold/40 tracking-[0.4em] uppercase"
                >
                    Extracting Essence — {progress}%
                </div>
            </div>
        </div>
    );
}
