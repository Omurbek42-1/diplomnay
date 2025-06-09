import React, { useEffect, useRef, useState } from 'react';
import { Award, Coffee, Globe, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Award, value: '50+', label: t('yearsExperience') },
    { icon: Coffee, value: '35,000+', label: t('coffeeShops') },
    { icon: Globe, value: '80+', label: t('countries') },
    { icon: Users, value: '400,000+', label: 'Сотрудников' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-starbucks-dark mb-6">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <img
              src="https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Barista preparing coffee"
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-starbucks-dark mb-4">
                {t('ourMission')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('missionText')}
              </p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-starbucks-dark mb-4">
                {t('qualityTitle')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('qualityText')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-starbucks-primary rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center text-white ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Image Section */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <img
              src="https://images.pexels.com/photos/3094018/pexels-photo-3094018.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Coffee shop interior"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <img
              src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Coffee beans"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;