
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark border-t border-border py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tighter">
            AYOUB <span className="text-accent">CMB</span>
          </h2>
          <p className="text-gray-400 max-w-xs uppercase text-sm font-medium tracking-wide">
            Elite coaching for the dedicated few. We don't build bodies; we build champions.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-dark transition-all">
              IG
            </a>
            <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-dark transition-all">
              YT
            </a>
            <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-dark transition-all">
              TW
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-accent font-black tracking-widest text-sm">NAVIGATION</h3>
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-accent font-black tracking-widest text-sm">OFFICE</h3>
          <div className="text-sm text-gray-400 space-y-2 uppercase">
            <p>Dubai, Marina District</p>
            <p>UAE - 00000</p>
            <p>coach@ayoubcumb.com</p>
          </div>
          <NavLink to="/contact" className="inline-block mt-4 border-b-2 border-accent text-accent font-bold tracking-tighter pb-1 hover:text-white transition-all">
            WORK WITH ME
          </NavLink>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-border text-center">
        <p className="text-xs text-gray-600 font-bold tracking-[0.2em]">
          &copy; 2024 AYOUB CMB PERFORMANCE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
