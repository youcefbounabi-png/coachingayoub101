
import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingFormProps {
    planId: string;
    onComplete: (leadId: string) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ planId, onComplete }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        height: '',
        weight: '',
        healthProblems: '',
    });

    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles].slice(0, 3)); // Limit to 3 photos
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const nextStep = () => {
        if (step === 1 && (!formData.fullName || !formData.email)) {
            setError(t('onboarding.errContact'));
            return;
        }
        setError('');
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setError('');
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!supabase || !supabase.storage) {
            setError(t('onboarding.errConfig'));
            setLoading(false);
            return;
        }

        try {
            // 1. Upload photos
            const photoPaths: string[] = [];
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `onboarding/${Date.now()}-${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('physique-photos')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;
                photoPaths.push(filePath);
            }

            // 2. Save lead to DB
            const { data, error: dbError } = await supabase
                .from('coaching_leads')
                .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    height: parseFloat(formData.height) || null,
                    weight: parseFloat(formData.weight) || null,
                    health_problems: formData.healthProblems,
                    physique_photos: photoPaths,
                    plan_id: planId,
                }])
                .select()
                .single();

            if (dbError) throw dbError;

            onComplete(data.id);
        } catch (err) {
            console.error('Onboarding submission full error:', err);
            const e = err as any;
            setError(t('onboarding.errSubmit', { message: e.message || 'Unknown error' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="brutalist-border bg-surface p-8 space-y-8 animate-liquid-fade">
            <div className="border-b-4 border-accent pb-4 flex justify-between items-end">
                <div>
                    <span className="text-xs font-black tracking-[0.4em] text-gray-500 uppercase block mb-1">{t('onboarding.title')}</span>
                    <h2 className="text-3xl font-black font-heading tracking-tighter uppercase italic">{t('onboarding.subtitle')}</h2>
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-3 h-3 border-2 ${step >= i ? 'bg-accent border-accent shadow-[2px_2px_0px_0px_white]' : 'border-gray-800'}`}></div>
                    ))}
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-600 border-4 border-white text-white font-black text-xs tracking-widest uppercase">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.fullName')}</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.email')}</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.phone')}</label>
                                <input
                                    type="tel"
                                    className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.height')}</label>
                                    <input
                                        type="number"
                                        className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                        value={formData.height}
                                        onChange={e => setFormData({ ...formData, height: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.weight')}</label>
                                    <input
                                        type="number"
                                        className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                        value={formData.weight}
                                        onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-accent uppercase">{t('onboarding.healthProblems')}</label>
                                <textarea
                                    className="w-full bg-dark border-2 border-border p-4 text-white focus:border-accent outline-none font-bold uppercase transition-all"
                                    rows={3}
                                    value={formData.healthProblems}
                                    onChange={e => setFormData({ ...formData, healthProblems: e.target.value })}
                                    placeholder={t('onboarding.placeholderNone')}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <label className="text-[10px] font-black tracking-widest text-accent uppercase block">{t('onboarding.physiqueLabel')}</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-border p-10 text-center cursor-pointer hover:border-accent transition-colors bg-dark/50"
                                >
                                    <span className="text-xs font-black tracking-widest text-gray-500 uppercase">{t('onboarding.clickToUpload')}</span>
                                    <input
                                        type="file"
                                        hidden
                                        ref={fileInputRef}
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {files.map((file, i) => (
                                        <div key={i} className="relative aspect-[3/4] brutalist-border overflow-hidden bg-dark">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                className="w-full h-full object-cover"
                                                alt={`Preview ${i}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFile(i)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white font-bold text-xs"
                                            >X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex gap-4 pt-4 border-t-2 border-border/10">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={loading}
                            className="flex-1 py-4 border-2 border-border text-white font-black tracking-widest text-xs hover:bg-white hover:text-black transition-all uppercase"
                        >
                            &larr; {t('common.back')}
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex-[2] py-4 bg-white text-black font-black tracking-widest text-xs hover:bg-accent hover:shadow-[8px_8px_0px_0px_white] transition-all uppercase"
                        >
                            {t('onboarding.continue')} &rarr;
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading || files.length === 0}
                            className="flex-[2] py-4 bg-accent text-black font-black tracking-widest text-xs hover:bg-white hover:shadow-[8px_8px_0px_0px_accent] transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t('onboarding.submitting') : t('onboarding.completeToPayment')}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OnboardingForm;
