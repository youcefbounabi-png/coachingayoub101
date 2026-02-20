
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../lib/constants';

const navKeys: Record<string, string> = { '/': 'home', '/about': 'about', '/programs': 'programs', '/results': 'results', '/contact': 'contact' };

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-gradient-to-b from-surface to-dark border-t border-border py-20 relative overflow-hidden">
            {/* Subtle accent glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tighter">
                        AYOUB <span className="text-accent">CMB</span>
                    </h2>
                    <p className="text-gray-300 max-w-xs uppercase text-sm font-medium tracking-wide">
                        {t('footer.tagline')}
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
                    <h3 className="text-accent font-black tracking-widest text-sm">{t('footer.navigation')}</h3>
                    <div className="flex flex-col space-y-3">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.path} to={item.path} className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                                {t(`nav.${navKeys[item.path] || item.path.slice(1) || 'home'}`)}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-accent font-black tracking-widest text-sm">{t('footer.office')}</h3>
                    <div className="text-sm text-gray-300 space-y-2 uppercase">
                        <p>{t('footer.dubai')}</p>
                        <p>{t('footer.uae')}</p>
                        <p>coach@ayoubcumb.com</p>
                    </div>
                    <NavLink to="/contact" className="inline-block mt-4 border-b-2 border-accent text-accent font-bold tracking-tighter pb-1 hover:text-white transition-all">
                        {t('footer.workWithMe')}
                    </NavLink>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-border text-center">
                <p className="text-xs text-gray-500 font-bold tracking-[0.2em]">
                    {t('footer.copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
