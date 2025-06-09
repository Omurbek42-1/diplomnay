import React from 'react';
import { Coffee, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-starbucks-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-starbucks-accent" />
              <span className="text-2xl font-bold">Starbucks</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              С 1971 года мы создаем уникальный опыт кофейной культуры, 
              объединяя людей и сообщества по всему миру через наш премиальный кофе.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-starbucks-accent transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('products')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('reviews')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t('address')}</li>
              <li>{t('phone')}</li>
              <li>info@starbucks.kg</li>
              <li>{t('workingHours')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Starbucks Кыргызстан. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;