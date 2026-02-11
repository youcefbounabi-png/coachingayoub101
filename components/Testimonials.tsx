import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const testimonials = [
    {
        text: "CMB changed my life. I stopped guessing and started growing. The plan was clear, the support was real.",
        image: "https://picsum.photos/seed/user1/100/100",
        name: "Alex Johnson",
        role: "CPT & Athlete",
    },
    {
        text: "The level of detail in the bio-feedback monitoring is unmatched. I stepped on stage confident and full.",
        image: "https://picsum.photos/seed/user2/100/100",
        name: "Marcus T.",
        role: "Bodybuilder",
    },
    {
        text: "No fluff. Just the plan you need to grow. Ayoub doesn't sugarcoat anything, and that's why it works.",
        image: "https://picsum.photos/seed/user3/100/100",
        name: "David L.",
        role: "Fitness Enthusiast",
    },
    {
        text: "I added 12kg of lean mass in 6 months. The nutrition protocol was a game changer.",
        image: "https://picsum.photos/seed/user4/100/100",
        name: "James R.",
        role: "Transformation Client",
    },
    {
        text: "Professional, scientific, and brutal. Exactly what I needed to break my plateau.",
        image: "https://picsum.photos/seed/user5/100/100",
        name: "Sarah K.",
        role: "Bikini Competitor",
    },
    {
        text: "The psychology aspect of the coaching is underrated. He builds your mind as much as your body.",
        image: "https://picsum.photos/seed/user6/100/100",
        name: "Mike D.",
        role: "Entrepreneur",
    },
];

const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
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
                        {props.testimonials.map(({ text, image, name, role }, i) => (
                            <div
                                className="p-8 rounded-none brutalist-border bg-surface hover:border-accent transition-colors duration-300"
                                key={i}
                            >
                                <div className="mb-4 text-gray-300 font-medium leading-relaxed">"{text}"</div>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        width={40}
                                        height={40}
                                        src={image}
                                        alt={name}
                                        className="h-10 w-10 rounded-full border-2 border-accent grayscale"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-black uppercase tracking-wider text-sm">{name}</div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{role}</div>
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
    return (
        <section className="py-20 bg-dark overflow-hidden animate-liquid-fade delay-300">
            <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
                <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-none mb-4">
                    WHAT THEY <span className="text-outline">SAY</span>
                </h2>
                <p className="text-accent font-black tracking-widest uppercase text-sm">
                    REAL RESULTS FROM REAL ATHLETES
                </p>
            </div>

            <div
                className="flex justify-center gap-6 overflow-hidden h-[800px] relative mask-fade"
            >
                {/* First Column */}
                <TestimonialsColumn
                    testimonials={testimonials.slice(0, 3)}
                    duration={15}
                    className="hidden md:block" // Hide on mobile for simplicity or show standard
                />
                {/* Second Column */}
                <TestimonialsColumn
                    testimonials={testimonials.slice(3, 6)}
                    duration={20}
                    className="hidden md:block pt-12" // Stagger start
                />
                {/* Mobile view: concise single column or keep scrolling? Use single block for mobile */}
                <TestimonialsColumn
                    testimonials={testimonials}
                    duration={18}
                    className="block md:hidden pb-12"
                />
                {/* Third Column */}
                <TestimonialsColumn
                    testimonials={testimonials.slice(0, 3).reverse()}
                    duration={17}
                    className="hidden lg:block"
                />
            </div>
        </section>
    );
};

export default TestimonialsSection;
