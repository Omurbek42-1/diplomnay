import React, { useState } from 'react';
import { Coffee, Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'products', label: t('products') },
    { id: 'reviews', label: t('reviews') },
    { id: 'contacts', label: t('contacts') }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-starbucks-primary" />
            <span className="text-2xl font-bold text-starbucks-primary">Starbucks</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-700 hover:text-starbucks-primary transition-colors duration-200 font-medium ${
                  activeSection === item.id ? 'text-starbucks-primary border-b-2 border-starbucks-primary' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ru' ? 'ky' : 'ru')}
              className="flex items-center space-x-1 text-gray-700 hover:text-starbucks-primary transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-starbucks-primary transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-starbucks-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-starbucks-primary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 px-4 text-gray-700 hover:text-starbucks-primary hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id ? 'text-starbucks-primary bg-gray-50' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('cart')}</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Корзина пуста</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{t(item.size)}</p>
                      <p className="text-starbucks-primary font-semibold">{item.price} сом</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">{t('total')}:</span>
                    <span className="text-xl font-bold text-starbucks-primary">{getTotalPrice()} сом</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">{t('paymentMethods')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <button className="p-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                        {t('mbank')}
                      </button>
                      <button className="p-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium">
                        {t('demirbank')}
                      </button>
                      <button className="p-3 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium">
                        {t('myMoney')}
                      </button>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-starbucks-primary text-white py-3 rounded-lg hover:bg-starbucks-secondary transition-colors duration-200 font-semibold">
                    {t('checkout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;