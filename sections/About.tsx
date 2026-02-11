
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-32 animate-liquid-fade">
          <div>
            <h1 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-6 md:mb-10 leading-none">
              AYOUB <br />
              <span className="text-accent">CMB.</span>
            </h1>
            <div className="space-y-6 text-lg md:text-xl font-medium text-gray-300 leading-relaxed uppercase">
              <p>
                Coach. Athlete. Engineer of Human Performance.
              </p>
              <p className="border-l-4 border-accent pl-6 text-gray-400">
                With over a decade on the front lines of competitive bodybuilding, I've seen the industry evolve from "gut feel" to scientific precision. My mission is to bridge that gap for you.
              </p>
              <p>
                I don't believe in mediocre results. Every athlete under my wing is treated as a high-performance machine. We optimize your fuel, your torque, and your recovery until the objective is achieved.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/about_profile.jpg"
              alt="Ayoub CMB Profile"
              className="w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700 brutalist-border shadow-[30px_30px_0px_0px_rgba(212,255,0,1)]"
            />
            <div className="absolute -bottom-10 -left-10 bg-dark p-6 border-4 border-white max-w-xs hidden md:block">
              <p className="text-xs font-black tracking-widest italic">"THE ONLY BARRIER BETWEEN YOU AND YOUR PRO CARD IS THE DISCIPLINE YOU LACK TODAY."</p>
            </div>
          </div>
        </div>

        <div className="py-20 border-y border-border">
          <h2 className="text-4xl font-black font-heading tracking-tighter mb-12 uppercase">HALL OF RESULTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-liquid-fade delay-200">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="space-y-4">
                <span className="text-accent font-black tracking-widest text-xs uppercase">{ach.year} // {ach.category}</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter">{ach.title}</h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide leading-snug">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 animate-liquid-fade delay-300">
          <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
            <p className="text-6xl font-black text-outline mb-4">01</p>
            <h4 className="font-black text-xl mb-4">BIO-MECHANICS</h4>
            <p className="text-xs font-bold text-gray-500 uppercase">Eliminating inefficient movement patterns to maximize tension.</p>
          </div>
          <div className="bg-accent text-dark p-10">
            <p className="text-6xl font-black mb-4">02</p>
            <h4 className="font-black text-xl mb-4">NUTRITION</h4>
            <p className="text-xs font-black uppercase">Metabolic adaptation management and nutrient partition scaling.</p>
          </div>
          <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
            <p className="text-6xl font-black text-outline mb-4">03</p>
            <h4 className="font-black text-xl mb-4">RECOVERY</h4>
            <p className="text-xs font-bold text-gray-500 uppercase">Sleep architecture and neurological fatigue monitoring.</p>
          </div>
          <div className="glass-brutalist p-10 hover:border-accent transition-all duration-300">
            <p className="text-6xl font-black text-outline mb-4">04</p>
            <h4 className="font-black text-xl mb-4">MINDSET</h4>
            <p className="text-xs font-bold text-gray-500 uppercase">Psychological grit and tactical stage confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
