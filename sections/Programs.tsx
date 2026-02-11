
import React from 'react';
import { PROGRAMS } from '../constants';
import { NavLink } from 'react-router-dom';

const Programs: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-20 animate-liquid-fade">
          <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-4">
            CHOOSE <span className="text-accent italic">YOUR PLAN</span>
          </h1>
          <p className="text-base md:text-xl font-bold tracking-widest text-gray-500 max-w-xl border-l-4 md:border-l-8 border-accent pl-6 uppercase">
            Serious coaching for serious athletes. No fluff. Just the plan you need to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-liquid-fade delay-200">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="brutalist-border p-4 md:p-10 bg-surface flex flex-col h-full brutalist-card transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-10">
                <span className="px-3 py-1 bg-accent text-dark font-black text-xs tracking-[0.2em]">
                  {program.level.toUpperCase()}
                </span>
                <span className="text-3xl font-black text-white">{program.price}</span>
              </div>

              <h3 style={{ fontSize: '28px' }} className="text-[28px] sm:text-3xl md:text-5xl font-black font-heading tracking-tight mb-3 sm:mb-6 uppercase leading-tight max-w-full whitespace-normal break-words">
                {program.name}
              </h3>

              <p className="text-[10px] sm:text-xs md:text-base text-gray-400 font-bold mb-6 md:mb-10 flex-grow uppercase leading-tight">
                {program.description}
              </p>

              <ul className="space-y-5 mb-12">
                {program.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-[9px] sm:text-[10px] md:text-xs font-black tracking-wide md:tracking-widest text-gray-200 uppercase leading-snug">
                    <span className="w-3 h-3 bg-accent mr-3 mt-0.5 flex-shrink-0"></span>
                    {feat}
                  </li>
                ))}
              </ul>

              <NavLink
                to={`/programs/${program.id}`}
                className="w-full py-4 md:py-5 text-center font-black tracking-wider md:tracking-[0.2em] text-sm md:text-base bg-white text-dark hover:bg-accent transition-colors"
              >
                SELECT {program.level}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-accent text-dark brutalist-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-4 leading-none uppercase">
                NEED A <br />CUSTOM DEAL?
              </h2>
              <p className="text-lg font-black tracking-widest uppercase opacity-80">
                If you have specific needs or a unique situation, talk to me directly.
              </p>
            </div>
            <div className="flex md:justify-end">
              <NavLink to="/contact" className="w-full md:w-auto px-8 md:px-12 py-5 md:py-6 bg-dark text-white font-black tracking-widest text-base md:text-lg hover:bg-white hover:text-dark transition-all transform hover:-translate-y-2 text-center">
                MESSAGE ME
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
