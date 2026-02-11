
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-black font-heading tracking-tighter hover:text-accent transition-colors">
          AYOUB <span className="text-accent">CMB</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-bold tracking-widest hover:text-accent transition-colors ${isActive ? 'text-accent' : 'text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="px-6 py-2 bg-accent text-dark font-black tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1"
          >
            APPLY NOW
          </NavLink>
        </div>

        {/* Mobile Trigger - Explicitly Visible on Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-white hover:text-accent transition-colors cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-20 left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-border flex flex-col items-center py-10 space-y-8 shadow-2xl"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-2xl font-black font-heading tracking-widest hover:text-accent transition-colors ${isActive ? 'text-accent' : 'text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-accent text-dark font-black tracking-widest text-sm hover:bg-white transition-all"
              >
                APPLY NOW
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
