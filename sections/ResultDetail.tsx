import React, { useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

const ResultDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // In a real app, fetch data based on ID. For now, we mock it or redirect.
    // Using simple logic to show placeholder data.

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="pt-32 pb-20 animate-liquid-fade">
            <div className="max-w-6xl mx-auto px-6">
                <NavLink to="/results" className="inline-block mb-12 text-accent font-black tracking-widest text-xs hover:translate-x-[-4px] transition-transform">
                    &larr; BACK TO RESULTS
                </NavLink>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Images Side */}
                    <div className="space-y-6">
                        <div className="brutalist-border p-2 bg-surface">
                            <img
                                src={`https://picsum.photos/seed/result_${id}_after/600/800`}
                                alt="Transformation Result"
                                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="flex justify-between mt-2 px-2">
                                <span className="text-xs font-black bg-dark text-white px-2 py-1">BEFORE</span>
                                <span className="text-xs font-black bg-accent text-dark px-2 py-1">AFTER</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-accent font-black tracking-widest text-sm mb-2 block">TRANSFORMATION #{id}</span>
                            <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none mb-6">
                                TOTAL <br /><span className="text-outline">REBUILD.</span>
                            </h1>

                            <div className="grid grid-cols-2 gap-8 mb-12 border-y border-gray-800 py-8">
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">DURATION</p>
                                    <p className="text-2xl font-black">16 WEEKS</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">WEIGHT</p>
                                    <p className="text-2xl font-black">-12.5 KG</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">BODY FAT</p>
                                    <p className="text-2xl font-black">18% &rarr; 6%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">PLAN</p>
                                    <p className="text-2xl font-black">CONTEST PREP</p>
                                </div>
                            </div>

                            <div className="prose prose-invert">
                                <h3 className="text-2xl font-black uppercase text-white mb-4">THE STRATEGY</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    "We started with a metabolic repair phase. The client was under-eating and over-training. We pulled back volume, increased calories, and drove up strength numbers. Once metabolism was primed, we executed a 12-week deficit while maintaining 98% of lean tissue."
                                </p>

                                <h3 className="text-2xl font-black uppercase text-white mb-4">CLIENT FEEDBACK</h3>
                                <blockquote className="border-l-4 border-accent pl-6 italic text-gray-300">
                                    "I thought I knew how to train until I started this program. The level of detail in the bio-feedback monitoring changed everything. I stepped on stage confident and full."
                                </blockquote>
                            </div>
                        </div>

                        <div className="bg-surface p-8 brutalist-border">
                            <h4 className="text-xl font-black uppercase mb-4">WANT RESULTS LIKE THIS?</h4>
                            <p className="text-sm text-gray-400 mb-6 font-medium">
                                Every transformation starts with a decision. Apply now to see if you qualify for the team.
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full py-5 bg-white text-dark font-black tracking-[0.2em] hover:bg-accent transition-colors"
                            >
                                START YOUR JOURNEY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDetail;
