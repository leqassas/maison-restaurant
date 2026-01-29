import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

// Floating Label Input Component
const FloatingInput = ({ type, label, value, onChange, disabled }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;
    const isActive = isFocused || hasValue;

    return (
        <div className="relative pt-4">
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                className="
                    peer
                    appearance-none
                    w-full px-0 py-3 bg-transparent border-b border-cream/20 
                    text-cream text-lg tracking-wide
                    focus:border-gold focus:outline-none
                    transition-colors duration-500
                    rounded-none
                "
            />
            <label
                className={`
                    absolute left-0 transition-all duration-300 ease-out pointer-events-none
                    ${isActive
                        ? 'top-0 text-xs text-gold/80 tracking-widest uppercase'
                        : 'top-4 text-lg text-cream/40'}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default function Reservation() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        date: '',
        guests: '2',
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            // Check if Supabase is configured
            if (!supabase) {
                // If no keys, just allow simulation (so the site doesn't break for the user instantly)
                console.warn('Supabase not configured. Simulating success.');
                setTimeout(() => {
                    setStatus('success');
                    setFormState({ name: '', email: '', date: '', guests: '2' });
                }, 1500);
                return;
            }

            const { error } = await supabase
                .from('reservations')
                .insert([
                    {
                        name: formState.name,
                        email: formState.email,
                        date: formState.date,
                        guests: parseInt(formState.guests),
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormState({ name: '', email: '', date: '', guests: '2' });

        } catch (error) {
            console.error('Error submitting reservation:', error);
            setStatus('error');
            setErrorMessage('Could not connect. Please try again later.');
        }
    };

    return (
        <section
            id="reservation"
            ref={sectionRef}
            className="relative bg-charcoal py-section px-8"
        >
            {/* Subtle top gradient */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.3), transparent)',
                }}
            />

            <div className="max-w-2xl mx-auto text-center">
                {/* Section label */}
                <span
                    className={`
            block text-gold/60 text-xs tracking-[0.3em] uppercase mb-6
            transition-all duration-1500 ease-luxury
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
                    Reservation
                </span>

                {/* Heading */}
                <h2
                    className={`
            font-editorial text-heading text-cream mb-6
            transition-all duration-1500 ease-luxury delay-100
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
                >
                    {status === 'success' ? 'Request Received' : 'Join Our Table'}
                </h2>

                {/* Description */}
                <p
                    className={`
            text-cream/50 text-lg leading-relaxed mb-12
            transition-all duration-1500 ease-luxury delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
                    {status === 'success'
                        ? 'Thank you. Our concierge will confirm your reservation via email shortly.'
                        : 'We seat just twenty-four guests each evening. Reservations are accepted four weeks in advance.'
                    }
                </p>

                {/* Form or Success Message */}
                {status === 'success' ? (
                    <div className="animate-fade-in-up">
                        <div className="w-16 h-px bg-gold/50 mx-auto my-8" />
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-gold text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                        >
                            Make another request
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className={`
                            transition-all duration-1500 ease-luxury delay-300
                            text-left
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                    >
                        <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <FloatingInput
                                type="text"
                                label="Name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                disabled={status === 'submitting'}
                            />

                            <FloatingInput
                                type="email"
                                label="Email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            {/* Native Date Input styled cleanly */}
                            <div className="relative pt-4">
                                <input
                                    type="date"
                                    value={formState.date}
                                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                                    className="
                                        w-full px-0 py-3 bg-transparent border-b border-cream/20 
                                        text-cream text-lg tracking-wide
                                        focus:border-gold focus:outline-none
                                        transition-colors duration-500
                                        rounded-none
                                        [color-scheme:dark]
                                    "
                                    required
                                    disabled={status === 'submitting'}
                                />
                                <label className="absolute top-0 left-0 text-xs text-gold/80 tracking-widest uppercase pointer-events-none">
                                    Date
                                </label>
                            </div>

                            <div className="relative pt-4">
                                <select
                                    value={formState.guests}
                                    onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                                    className="
                                        appearance-none
                                        w-full px-0 py-3 bg-transparent border-b border-cream/20 
                                        text-cream text-lg tracking-wide
                                        focus:border-gold focus:outline-none
                                        transition-colors duration-500
                                        rounded-none
                                        cursor-pointer
                                    "
                                    disabled={status === 'submitting'}
                                >
                                    <option value="1" className="bg-charcoal">1 Guest</option>
                                    <option value="2" className="bg-charcoal">2 Guests</option>
                                    <option value="3" className="bg-charcoal">3 Guests</option>
                                    <option value="4" className="bg-charcoal">4 Guests</option>
                                    <option value="5" className="bg-charcoal">5 Guests</option>
                                    <option value="6" className="bg-charcoal">6 Guests</option>
                                </select>
                                <label className="absolute top-0 left-0 text-xs text-gold/80 tracking-widest uppercase pointer-events-none">
                                    Guests
                                </label>
                                <div className="absolute right-0 bottom-4 pointer-events-none text-cream/40">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {status === 'error' && (
                            <p className="text-red-400 text-sm mb-8 text-center animate-fade-in">
                                {errorMessage}
                            </p>
                        )}

                        {/* Submit button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`
                                    group relative px-16 py-6 
                                    bg-transparent border border-gold/40 
                                    text-gold text-sm tracking-[0.2em] uppercase
                                    overflow-hidden
                                    transition-all duration-700 ease-out
                                    hover:border-gold hover:text-charcoal
                                    disabled:opacity-50 disabled:cursor-wait
                                `}
                            >
                                <span
                                    className="
                                        absolute inset-0 bg-gold 
                                        transform -translate-x-[101%] group-hover:translate-x-0
                                        transition-transform duration-700 ease-luxury
                                    "
                                />
                                <span className="relative z-10">
                                    {status === 'submitting' ? 'Requesting...' : 'Request Reservation'}
                                </span>
                            </button>
                        </div>
                    </form>
                )}

                <p
                    className={`
            text-cream/30 text-xs tracking-wider mt-10
            transition-all duration-1500 ease-luxury delay-500
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
                >
                    For parties larger than six, please contact us directly.
                </p>
            </div>
        </section>
    );
}
