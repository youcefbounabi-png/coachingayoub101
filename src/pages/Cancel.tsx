import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

const Cancel: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Payment Cancelled | Ayoub CMB</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <section className="max-w-4xl mx-auto px-6 text-center">
                    <div className="animate-liquid-fade">
                        <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-8 text-gray-400">
                            PAYMENT CANCELLED
                        </h1>
                        <p className="text-xl font-bold tracking-widest text-gray-300 mb-12 uppercase">
                            No worries. We're here when you're ready to commit.
                        </p>
                        <NavLink
                            to="/programs"
                            className="inline-block px-8 py-4 bg-accent text-dark font-black tracking-widest text-lg hover:bg-white transition-colors uppercase"
                        >
                            Return to Programs
                        </NavLink>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Cancel;
