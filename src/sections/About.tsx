
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ACHIEVEMENTS } from '../lib/constants';

const achievementKeys: Record<number, { title: string; category: string; description: string }> = {
    1: { title: 'achievements.proCards', category: 'achievements.proCardsCat', description: 'achievements.proCardsDesc' },
    2: { title: 'achievements.olympia', category: 'achievements.olympiaCat', description: 'achievements.olympiaDesc' },
    3: { title: 'achievements.national', category: 'achievements.nationalCat', description: 'achievements.nationalDesc' },
};

const About: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Helmet>
                <title>About Ayoub CMB | Elite Bodybuilding Coach</title>
                <meta name="description" content="Meet Ayoub CMB — 12+ years of competitive bodybuilding, 15+ IFBB Pro Cards guided, Olympia-qualified athlete preparation. Science-first coaching philosophy." />
                <meta property="og:title" content="About Ayoub CMB | Elite Bodybuilding Coach" />
                <meta property="og:description" content="Coach. Athlete. Engineer of Human Performance. 12+ years on the front lines of competitive bodybuilding." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ayoubcmb.com/about" />
                <link rel="canonical" href="https://ayoubcmb.com/about" />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <section className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-32 animate-liquid-fade">
                        <div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter mb-6 md:mb-10 leading-none">
                                AYOUB <br />
                                <span className="text-accent">CMB.</span>
                            </h1>
                            <div className="space-y-6 text-lg md:text-xl font-medium text-gray-300 leading-relaxed uppercase">
                                <p>{t('about.coachIntro')}</p>
                                <p className="border-l-4 border-accent pl-6 text-gray-400">
                                    {t('about.mission')}
                                </p>
                                <p>
                                    {t('about.philosophy')}
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/about_profile.webp"
                                alt="Ayoub CMB — Elite Bodybuilding Coach"
                                className="w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700 brutalist-border shadow-[30px_30px_0px_0px_rgba(212,255,0,1)]"
                                loading="lazy"
                            />
                            <div className="absolute -bottom-10 -left-10 bg-surface border-4 border-white/20 max-w-xs hidden md:block">
                                <p className="text-xs font-black tracking-widest italic">"{t('about.quote')}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-20 border-y border-border">
                        <h2 className="text-4xl font-black font-heading tracking-tighter mb-12 uppercase text-white">{t('about.hallOfResults')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-liquid-fade delay-200">
                            {ACHIEVEMENTS.map((ach) => {
                                const keys = achievementKeys[ach.id as keyof typeof achievementKeys];
                                return (
                                <div key={ach.id} className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-surface/80 to-surface/60 border border-border hover:scale-105 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(247,224,37,0.2)] transition-all duration-300">
                                    <span className="text-accent font-black tracking-widest text-xs uppercase">{ach.year} // {keys ? t(keys.category) : ach.category}</span>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{keys ? t(keys.title) : ach.title}</h3>
                                    <p className="text-sm font-bold text-gray-300 uppercase tracking-wide leading-snug">{keys ? t(keys.description) : ach.description}</p>
                                </div>
                            );})}
                        </div>
                    </div>

                    <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 animate-liquid-fade delay-300">
                        <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
                            <p className="text-6xl font-black text-outline mb-4">01</p>
                            <h4 className="font-black text-xl mb-4">{t('about.biomechanics')}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">{t('about.biomechanicsDesc')}</p>
                        </div>
                        <div className="bg-accent text-dark p-10">
                            <p className="text-6xl font-black mb-4">02</p>
                            <h4 className="font-black text-xl mb-4">{t('about.nutrition')}</h4>
                            <p className="text-xs font-black uppercase">{t('about.nutritionDesc')}</p>
                        </div>
                        <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
                            <p className="text-6xl font-black text-outline mb-4">03</p>
                            <h4 className="font-black text-xl mb-4">{t('about.recovery')}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">{t('about.recoveryDesc')}</p>
                        </div>
                        <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
                            <p className="text-6xl font-black text-outline mb-4">04</p>
                            <h4 className="font-black text-xl mb-4">{t('about.mindset')}</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">{t('about.mindsetDesc')}</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
