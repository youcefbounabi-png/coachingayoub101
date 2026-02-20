
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { PROGRAMS } from '../lib/constants';
import { ProgramPlan } from '../lib/types';
import PaymentOptions from '../components/PaymentOptions';

const ProgramDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [program, setProgram] = useState<ProgramPlan | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const p = PROGRAMS.find(item => item.id === id);
        if (!p) {
            navigate('/programs');
        } else {
            setProgram(p);
        }
    }, [id, navigate]);

    if (!program) return null;

    return (
        <>
            <Helmet>
                <title>{program.name} Coaching | Ayoub CMB</title>
                <meta name="description" content={`${program.name} — ${program.price} ${program.duration}. ${program.description}`} />
                <link rel="canonical" href={`https://ayoubcmb.com/programs/${id}`} />
            </Helmet>

            <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark via-surface/50 to-dark relative overflow-hidden">
                {/* Floating accent elements */}
                <div className="absolute top-20 left-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="max-w-4xl mx-auto px-6">
                    <NavLink to="/programs" className="inline-block mb-12 text-accent font-black tracking-widest text-xs hover:translate-x-[-4px] transition-transform">
                        &larr; BACK TO PROGRAMS
                    </NavLink>

                    <div className="space-y-12">
                        <div className="border-b-8 border-accent pb-8">
                            <span className="text-sm font-black tracking-[0.4em] text-gray-500 mb-2 block">COACHING TIER: {program.level}</span>
                            <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter leading-none uppercase">
                                {program.name}
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div className="p-8 brutalist-border bg-surface">
                                    <h3 className="text-accent font-black tracking-widest text-sm mb-4 uppercase">PRICING & TERMS</h3>
                                    <p className="text-5xl font-black mb-2">{program.price}</p>
                                    <p className="text-sm font-bold text-gray-500 tracking-widest uppercase">{program.duration}</p>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <h3 className="text-white text-2xl font-black uppercase mb-4 tracking-tighter">PLAN PHILOSOPHY</h3>
                                    <p className="text-gray-400 font-medium leading-relaxed">
                                        The {program.name} tier is engineered for individuals who are beyond the "hobbyist" stage. Whether it's your first time stepping onto a regional stage or you're aiming for national qualification, this protocol manages your metabolic rate, hormonal health, and mechanical tension at a professional level.
                                    </p>
                                    <p className="text-gray-400 font-medium leading-relaxed mt-4">
                                        We don't just "give a diet." We provide a full physiological management system. Expect to log everything: from morning weight and resting heart rate to weekly blood glucose readings if necessary.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-8 brutalist-border bg-surface">
                                    <h3 className="text-accent font-black tracking-widest text-sm mb-6 uppercase">INCLUDED IN {program.name}</h3>
                                    <ul className="space-y-6">
                                        {program.features.map((feat, i) => (
                                            <li key={i} className="flex items-start text-sm font-bold tracking-wide uppercase text-gray-300">
                                                <span className="text-accent mr-4">/</span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <PaymentOptions
                                    planId={program.id}
                                    planName={program.name}
                                    priceUSD={program.price}
                                    priceDZD={program.id === 'basic' ? '20,000' : program.id === 'pro' ? '40,000' : '80,000'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgramDetail;
