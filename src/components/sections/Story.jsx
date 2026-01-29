import { useEffect, useRef, useState } from 'react';

export default function Story() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="story"
            ref={sectionRef}
            className="relative bg-charcoal py-section px-8"
        >
            <div className="max-w-5xl mx-auto">
                {/* Section label */}
                <span
                    className={`
            block text-gold/60 text-xs tracking-[0.3em] uppercase mb-8
            transition-all duration-1500 ease-luxury
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
                    Philosophy
                </span>

                {/* Main content grid */}
                <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left column - Pull quote */}
                    <div
                        className={`
              transition-all duration-1500 ease-luxury delay-100
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
                    >
                        <blockquote className="font-editorial text-heading text-cream leading-tight">
                            "The dish is merely a vessel. What we serve is memory,
                            <span className="text-gold"> intention</span>,
                            and the quiet reverence of craft."
                        </blockquote>
                    </div>

                    {/* Right column - Body text */}
                    <div
                        className={`
              transition-all duration-1500 ease-luxury delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
                    >
                        <p className="text-cream/60 text-lg leading-relaxed mb-8">
                            Maison is not a restaurant in the conventional sense. It is a dialogue between
                            the land and the table—a meditation on what it means to nourish, to gather,
                            to elevate the ordinary into something worth remembering.
                        </p>
                        <p className="text-cream/60 text-lg leading-relaxed mb-8">
                            Each evening, we present a single tasting menu. No choices, no substitutions.
                            This is not restriction—it is an invitation to trust. To surrender to the
                            narrative of the season.
                        </p>
                        <p className="text-cream/40 text-base leading-relaxed">
                            Our ingredients travel briefly. Many have never left the soil of the
                            surrounding countryside. The fish knows the cold waters of the morning catch.
                            The herbs still carry the warmth of the afternoon sun.
                        </p>
                    </div>
                </div>

                {/* Decorative element */}
                <div
                    className={`
            w-full h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent mt-section
            transition-all duration-1500 ease-luxury delay-500
            ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}
                />
            </div>
        </section>
    );
}
