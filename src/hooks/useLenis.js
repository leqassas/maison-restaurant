import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export function useLenis() {
    const lenisRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollVelocity, setScrollVelocity] = useState(0);

    useEffect(() => {
        // Respect reduced motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const lenis = new Lenis({
            duration: prefersReducedMotion ? 0.5 : 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slower, more deliberate scroll
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;
        window.lenis = lenis;

        lenis.on('scroll', ({ progress, velocity }) => {
            setScrollProgress(progress);
            setScrollVelocity(velocity);
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return {
        lenis: lenisRef.current,
        scrollProgress,
        scrollVelocity,
    };
}

export default useLenis;
