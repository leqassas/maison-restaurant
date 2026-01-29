import { useState, useEffect } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.documentElement.classList.add('lenis-stopped');
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.classList.remove('lenis-stopped');
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const closeMenu = () => setIsMobileMenuOpen(false);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        closeMenu();

        const target = document.querySelector(href);
        if (!target) return;

        if (window.lenis) {
            window.lenis.scrollTo(target, {
                duration: 2.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
            });
        } else {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { name: 'Philosophy', href: '#story' },
        { name: 'Menu', href: '#menu' },
        { name: 'Chef', href: '#chef' },
        { name: 'Reserve', href: '#reservation' },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
                <a
                    href="#"
                    className="font-editorial text-cream text-xl tracking-widest uppercase relative z-50"
                    onClick={(e) => handleNavClick(e, '#root')}
                >
                    Maison
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-12">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-cream/70 text-sm tracking-wider uppercase hover:text-cream transition-colors duration-1200"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-cream/70 text-sm tracking-wider uppercase relative z-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? 'Close' : 'Menu'}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 bg-charcoal z-40 flex items-center justify-center
                    transition-all duration-1500 ease-luxury
                    ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
            >
                <nav className="flex flex-col items-center gap-8">
                    {navItems.map((item, index) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`
                                font-editorial text-3xl text-cream
                                transition-all duration-1200 ease-luxury
                                ${isMobileMenuOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }
                            `}
                            style={{ transitionDelay: `${100 + index * 100}ms` }}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
