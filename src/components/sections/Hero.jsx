export default function Hero() {
    return (
        <section className="relative h-screen bg-charcoal flex items-center justify-center overflow-hidden">
            {/* Cinematic Background - Ken Burns Effect on Static Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 animate-ken-burns"
                    style={{
                        backgroundImage: 'url("https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                    }}
                />
                {/* Texture Overlay to degrade the digital sharpness */}
                <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply" />
            </div>

            {/* Background Gradient (Vignette) */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal z-10 opacity-80" />

            <div className="relative z-20 text-center px-4">
                <span className="block text-gold/60 text-xs md:text-sm tracking-[0.8em] uppercase mb-12 animate-fade-in">
                    Est. 2024
                </span>

                <h1 className="font-editorial text-[18vw] leading-[0.8] text-cream mix-blend-screen animate-fade-in-up">
                    Maison
                </h1>

                <div className="w-px h-24 bg-gold/30 mx-auto mt-12 animate-fade-in" style={{ animationDelay: '500ms' }} />

                <p className="font-sans text-cream/40 text-sm tracking-[0.3em] uppercase mt-12 animate-fade-in" style={{ animationDelay: '800ms' }}>
                    A Journal of Taste
                </p>

                <style>{`
                    @keyframes kenBurns {
                        0% { transform: scale(1) translate(0, 0); }
                        50% { transform: scale(1.1) translate(-2%, -3%); }
                        100% { transform: scale(1) translate(0, 0); }
                    }
                    .animate-ken-burns {
                        animation: kenBurns 40s infinite ease-in-out alternate;
                    }
                `}</style>
            </div>
        </section>
    );
}
