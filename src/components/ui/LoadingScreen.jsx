import { useEffect, useState } from 'react';

export default function LoadingScreen({ progress, onComplete }) {
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            // Add a small delay for dramatic effect even if fast
            const timer = setTimeout(() => {
                setIsFinished(true);
                // Trigger parent callback after animation
                setTimeout(onComplete, 1000);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    return (
        <div
            className={`
                fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center
                transition-transform duration-1000 ease-luxury
                ${isFinished ? '-translate-y-full' : 'translate-y-0'}
            `}
        >
            <div className="relative z-10 text-center">
                <h1 className="font-editorial text-cream text-6xl tracking-widest uppercase mb-8">
                    Maison
                </h1>

                {/* Progress Bar Container */}
                <div className="w-64 h-px bg-white/10 overflow-hidden relative">
                    {/* Progress Fill */}
                    <div
                        className="absolute top-0 left-0 h-full bg-gold transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="block mt-4 text-xs font-mono text-gold/60 tracking-[0.2em]">
                    {progress}%
                </span>
            </div>
        </div>
    );
}
