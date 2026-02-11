
import React from 'react';
import { NavLink } from 'react-router-dom';

const Results: React.FC = () => {
  const cases = [
    { id: 1, name: "Marcus T.", change: "+12kg Lean Mass", duration: "16 Weeks", category: "Classic Physique" },
    { id: 2, name: "Sasha K.", change: "-8% Body Fat", duration: "12 Weeks", category: "Bikini Prep" },
    { id: 3, name: "David L.", change: "Overall Champion", duration: "Contest Prep", category: "Men's Physique" },
    { id: 4, name: "James R.", change: "Pro Card Winner", duration: "24 Month Journey", category: "Bodybuilding" },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-20 animate-liquid-fade">
          <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-4 uppercase">
            THE <span className="text-outline">PROOF</span>
          </h1>
          <p className="text-base md:text-xl font-bold tracking-widest text-gray-500 max-w-xl">
            CONSISTENT. MEASURABLE. ELITE. THESE ARE THE ATHLETES WHO FOLLOWED THE SYSTEM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-liquid-fade delay-200">
          {cases.map((c) => (
            <div key={c.id} className="brutalist-border p-0 bg-surface flex flex-col md:flex-row group overflow-hidden">
              <div className="w-full md:w-1/2 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/result_${c.id}/500/600?grayscale`}
                  alt={c.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <span className="text-accent font-black tracking-widest text-[10px] mb-2 uppercase">{c.category}</span>
                <h3 className="text-3xl font-black font-heading mb-4 uppercase">{c.name}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">RESULT</span>
                    <span className="text-xs font-black text-white uppercase">{c.change}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">TIME</span>
                    <span className="text-xs font-black text-white uppercase">{c.duration}</span>
                  </div>
                </div>
                <NavLink to={`/results/${c.id}`} className="mt-8 text-xs font-black tracking-widest border-2 border-white py-3 px-6 hover:bg-accent hover:border-accent hover:text-dark transition-all inline-block text-center">
                  VIEW JOURNEY
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 p-8 md:p-20 bg-dark border-4 border-dashed border-border text-center">
          <h2 className="text-3xl md:text-6xl font-black font-heading mb-6 md:mb-8 uppercase">YOU ARE NEXT.</h2>
          <p className="text-sm md:text-lg font-bold text-gray-500 mb-8 md:mb-12 max-w-2xl mx-auto uppercase tracking-wide">
            THE SYSTEM WORKS IF YOU DO. STOP GUESSING AND START GROWING WITH THE CMB PROTOCOL.
          </p>
          <a href="#/contact" className="inline-block px-8 md:px-12 py-4 md:py-6 bg-accent text-dark font-black tracking-[0.3em] text-lg md:text-xl transform hover:-rotate-2 transition-transform">
            APPLY TO TEAM
          </a>
        </div>
      </section>
    </div>
  );
};

export default Results;
