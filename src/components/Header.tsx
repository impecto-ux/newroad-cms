import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Header = () => {
    const { data } = useContent();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!data) return null;

    // Add defensive check
    if (!data.header) {
        console.error('Data loaded but header property missing:', data);
        return <div className="fixed top-0 left-0 bg-red-500 text-white p-2">Error: Missing Header Data</div>;
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/5 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="z-50">
                    {data.header.logoLight ? (
                        <img src={data.header.logoLight} alt="NewRoad" className="h-8 md:h-10" />
                    ) : (
                        <span className="text-white font-bold text-xl">NEWROAD</span>
                    )}
                </a>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-12">
                    {data.header.links && data.header.links.map((link, index) => (
                        <a key={index} href={link.url} className="text-sm font-medium tracking-wide hover:text-primary transition-colors">{link.label}</a>
                    ))}
                </nav>

                {/* Right Area */}
                <div className="flex items-center space-x-6">
                    <a href="/tr" className="text-xs font-bold tracking-widest hover:text-primary transition-colors">TR</a>
                    <button className="md:hidden text-white" aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
