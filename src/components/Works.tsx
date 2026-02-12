import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Works = () => {
    const { data } = useContent();

    if (!data) return null;

    return (
        <section className="py-32 bg-bg-darker text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col xl:flex-row mb-24">
                    <div className="xl:w-1/3">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-8">
                            SELECTED<br />WORKS
                        </h2>
                    </div>
                    <div className="xl:w-2/3">
                        {/* Spacing or intro text if needed */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.works.map((project) => (
                        <motion.a
                            key={project.id}
                            href={project.link}
                            className="group relative block aspect-[3/4] overflow-hidden"
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                                <p className="text-sm font-light tracking-wide text-zinc-300">{project.category}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-24">
                    <a href="/projects" className="text-lg underline underline-offset-8 hover:text-primary transition-colors">See all works</a>
                </div>
            </div>
        </section>
    );
};

export default Works;
