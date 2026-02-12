import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Hero = () => {
    const { data } = useContent();

    if (!data) return null;

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-60"
                    poster={data.hero.posterUrl}
                >
                    <source src={data.hero.videoUrl} type="video/mp4" />
                </video>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none"
                >
                    <span className="block">{data.hero.titleLine1}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">{data.hero.titleLine2}</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-12 flex flex-col items-center"
                >
                    <p className="text-xs tracking-[0.2em] mb-4 text-zinc-400">SCROLL</p>
                    <div className="w-[1px] h-12 bg-zinc-700 overflow-hidden">
                        <div className="w-full h-full bg-primary animate-scrolldown" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
