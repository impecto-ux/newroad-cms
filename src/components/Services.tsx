import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const services = [
    {
        id: 'vfx',
        title: 'VISUAL EFFECTS',
        description: "We bring your ideas to life with high-quality VFX. From concept to final delivery, our expert team uses advanced tools to create seamless and stunning visuals for your projects."
    },
    {
        id: 'motion',
        title: 'MOTION DESIGN',
        description: "Our creative motion design services deliver dynamic animations and engaging visuals. Whether it's 2D, 3D, or mixed media, we ensure your content stands out."
    },
    {
        id: 'color',
        title: 'COLOR & EDITING',
        description: "Elevate your visuals with our professional color grading and editing services. We craft polished and visually compelling stories that resonate with your audience."
    },
    {
        id: 'ai',
        title: 'AI POWERED CONTENT CREATION',
        description: "We harness the power of cutting-edge AI technologies to create fully AI-generated videos, precise previsualization (previs), and detailed storyboards. Our expertise ensures seamless integration of AI into your creative workflow, delivering efficiency, innovation, and visually stunning results tailored to your unique needs."
    }
];

const Services = () => {
    const [activeService, setActiveService] = useState<string | null>(null);

    return (
        <section className="py-24 bg-bg-darker text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row">
                    {/* Title */}
                    <div className="lg:w-1/3 mb-12 lg:mb-0">
                        <h2 className="text-4xl font-bold tracking-tight">SERVICES</h2>
                    </div>

                    {/* Accordion */}
                    <div className="lg:w-2/3">
                        <div className="space-y-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="border-b border-white/20 pb-4 cursor-pointer group"
                                    onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                                >
                                    <div className="flex items-center justify-between py-4">
                                        <h3 className="text-2xl font-medium group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: activeService === service.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowDown className="text-white group-hover:text-primary transition-colors" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {activeService === service.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-8 text-lg text-zinc-400 leading-relaxed font-light">
                                                    {service.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
