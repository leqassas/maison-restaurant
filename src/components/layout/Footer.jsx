export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-charcoal border-t border-cream/10 py-16 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <h3 className="font-editorial text-2xl text-cream mb-4">Maison</h3>
                        <p className="text-cream/50 text-sm leading-relaxed">
                            A celebration of craft, season, and the art of the table.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-cream/40 text-xs tracking-widest uppercase mb-4">
                            Visit
                        </h4>
                        <address className="not-italic text-cream/70 text-sm leading-relaxed">
                            12 Rue de la Gastronomie<br />
                            Paris, 75001<br />
                            France
                        </address>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-cream/40 text-xs tracking-widest uppercase mb-4">
                            Hours
                        </h4>
                        <p className="text-cream/70 text-sm leading-relaxed">
                            Tuesday – Saturday<br />
                            19:00 – 23:00<br />
                            <span className="text-cream/40">Closed Sunday & Monday</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cream/10">
                    <p className="text-cream/30 text-xs tracking-wider">
                        © {currentYear} Maison. All rights reserved.
                    </p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-cream/30 text-xs tracking-wider hover:text-cream/50 transition-colors duration-1200"
                        >
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="text-cream/30 text-xs tracking-wider hover:text-cream/50 transition-colors duration-1200"
                        >
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
