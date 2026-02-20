import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resultCases } from '../data/results';

const ResultDetail: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const result = resultCases.find((c) => c.id === Number(id));
    const [showBefore, setShowBefore] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <>
            <Helmet>
                <title>Transformation #{id} | Ayoub CMB Results</title>
                <meta name="description" content={`Client transformation case study #${id} — detailed breakdown of training, nutrition and results achieved with Ayoub CMB coaching.`} />
                <link rel="canonical" href={`https://ayoubcmb.com/results/${id}`} />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark animate-liquid-fade relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-40 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6">
                    <NavLink to="/results" className="inline-block mb-12 text-accent font-black tracking-widest text-xs hover:translate-x-[-4px] transition-transform">
                        &larr; {t('resultDetail.backToResults')}
                    </NavLink>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-6">
                            <div className="brutalist-border p-2 bg-surface">
                                <img
                                    src={
                                        showBefore
                                            ? (result?.beforeImage ?? `https://picsum.photos/seed/result_${id}_before/600/800`)
                                            : (result?.image ?? `https://picsum.photos/seed/result_${id}_after/600/800`)
                                    }
                                    alt={showBefore ? `${result?.name} — before transformation` : (result?.description ?? `Transformation result #${id}`)}
                                    className="w-full grayscale hover:grayscale-0 transition-all duration-700 object-cover min-h-[300px]"
                                    loading="lazy"
                                />
                                <div className="flex justify-between mt-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowBefore(true)}
                                        className={`flex-1 text-xs font-black px-2 py-3 transition-all cursor-pointer border-2 ${
                                            showBefore ? 'bg-accent text-dark border-accent' : 'bg-surface text-white border-border hover:border-accent/50'
                                        }`}
                                    >
                                        {t('resultDetail.before')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowBefore(false)}
                                        className={`flex-1 text-xs font-black px-2 py-3 transition-all cursor-pointer border-2 ${
                                            !showBefore ? 'bg-accent text-dark border-accent' : 'bg-surface text-white border-border hover:border-accent/50'
                                        }`}
                                    >
                                        {t('resultDetail.after')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <span className="text-accent font-black tracking-widest text-sm mb-2 block">TRANSFORMATION #{id}</span>
                                <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none mb-6">
                                    TOTAL <br /><span className="text-outline">REBUILD.</span>
                                </h1>

                                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-gray-800 py-8">
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{t('resultDetail.duration')}</p>
                                        <p className="text-2xl font-black">{t('resultDetail.16weeks')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{t('resultDetail.weight')}</p>
                                        <p className="text-2xl font-black">{t('resultDetail.weightChange')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{t('resultDetail.bodyFat')}</p>
                                        <p className="text-2xl font-black">{t('resultDetail.fatChange')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{t('resultDetail.plan')}</p>
                                        <p className="text-2xl font-black">{t('resultDetail.contestPrep')}</p>
                                    </div>
                                </div>

                                <div className="prose prose-invert">
                                    <h3 className="text-2xl font-black uppercase text-white mb-4">{t('resultDetail.strategy')}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        "{t('resultDetail.strategyText')}"
                                    </p>
                                    <h3 className="text-2xl font-black uppercase text-white mb-4">{t('resultDetail.clientFeedback')}</h3>
                                    <blockquote className="border-l-4 border-accent pl-6 italic text-gray-300">
                                        "{t('resultDetail.clientQuote')}"
                                    </blockquote>
                                </div>
                            </div>

                            <div className="bg-surface p-8 brutalist-border">
                                <h4 className="text-xl font-black uppercase mb-4">{t('resultDetail.wantResults')}</h4>
                                <p className="text-sm text-gray-400 mb-6 font-medium">
                                    {t('resultDetail.wantResultsText')}
                                </p>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="w-full py-5 bg-white text-dark font-black tracking-[0.2em] hover:bg-accent transition-colors"
                                >
                                    {t('resultDetail.startJourney')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultDetail;
