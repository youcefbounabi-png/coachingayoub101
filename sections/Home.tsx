
import React from 'react';
import { NavLink } from 'react-router-dom';
import TestimonialsSection from '../components/Testimonials';
import AchievementsSection from './Achievements';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Video-like Animation */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 animate-ken-burns grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-5xl">
            <span className="inline-block px-3 py-1 bg-accent text-dark font-black text-xs tracking-[0.3em] mb-6 animate-liquid-fade delay-100">
              ELITE COACH & NUTRITIONIST
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-[120px] font-black font-heading leading-[0.9] tracking-tighter mb-8 animate-liquid-fade delay-200">
              BUILD YOUR <br />
              <span className="text-accent font-cormorant italic font-bold">BEST BODY</span> <br />
              EVER.
            </h1>
            <p className="text-lg md:text-3xl text-gray-200 font-bold max-w-2xl mb-12 border-l-4 md:border-l-8 border-accent pl-6 md:pl-8 py-2 uppercase leading-tight animate-liquid-fade delay-300">
              Simple. Effective. Real results for serious people. Join the elite team of Ayoub CMB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-liquid-fade delay-500">
              <NavLink to="/programs" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-accent text-dark font-black tracking-widest text-base md:text-lg hover:bg-white transition-all transform hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] text-center">
                START NOW
              </NavLink>
              <NavLink to="/results" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 brutalist-border text-white font-black tracking-widest text-base md:text-lg hover:border-accent transition-all transform hover:-translate-y-2 text-center">
                SEE RESULTS
              </NavLink>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
          <span className="text-[10px] font-black tracking-widest uppercase mb-2">SCROLL</span>
          <div className="w-px h-12 bg-accent"></div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-accent py-4 border-y-2 border-dark marquee-container">
        <div className="flex animate-marquee space-x-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <span key={i} className="text-dark font-black text-2xl tracking-tighter uppercase">
              NO EXCUSES • ONLY RESULTS • TRAINING • NUTRITION • RECOVERY • NO EXCUSES •
            </span>
          ))}
        </div>
      </div>

      {/* Why Choose Me - Simplified Pillars */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <h2 className="text-5xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-none">
              WHY <br /><span className="text-outline">CMB?</span>
            </h2>
            <p className="text-gray-400 font-bold text-sm md:text-lg max-w-md uppercase tracking-wide">
              I don't sell dreams. I give you the plan. You do the work. We get the results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="p-8 md:p-12 brutalist-border bg-surface group hover:bg-accent transition-colors duration-500">
              <h3 className="text-5xl md:text-7xl font-black text-outline group-hover:text-dark mb-6 md:mb-8 transition-colors">01</h3>
              <h4 className="text-xl md:text-2xl font-black mb-4 group-hover:text-dark">THE BEST PLAN</h4>
              <p className="text-sm md:text-base text-gray-500 font-bold group-hover:text-dark/70 uppercase">Custom training and food for YOUR body. No generic templates.</p>
            </div>
            <div className="p-8 md:p-12 brutalist-border bg-surface group hover:bg-accent transition-colors duration-500">
              <h3 className="text-5xl md:text-7xl font-black text-outline group-hover:text-dark mb-6 md:mb-8 transition-colors">02</h3>
              <h4 className="text-xl md:text-2xl font-black mb-4 group-hover:text-dark">24/7 SUPPORT</h4>
              <p className="text-sm md:text-base text-gray-500 font-bold group-hover:text-dark/70 uppercase">You talk directly to me. I guide you every step of the way.</p>
            </div>
            <div className="p-8 md:p-12 brutalist-border bg-surface group hover:bg-accent transition-colors duration-500">
              <h3 className="text-5xl md:text-7xl font-black text-outline group-hover:text-dark mb-6 md:mb-8 transition-colors">03</h3>
              <h4 className="text-xl md:text-2xl font-black mb-4 group-hover:text-dark">REAL SCIENCE</h4>
              <p className="text-sm md:text-base text-gray-500 font-bold group-hover:text-dark/70 uppercase">We track your data, bloodwork, and sleep. Pure performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Client Result - Visual Fill */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border-4 border-accent -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="/client_journey.jpg"
                alt="Transformation"
                className="w-full grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-700 brutalist-border relative z-10"
              />
            </div>
            <div className="space-y-8">
              <span className="text-accent font-black tracking-[0.4em] text-xs md:text-sm">CLIENT JOURNEY</span>
              <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.9]">
                FROM ZERO TO <br /><span className="text-accent font-cormorant italic font-bold">PRO STATUS</span>
              </h2>
              <p className="text-base md:text-xl text-gray-400 font-bold leading-snug uppercase">
                "CMB changed my life. I stopped guessing and started growing. The plan was clear, the support was real."
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-4xl font-black font-heading">16KG</p>
                  <p className="text-xs font-bold text-gray-500 tracking-widest">WEIGHT GAINED</p>
                </div>
                <div>
                  <p className="text-4xl font-black font-heading">24 WKS</p>
                  <p className="text-xs font-bold text-gray-500 tracking-widest">DURATION</p>
                </div>
              </div>
              <NavLink to="/results" className="inline-block border-b-4 border-accent pb-2 text-lg md:text-2xl font-black tracking-tighter hover:text-accent transition-all">
                SEE ALL TRANSFORMATIONS &rarr;
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Carousel */}
      <AchievementsSection />

      <TestimonialsSection />

      {/* Big CTA Section */}
      <section className="py-20 md:py-40 bg-accent text-dark text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <h2 className="text-[150px] md:text-[300px] font-black leading-none select-none">CMB CMB CMB</h2>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-9xl font-black font-heading tracking-tighter mb-8 md:mb-12 leading-none uppercase">
            STOP <br />WAITING.
          </h2>
          <p className="text-lg md:text-2xl font-black mb-8 md:mb-12 uppercase tracking-wide">
            Your body deserves the best coaching. Let's start your journey today.
          </p>
          <NavLink to="/contact" className="inline-block px-10 md:px-16 py-6 md:py-8 bg-dark text-white font-black tracking-[0.3em] text-lg md:text-2xl hover:scale-110 transition-transform">
            APPLY TO TEAM
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
