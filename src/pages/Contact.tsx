
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        experience: 'Beginner',
        goal: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
            const data = await response.json();
            if (response.ok) {
                setSubmitStatus('success');
                setFormState({ name: '', email: '', experience: 'Beginner', goal: '', message: '' });
            } else {
                throw new Error(data.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Apply Now | Ayoub CMB Elite Coaching</title>
                <meta name="description" content="Apply to join Ayoub CMB's elite coaching team. Only 5 new athletes accepted per month. Fill out the form to start your transformation journey." />
                <meta property="og:title" content="Apply Now | Ayoub CMB Elite Coaching" />
                <meta property="og:description" content="Only 5 new athletes per month. Apply to the CMB coaching team today." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ayoubcmb.com/contact" />
                <link rel="canonical" href="https://ayoubcmb.com/contact" />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-60 left-10 w-44 h-44 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 right-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <section className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 animate-liquid-fade">
                        <div>
                            <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-6 md:mb-8 uppercase leading-none">
                                {t('contact.title')} <br />
                                <span className="text-accent">{t('contact.titleAccent')}</span>
                            </h1>
                            <p className="text-xl font-bold tracking-widest text-gray-400 max-w-md uppercase mb-12">
                                {t('contact.subtitle')}
                            </p>

                            <div className="space-y-12">
                                <div className="brutalist-border p-8 bg-gradient-to-br from-surface to-surface/80">
                                    <h4 className="text-accent font-black tracking-widest text-sm mb-4">{t('contact.whatNext')}</h4>
                                    <div className="space-y-6">
                                        <div className="flex gap-6">
                                            <span className="text-2xl font-black text-outline">01</span>
                                            <p className="text-sm font-bold uppercase text-gray-400">{t('contact.step1')}</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <span className="text-2xl font-black text-outline">02</span>
                                            <p className="text-sm font-bold uppercase text-gray-400">{t('contact.step2')}</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <span className="text-2xl font-black text-outline">03</span>
                                            <p className="text-sm font-bold uppercase text-gray-400">{t('contact.step3')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-surface to-surface/80 brutalist-border p-6 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-accent uppercase">{t('contact.fullName')}</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-surface border-2 border-border p-4 text-white focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none font-bold uppercase transition-all hover:border-accent/50"
                                        placeholder={t('contact.namePlaceholder')}
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-accent uppercase">{t('contact.email')}</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-surface border-2 border-border p-4 text-white focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none font-bold uppercase transition-all hover:border-accent/50"
                                        placeholder={t('contact.emailPlaceholder')}
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-accent uppercase">{t('contact.experience')}</label>
                                    <select
                                        className="w-full bg-surface border-2 border-border p-4 text-white focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none font-bold uppercase transition-all hover:border-accent/50"
                                        value={formState.experience}
                                        onChange={e => setFormState({ ...formState, experience: e.target.value })}
                                    >
                                        <option value="Beginner">{t('contact.expBeginner')}</option>
                                        <option value="Intermediate">{t('contact.expIntermediate')}</option>
                                        <option value="Advanced">{t('contact.expAdvanced')}</option>
                                        <option value="Competitive Athlete">{t('contact.expCompetitive')}</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-accent uppercase">{t('contact.goal')}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-surface border-2 border-border p-4 text-white focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none font-bold uppercase transition-all hover:border-accent/50"
                                        placeholder={t('contact.goalPlaceholder')}
                                        value={formState.goal}
                                        onChange={e => setFormState({ ...formState, goal: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-6 bg-accent text-dark font-black tracking-[0.25em] text-lg hover:bg-white transition-all transform hover:-translate-y-2 hover:shadow-[15px_15px_0px_0px_rgba(255,255,255,1)] uppercase ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? t('contact.sending') : t('contact.applyNow')}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-green-600 border-4 border-white mt-6">
                                        <p className="text-white font-black tracking-wider text-sm uppercase text-center">
                                            {t('contact.successMsg')}
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-600 border-4 border-white mt-6">
                                        <p className="text-white font-black tracking-wider text-sm uppercase text-center">
                                            {t('contact.errorMsg')}
                                        </p>
                                    </div>
                                )}

                                <div className="text-center pt-4">
                                    <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">{t('contact.orConnect')}</p>
                                    <a href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-black text-white hover:text-accent transition-colors uppercase tracking-widest">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 rtl:ml-2 rtl:mr-0">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                        {t('contact.whatsapp')}
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Contact;
