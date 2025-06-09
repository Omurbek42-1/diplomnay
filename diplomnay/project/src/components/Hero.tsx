import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onExploreMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Coffee Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          {t('welcome')}
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 animate-slide-up max-w-2xl mx-auto">
          {t('welcomeSubtitle')}
        </p>
        <button
          onClick={onExploreMenu}
          className="group inline-flex items-center space-x-2 bg-starbucks-primary hover:bg-starbucks-secondary text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-scale-in"
        >
          <span>{t('exploreMenu')}</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;