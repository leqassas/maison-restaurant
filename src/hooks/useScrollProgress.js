import { useState, useEffect, useCallback } from 'react';

export function useScrollProgress(sectionRef, options = {}) {
    const { offset = 0, clamp = true } = options;
    const [progress, setProgress] = useState(0);
    const [isInView, setIsInView] = useState(false);

    const calculateProgress = useCallback(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;

        // Calculate how far through the section we've scrolled
        const scrollStart = rect.top - windowHeight + offset;
        const scrollEnd = rect.bottom - offset;
        const scrollRange = scrollEnd - scrollStart;

        // Normalize to 0-1 range
        let rawProgress = -scrollStart / scrollRange;

        if (clamp) {
            rawProgress = Math.max(0, Math.min(1, rawProgress));
        }

        setProgress(rawProgress);
        setIsInView(rect.top < windowHeight && rect.bottom > 0);
    }, [sectionRef, offset, clamp]);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(calculateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', calculateProgress);
        calculateProgress(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', calculateProgress);
        };
    }, [calculateProgress]);

    return { progress, isInView };
}

export default useScrollProgress;
