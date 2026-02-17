import React from 'react';
import { NavLink } from 'react-router-dom';

const Success: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
            <section className="max-w-4xl mx-auto px-6 text-center">
                <div className="animate-liquid-fade">
                    <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-8 text-accent">
                        PAYMENT SUCCESSFUL
                    </h1>
                    <p className="text-xl font-bold tracking-widest text-gray-400 mb-12 uppercase">
                        Start your journey. Check your email for next steps.
                    </p>
                    <NavLink
                        to="/"
                        className="inline-block px-8 py-4 bg-white text-dark font-black tracking-widest text-lg hover:bg-accent transition-colors uppercase"
                    >
                        Back to Home
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default Success;
