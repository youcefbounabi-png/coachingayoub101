import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TestimonialsSection from '../components/Testimonials';
import AchievementsSection from './Achievements';

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo.homeTitle')}</title>
                <meta name="description" content={t('seo.homeDesc')} />
                <meta property="og:title" content={t('seo.homeTitle')} />
                <meta property="og:description" content={t('seo.homeDesc')} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ayoubcmb.com/" />
                <link rel="canonical" href="https://ayoubcmb.com/" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "ProfessionalService",
                            "@id": "https://ayoubcmb.com/#business",
                            "name": "Ayoub CMB Elite Coaching",
                            "url": "https://ayoubcmb.com",
                            "description": "Elite bodybuilding coaching, nutrition planning, and contest preparation service.",
                            "serviceType": "Personal Training & Nutrition Coaching",
                            "areaServed": "Worldwide",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Dubai",
                                "addressCountry": "AE"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "contactType": "customer service",
                                "email": "coach@ayoubcumb.com"
                            }
                        },
                        {
                            "@type": "Person",
                            "@id": "https://ayoubcmb.com/#coach",
                            "name": "Ayoub CMB",
                            "jobTitle": "Elite Bodybuilding Coach & Nutritionist",
                            "url": "https://ayoubcmb.com",
                            "worksFor": { "@id": "https://ayoubcmb.com/#business" },
                            "description": "Professional bodybuilding coach with 12+ years of competitive experience, 15+ IFBB Pro Cards guided, Olympia-qualified athlete preparation."
                        }
                    ]
                })}</script>
            </Helmet>

            <div className="pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[95vh] flex items-center overflow-hidden border-b border-border">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/homepage_hero.png"
                            alt="Elite bodybuilding athletes — Ayoub CMB coaching team"
                            className="w-full h-full object-cover brightness-110 saturate-110"
                            loading="eager"
                            fetchPriority="high"
                        />
                        {/* Lighter gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent"></div>
                        {/* Subtle light accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-56 sm:pt-64 md:pt-72 pb-20">
                        <div className="max-w-4xl">
                            <span className="inline-block px-3 py-1 bg-accent text-dark font-black text-[10px] tracking-[0.3em] mb-4">
                                {t('home.badge')}
                            </span>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-[0.9] tracking-tighter mb-4 sm:mb-6">
                                {t('home.title')} <br />
                                <span className="text-accent font-cormorant italic font-bold">{t('home.titleAccent')}</span> <br />
                                {t('home.titleEnd')}
                            </h1>
                            <p className="text-[10px] sm:text-base md:text-lg text-gray-200 font-bold max-w-xl mb-8 sm:mb-10 border-l-2 sm:border-l-8 border-accent pl-4 md:pl-8 py-1 sm:py-2 uppercase leading-tight">
                                {t('home.tagline')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <NavLink to="/programs" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-accent text-dark font-black tracking-widest text-base md:text-lg hover:bg-white transition-all transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(247,224,37,0.5)] hover:scale-105 text-center interactive-glow rounded-lg active:scale-95">
                                    {t('home.startNow')}
                                </NavLink>
                                <NavLink to="/results" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 brutalist-border text-white font-black tracking-widest text-base md:text-lg hover:border-accent hover:bg-accent/10 transition-all transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(247,224,37,0.3)] text-center active:scale-95">
                                    {t('home.seeResults')}
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
                        <span className="text-[10px] font-black tracking-widest uppercase mb-2">{t('home.scroll')}</span>
                        <div className="w-px h-12 bg-accent"></div>
                    </div>
                </section>

                {/* Marquee */}
                <div className="bg-accent py-4 border-y-2 border-dark marquee-container">
                    <div className="flex animate-marquee space-x-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <span key={i} className="text-dark font-black text-2xl tracking-tighter uppercase">
                                {t('home.marquee')}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Client Journey - Moved to top for better conversion */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-dark via-surface to-dark overflow-hidden relative">
                    {/* Light gradient overlay for brightness */}
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                            <div className="relative group order-2 lg:order-1">
                                {/* Vibrant border effect */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-accent via-white to-accent opacity-30 rounded-lg blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                                <div className="absolute -inset-1 border-4 border-accent/50 rounded-lg group-hover:border-accent transition-all duration-500"></div>
                                <img
                                    src="/client_journey.webp"
                                    alt="Client transformation — 16kg muscle gain in 24 weeks"
                                    className="w-full rounded-lg brightness-110 contrast-110 saturate-110 hover:brightness-125 hover:saturate-125 transition-all duration-700 relative z-10 shadow-2xl"
                                    loading="lazy"
                                />
                                {/* Shine effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg pointer-events-none"></div>
                            </div>
                            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                                <span className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 text-accent font-black tracking-[0.4em] text-xs md:text-sm uppercase rounded">
                                    {t('home.clientJourney')}
                                </span>
                                <h2 className="text-2xl sm:text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.9] bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                                    {t('home.journeyTitle')} <br /><span className="text-accent font-cormorant italic font-bold not-italic">{t('home.journeyTitleAccent')}</span>
                                </h2>
                                <p className="text-sm sm:text-base md:text-xl text-gray-200 font-bold leading-relaxed">
                                    "{t('home.journeyQuote')}"
                                </p>
                                <div className="flex flex-wrap gap-8 md:gap-12">
                                    <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(247,224,37,0.4)] transition-all duration-300">
                                        <p className="text-4xl md:text-5xl font-black font-heading text-accent">16KG</p>
                                        <p className="text-xs font-bold text-gray-300 tracking-widest uppercase mt-1">{t('home.weightGained')}</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(247,224,37,0.4)] transition-all duration-300 floating" style={{ animationDelay: '1s' }}>
                                        <p className="text-4xl md:text-5xl font-black font-heading text-accent">24 WKS</p>
                                        <p className="text-xs font-bold text-gray-300 tracking-widest uppercase mt-1">{t('home.duration')}</p>
                                    </div>
                                </div>
                                <NavLink to="/results" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-dark font-black tracking-widest text-sm md:text-lg hover:bg-white hover:scale-105 transition-all transform border-2 border-transparent hover:border-dark rounded-lg">
                                    {t('home.seeAllTransformations')} <span className="text-xl">→</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why CMB */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                    {/* Subtle light effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none"></div>
                    {/* Floating accent orbs */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-20 gap-4 sm:gap-8">
                            <h2 className="text-3xl sm:text-5xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none">
                                {t('home.whyCmb')} <br /><span className="text-accent">CMB?</span>
                            </h2>
                            <p className="text-gray-300 font-bold text-xs sm:text-sm md:text-lg max-w-md uppercase tracking-wide">
                                {t('home.whyCmbSub')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {[1, 2, 3].map((item, idx) => (
                                <div
                                    key={item}
                                    className="p-6 sm:p-8 md:p-12 brutalist-border bg-gradient-to-br from-surface to-surface/80 group hover:from-accent hover:to-accent/80 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(247,224,37,0.4)]"
                                >
                                    <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-accent/50 group-hover:text-dark mb-4 sm:mb-6 md:mb-8 transition-colors">0{item}</h3>
                                    <h4 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-4 group-hover:text-dark">{t(`home.${item === 1 ? 'bestPlan' : item === 2 ? 'support24' : 'realScience'}`)}</h4>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-300 font-bold group-hover:text-dark/90 uppercase">{t(`home.${item === 1 ? 'bestPlan' : item === 2 ? 'support24' : 'realScience'}Desc`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <AchievementsSection />
                <TestimonialsSection />

                {/* CTA */}
                <section className="py-20 md:py-40 bg-gradient-to-b from-accent via-accent/95 to-accent text-dark text-center relative overflow-hidden">
                    {/* Background layers */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_60%)] opacity-60" />
                        <div
                            className="absolute inset-0 opacity-[0.06]"
                            style={{
                                backgroundImage: `radial-gradient(circle, #0d1117 1px, transparent 1px)`,
                                backgroundSize: '32px 32px',
                            }}
                        />
                        <div
                            className="absolute inset-0 opacity-[0.08]"
                            style={{
                                backgroundImage: `linear-gradient(45deg, transparent 48%, #0d1117 50%, #0d1117 52%, transparent 54%)`,
                                backgroundSize: '80px 80px',
                            }}
                        />
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-2 border-dark/15 animate-float" style={{ animationDuration: '14s' }} />
                        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border-2 border-dark/20 animate-float" style={{ animationDuration: '12s', animationDelay: '-4s' }} />
                        <div className="absolute top-1/2 right-1/5 w-24 h-24 rounded-full border-2 border-dark/25 animate-float" style={{ animationDuration: '10s', animationDelay: '-2s' }} />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.12] pointer-events-none flex items-center justify-center overflow-hidden">
                        <span className="text-[80px] sm:text-[120px] md:text-[260px] font-black leading-none select-none text-dark/30 whitespace-nowrap">CMB CMB CMB CMB</span>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <div>
                            <h2 className="text-3xl sm:text-5xl md:text-9xl font-black font-heading tracking-tighter mb-4 sm:mb-8 md:mb-12 leading-none uppercase drop-shadow-lg">
                                {t('home.stopWaiting')} <br />{t('home.stopWaitingEnd')}
                            </h2>
                            <p className="text-base sm:text-lg md:text-2xl font-black mb-8 md:mb-12 uppercase tracking-wide text-dark/90 text-center">
                                {t('home.ctaText')}
                            </p>
                            <NavLink to="/contact" className="inline-block px-8 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 bg-surface text-white font-black tracking-[0.3em] text-base sm:text-lg md:text-2xl hover:scale-110 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all transform rounded-lg border-2 border-white/20 hover:border-white">
                                {t('home.applyToTeam')}
                            </NavLink>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
