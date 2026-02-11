
import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
    {
        id: 1,
        image: '/achievements/achievement_1.jpg',
        title: 'GOLDEN BODY CHAMPION',
        subtitle: 'MEN\'S PHYSIQUE'
    },
    {
        id: 2,
        image: '/achievements/achievement_2.jpg',
        title: 'PRO CARD WINNER',
        subtitle: 'ELITE STATUS'
    },
    {
        id: 3,
        image: '/achievements/achievement_3.jpg',
        title: 'TOTAL TRANSFORMATION',
        subtitle: 'FAT LOSS & MUSCLE GAIN'
    },
    {
        id: 4,
        image: '/achievements/achievement_4.jpg',
        title: 'STAGE READY',
        subtitle: 'CONTEST PREP'
    },
    {
        id: 5,
        image: '/achievements/achievement_5.jpg',
        title: 'DOUBLE TROUBLE',
        subtitle: 'WINNING TEAM'
    },
];

const AchievementsSection: React.FC = () => {
    return (
        <section className="py-20 bg-dark overflow-hidden border-t border-b border-[#262626]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 max-w-7xl mx-auto px-6">
                <div>
                    <span className="text-accent font-black tracking-[0.3em] text-xs uppercase mb-2 block">
                        Proven Track Record
                    </span>
                    <h2 className="text-4xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none text-white">
                        HALL OF <span className="text-outline">FAME</span>
                    </h2>
                </div>
            </div>

            <div className="relative w-full">
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-4 md:gap-8 min-w-full"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {[...achievements, ...achievements].map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 group cursor-none grayscale hover:grayscale-0 transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover brutalist-border"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-dark/90 border-t-2 border-[#262626] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                    <h3 className="text-xl font-black text-white uppercase italic">{item.title}</h3>
                                    <p className="text-xs font-bold text-accent tracking-widest uppercase">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
