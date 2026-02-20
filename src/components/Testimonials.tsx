import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const testimonials = [
    { textKey: 't1', image: "https://picsum.photos/seed/user1/100/100", name: "Alex Johnson", role: "CPT & Athlete" },
    { textKey: 't2', image: "https://picsum.photos/seed/user2/100/100", name: "Marcus T.", role: "Bodybuilder" },
    { textKey: 't3', image: "https://picsum.photos/seed/user3/100/100", name: "David L.", role: "Fitness Enthusiast" },
    { textKey: 't4', image: "https://picsum.photos/seed/user4/100/100", name: "James R.", role: "Transformation Client" },
    { textKey: 't5', image: "https://picsum.photos/seed/user5/100/100", name: "Sarah K.", role: "Bikini Competitor" },
    { textKey: 't6', image: "https://picsum.photos/seed/user6/100/100", name: "Mike D.", role: "Entrepreneur" },
];

const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
    duration?: number;
    t: (key: string) => string;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{ translateY: "-50%" }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map(({ textKey, image, name, role }, i) => (
                            <div
                                className="p-8 rounded-none brutalist-border bg-surface hover:border-accent transition-colors duration-300"
                                key={i}
                            >
                                <div className="mb-4 text-gray-300 font-medium leading-relaxed">"{props.t(`testimonials.${textKey}`)}"</div>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        width={40}
                                        height={40}
                                        src={image}
                                        alt={name}
                                        loading="lazy"
                                        className="h-10 w-10 rounded-full border-2 border-accent grayscale"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-black uppercase tracking-wider text-sm">{name}</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

export const TestimonialsSection = () => {
    const { t } = useTranslation();
    return (
        <section className="py-20 bg-gradient-to-b from-dark via-surface/50 to-dark overflow-hidden animate-liquid-fade delay-300">
            <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
                <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-none mb-4">
                    {t('testimonials.title')} <span className="text-outline">{t('testimonials.titleAccent')}</span>
                </h2>
                <p className="text-accent font-black tracking-widest uppercase text-sm">
                    {t('testimonials.subtitle')}
                </p>
            </div>

            <div className="flex justify-center gap-6 overflow-hidden h-[800px] relative mask-fade">
                <TestimonialsColumn t={t} testimonials={testimonials.slice(0, 3)} duration={15} className="hidden md:block" />
                <TestimonialsColumn t={t} testimonials={testimonials.slice(3, 6)} duration={20} className="hidden md:block pt-12" />
                <TestimonialsColumn t={t} testimonials={testimonials} duration={18} className="block md:hidden pb-12" />
                <TestimonialsColumn t={t} testimonials={testimonials.slice(0, 3).reverse()} duration={17} className="hidden lg:block" />
            </div>
        </section>
    );
};

export default TestimonialsSection;
