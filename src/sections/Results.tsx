
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resultCases } from '../data/results';

const Results: React.FC = () => {
    const { t } = useTranslation();
    const cases = resultCases;

    return (
        <>
            <Helmet>
                <title>Client Results | Ayoub CMB Elite Coaching</title>
                <meta name="description" content="Real transformations from real athletes. 15+ IFBB Pro Cards, Olympia qualifiers, national champions — see what the CMB system delivers." />
                <meta property="og:title" content="Client Results | Ayoub CMB" />
                <meta property="og:description" content="Consistent. Measurable. Elite. These are the athletes who followed the system." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ayoubcmb.com/results" />
                <link rel="canonical" href="https://ayoubcmb.com/results" />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-60 right-10 w-44 h-44 bg-accent/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-80 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>
                <section className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="mb-12 md:mb-20 animate-liquid-fade">
                        <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-4 uppercase">
                            {t('results.title')} <span className="text-outline">{t('results.titleAccent')}</span>
                        </h1>
                        <p className="text-base md:text-xl font-bold tracking-widest text-gray-400 max-w-xl">
                            {t('results.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-liquid-fade delay-200">
                        {cases.map((c) => (
                            <div key={c.id} className="brutalist-border p-0 bg-gradient-to-br from-surface to-surface/80 flex flex-col md:flex-row group overflow-hidden hover:scale-[1.01] transition-all duration-500">
                                <div className="w-full md:w-1/2 overflow-hidden">
                                    <img
                                        src={c.image}
                                        alt={c.description}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                                    <span className="text-accent font-black tracking-widest text-[10px] mb-2 uppercase">{c.category}</span>
                                    <h3 className="text-3xl font-black font-heading mb-4 uppercase">{c.name}</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-border pb-2">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('results.result')}</span>
                                            <span className="text-xs font-black text-white uppercase">{c.change}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-border pb-2">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t('results.time')}</span>
                                            <span className="text-xs font-black text-white uppercase">{c.duration}</span>
                                        </div>
                                    </div>
                                    <NavLink to={`/results/${c.id}`} className="mt-8 text-xs font-black tracking-widest border-2 border-white py-3 px-6 hover:bg-accent hover:border-accent hover:text-dark transition-all inline-block text-center">
                                        {t('results.viewJourney')}
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-24 p-8 md:p-20 bg-surface border-2 border-border text-center rounded-lg">
                        <h2 className="text-3xl md:text-6xl font-black font-heading mb-6 md:mb-8 uppercase text-white">{t('results.youAreNext')}</h2>
                        <p className="text-sm md:text-lg font-bold text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto uppercase tracking-wide">
                            {t('results.ctaText')}
                        </p>
                        <NavLink to="/contact" className="inline-block px-8 md:px-12 py-4 md:py-6 bg-accent text-dark font-black tracking-[0.3em] text-lg md:text-xl transform hover:-rotate-2 transition-transform">
                            {t('results.applyToTeam')}
                        </NavLink>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Results;
