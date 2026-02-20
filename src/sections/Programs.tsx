
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PROGRAMS } from '../lib/constants';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const programKeys: Record<string, { name: string; desc: string; duration: string; features: string[] }> = {
    basic: { name: 'programs.getStarted', desc: 'programs.basicDesc', duration: 'programs.monthlyRolling', features: ['programs.feat1', 'programs.feat2', 'programs.feat3', 'programs.feat4', 'programs.feat5'] },
    pro: { name: 'programs.eliteLevel', desc: 'programs.proDesc', duration: 'programs.12weekMin', features: ['programs.feat6', 'programs.feat7', 'programs.feat8', 'programs.feat9', 'programs.feat10', 'programs.feat11'] },
    premium: { name: 'programs.contestPrep', desc: 'programs.premiumDesc', duration: 'programs.competitionCycle', features: ['programs.feat12', 'programs.feat13', 'programs.feat14', 'programs.feat15', 'programs.feat16', 'programs.feat17'] },
};

const Programs: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSelectPlan = (planId: string) => {
        // Navigate to program detail page where payment options are available
        navigate(`/programs/${planId}`);
    };

    return (
        <>
            <Helmet>
                <title>Coaching Programs | Ayoub CMB Elite Bodybuilding</title>
                <meta name="description" content="Choose your coaching tier: Basic ($149/mo), Elite Pro ($299/mo), or Contest Prep ($599/mo). Custom training, nutrition, and 24/7 support from Ayoub CMB." />
                <meta property="og:title" content="Coaching Programs | Ayoub CMB" />
                <meta property="og:description" content="Three elite coaching tiers — pick the plan that matches your ambition." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ayoubcmb.com/programs" />
                <link rel="canonical" href="https://ayoubcmb.com/programs" />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-40 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-60 right-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <section className="max-w-7xl mx-auto px-6">
                    <div className="mb-12 md:mb-20 animate-liquid-fade">
                        <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-4">
                            {t('programs.title')} <span className="text-accent italic">{t('programs.titleAccent')}</span>
                        </h1>
                        <p className="text-base md:text-xl font-bold tracking-widest text-gray-400 max-w-xl border-l-4 md:border-l-8 border-accent pl-6 uppercase">
                            {t('programs.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-liquid-fade delay-200">
                        {PROGRAMS.map((program) => (
                            <div
                                key={program.id}
                                className="brutalist-border p-4 md:p-10 bg-gradient-to-br from-surface to-surface/80 flex flex-col h-full brutalist-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(247,224,37,0.2)] group"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <span className="px-3 py-1 bg-accent text-dark font-black text-xs tracking-[0.2em]">
                                        {t(`programs.${program.level.toLowerCase()}`).toUpperCase()}
                                    </span>
                                    <span className="text-3xl font-black text-white">{program.price}</span>
                                </div>

                                <h3 style={{ fontSize: '28px' }} className="text-[28px] sm:text-3xl md:text-5xl font-black font-heading tracking-tight mb-3 sm:mb-6 uppercase leading-tight max-w-full whitespace-normal break-words">
                                    {programKeys[program.id] ? t(programKeys[program.id].name) : program.name}
                                </h3>

                                <p className="text-[10px] sm:text-xs md:text-base text-gray-300 font-bold mb-6 md:mb-10 flex-grow uppercase leading-tight">
                                    {programKeys[program.id] ? t(programKeys[program.id].desc) : program.description}
                                </p>

                                <ul className="space-y-5 mb-12">
                                    {(programKeys[program.id]?.features || program.features).map((feat, idx) => (
                                        <li key={idx} className="flex items-start text-[9px] sm:text-[10px] md:text-xs font-black tracking-wide md:tracking-widest text-gray-200 uppercase leading-snug">
                                            <span className="w-3 h-3 bg-accent mr-3 mt-0.5 flex-shrink-0"></span>
                                            {typeof feat === 'string' && feat.startsWith('programs.') ? t(feat) : feat}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSelectPlan(program.id)}
                                    className="w-full py-4 md:py-5 text-center font-black tracking-wider md:tracking-[0.2em] text-sm md:text-base bg-white text-dark hover:bg-accent transition-colors"
                                >
                                    {t('programs.select')} {t(`programs.${program.level.toLowerCase()}`).toUpperCase()}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 p-12 bg-accent text-dark brutalist-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-4 leading-none uppercase whitespace-pre-line">
                                    {t('programs.customDeal')}
                                </h2>
                                <p className="text-lg font-black tracking-widest uppercase opacity-80">
                                    {t('programs.customDealText')}
                                </p>
                            </div>
                            <div className="flex md:justify-end">
                                <NavLink to="/contact" className="w-full md:w-auto px-8 md:px-12 py-5 md:py-6 bg-surface text-white font-black tracking-widest text-base md:text-lg hover:bg-white hover:text-dark transition-all transform hover:-translate-y-2 text-center border-2 border-white/10">
                                    {t('programs.messageMe')}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Programs;
