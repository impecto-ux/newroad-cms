

const Footer = () => {
    return (
        <footer className="bg-black text-white py-24 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Have an idea? Let’s build it!</h2>
                    <a
                        href="mailto:contact@newroad.studio"
                        className="inline-flex items-center space-x-4 text-zinc-400 hover:text-white transition-colors group mb-24"
                    >
                        <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </div>
                        <span className="text-xl md:text-2xl">contact@newroad.studio</span>
                    </a>

                    <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
                        <nav className="flex space-x-8 mb-6 md:mb-0">
                            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
                            <a href="/works" className="text-sm font-medium hover:text-primary transition-colors">Works</a>
                            <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
                        </nav>

                        <div className="text-zinc-500 text-sm mb-6 md:mb-0">
                            © {new Date().getFullYear()} New Road Studio All rights reserved.
                        </div>

                        <div className="flex space-x-4">
                            <a href="#" className="text-xs uppercase tracking-widest hover:text-primary">Vimeo</a>
                            <a href="#" className="text-xs uppercase tracking-widest hover:text-primary">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
