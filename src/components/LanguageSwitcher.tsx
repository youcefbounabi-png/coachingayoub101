import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs font-bold tracking-wider border border-border hover:border-accent hover:text-accent transition-colors uppercase"
            aria-label="Switch language"
        >
            {i18n.language === 'en' ? 'العربية' : 'EN'}
        </button>
    );
};

export default LanguageSwitcher;
