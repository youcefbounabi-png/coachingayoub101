import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, animate } from 'framer-motion';

const achievements = [
    {
        id: 1,
        image: '/achievements/achievement_1.webp',
        titleKey: 'achievements.gallery.title1',
        subtitleKey: 'achievements.gallery.sub1'
    },
    {
        id: 2,
        image: '/achievements/achievement_2.webp',
        titleKey: 'achievements.gallery.title2',
        subtitleKey: 'achievements.gallery.sub2'
    },
    {
        id: 3,
        image: '/achievements/achievement_3.webp',
        titleKey: 'achievements.gallery.title3',
        subtitleKey: 'achievements.gallery.sub3'
    },
    {
        id: 4,
        image: '/achievements/achievement_4.webp',
        titleKey: 'achievements.gallery.title4',
        subtitleKey: 'achievements.gallery.sub4'
    },
    {
        id: 5,
        image: '/achievements/achievement_5.webp',
        titleKey: 'achievements.gallery.title5',
        subtitleKey: 'achievements.gallery.sub5'
    },
    {
        id: 6,
        image: '/achievements/achievement_6.png',
        titleKey: 'achievements.gallery.title6',
        subtitleKey: 'achievements.gallery.sub6'
    },
    {
        id: 7,
        image: '/achievements/achievement_7.png',
        titleKey: 'achievements.gallery.title7',
        subtitleKey: 'achievements.gallery.sub7'
    },
    {
        id: 8,
        image: '/achievements/achievement_8.png',
        titleKey: 'achievements.gallery.title8',
        subtitleKey: 'achievements.gallery.sub8'
    },
];

const AchievementsSection: React.FC = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Calculate card width including gap
    const cardWidth = 300; // Mobile
    const cardGap = 16; // gap-4 = 16px
    const cardWidthMd = 400; // Desktop
    const cardGapMd = 32; // gap-8 = 32px

    const getCardWidth = () => {
        if (typeof window === 'undefined') return cardWidth;
        return window.innerWidth >= 768 ? cardWidthMd : cardWidth;
    };

    const getCardGap = () => {
        if (typeof window === 'undefined') return cardGap;
        return window.innerWidth >= 768 ? cardGapMd : cardGap;
    };

    const getMaxTranslate = () => {
        const width = getCardWidth();
        const gap = getCardGap();
        const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
        const totalWidth = achievements.length * (width + gap);
        // Allow dragging until the last card is visible
        return Math.min(0, -(totalWidth - containerWidth));
    };

    const handleDragEnd = (event: any, info: any) => {
        setIsDragging(false);
        const width = getCardWidth();
        const gap = getCardGap();
        const threshold = (width + gap) * 0.25; // 25% of card width to trigger slide

        let newIndex = currentIndex;
        if (info.offset.x < -threshold && currentIndex < achievements.length - 1) {
            newIndex = currentIndex + 1;
        } else if (info.offset.x > threshold && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }

        setCurrentIndex(newIndex);
        const targetX = -newIndex * (width + gap);
        animate(x, targetX, { type: 'spring', stiffness: 300, damping: 30 });
    };

    const goToSlide = (index: number) => {
        if (index < 0 || index >= achievements.length) return;
        setCurrentIndex(index);
        const width = getCardWidth();
        const gap = getCardGap();
        const targetX = -index * (width + gap);
        animate(x, targetX, { type: 'spring', stiffness: 300, damping: 30 });
    };

    const nextSlide = () => {
        if (currentIndex < achievements.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to start
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(achievements.length - 1); // Loop to end
        }
    };

    // Handle window resize - sync x to current slide
    useEffect(() => {
        const handleResize = () => {
            const width = getCardWidth();
            const gap = getCardGap();
            const targetX = -currentIndex * (width + gap);
            x.set(targetX);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, x]);

    return (
        <section className="py-20 bg-gradient-to-b from-dark via-surface/50 to-dark overflow-hidden border-t border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 max-w-7xl mx-auto px-6">
                <div>
                    <span className="text-accent font-black tracking-[0.3em] text-xs uppercase mb-2 block">
                        {t('achievements.provenTrackRecord')}
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none text-white">
                        {t('achievements.hallOfFame')} <span className="text-outline">{t('achievements.hallOfFameAccent')}</span>
                    </h2>
                </div>
            </div>

            {/* dir="ltr" forces carousel to behave like English version in both languages */}
            <div className="relative w-full px-16 md:px-24" dir="ltr">
                {/* Gradient overlays */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

                {/* Navigation buttons - positioned outside drag area, stop propagation */}
                <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSlide(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-[100] w-12 h-12 md:w-16 md:h-16 bg-accent/90 hover:bg-accent text-dark font-black text-xl md:text-2xl rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Previous achievement"
                >
                    ←
                </button>
                <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSlide(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] w-12 h-12 md:w-16 md:h-16 bg-accent/90 hover:bg-accent text-dark font-black text-xl md:text-2xl rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Next achievement"
                >
                    →
                </button>

                {/* Carousel container - padding keeps content away from buttons */}
                <div className="flex overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={containerRef}>
                    <motion.div
                        className="flex gap-4 md:gap-8"
                        drag="x"
                        dragConstraints={{ left: getMaxTranslate(), right: 0 }}
                        dragElastic={0.2}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        style={{ x }}
                        whileDrag={{ cursor: 'grabbing' }}
                    >
                        {achievements.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 group grayscale hover:grayscale-0 transition-all duration-500"
                                whileHover={{ scale: isDragging ? 1 : 1.05 }}
                            >
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                <img
                                    src={item.image}
                                    alt={t(item.titleKey)}
                                    className="w-full h-full object-cover brutalist-border pointer-events-none"
                                    loading="lazy"
                                    draggable={false}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-surface/95 border-t-2 border-border transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                    <h3 className="text-xl font-black text-white uppercase italic">{t(item.titleKey)}</h3>
                                    <p className="text-xs font-bold text-accent tracking-widest uppercase">{t(item.subtitleKey)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-8 z-20 relative">
                    {achievements.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-accent w-8 md:w-12'
                                : 'bg-gray-600 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
