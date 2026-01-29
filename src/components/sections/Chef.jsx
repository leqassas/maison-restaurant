import { useEffect, useRef, useState } from 'react';

export default function Chef() {
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
            id="chef"
            ref={sectionRef}
            className="relative bg-charcoal py-section px-8 overflow-hidden"
        >
            {/* Background nuance */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-charcoal-50 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
                    {/* Left - Image */}
                    <div
                        className={`
              aspect-[3/4] relative overflow-hidden shadow-2xl
              transition-all duration-[1.5s] ease-luxury
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
                    >
                        {/* Image */}
                        <img
                            src="https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Chef Antoine Mercier plating a dish"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-110 sepia-[10%]"
                        />

                        {/* Inner Border */}
                        <div className="absolute inset-6 border border-white/10 z-20" />

                        {/* Overlay vignette */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal/40 mix-blend-multiply z-10" />

                        {/* Signature */}
                        <div className="absolute bottom-10 right-10 text-right z-30">
                            <span className="font-editorial text-white/60 text-sm tracking-widest uppercase block mb-1">
                                Antoine Mercier
                            </span>
                            <span className="font-sans text-white/30 text-xs tracking-widest uppercase">
                                Chef Patron
                            </span>
                        </div>
                    </div>

                    {/* Right - Text content */}
                    <div
                        className={`
              transition-all duration-[1.5s] ease-luxury delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-px bg-gold" />
                            <span className="text-gold text-xs tracking-[0.4em] uppercase">
                                The Philosophy
                            </span>
                        </div>

                        <h2 className="font-editorial text-7xl lg:text-8xl text-cream mb-12 leading-[0.9]">
                            Silence in the<br />
                            <span className="text-cream/20">Kitchen.</span>
                        </h2>

                        <div className="space-y-8 max-w-lg">
                            <p className="text-cream/70 text-lg leading-relaxed font-light">
                                "Great cooking is not performance—it is patience. It is listening to an
                                ingredient until it tells you what it wants to become."
                            </p>

                            <p className="text-cream/50 text-base leading-relaxed">
                                At Maison, we cook without ego. The technique exists only to reveal,
                                never to obscure. The flame serves the fish. The knife honors the vegetable.
                            </p>

                            <p className="text-cream/50 text-base leading-relaxed">
                                Every evening, the question remains the same: have we said enough?
                                Have we said too much? The answer lies on your plate.
                            </p>
                        </div>

                        {/* Signature line */}
                        <div className="mt-16 pt-8 border-t border-white/10 inline-block pr-24">
                            <span className="font-editorial text-cream/40 italic text-2xl">
                                A.M.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
