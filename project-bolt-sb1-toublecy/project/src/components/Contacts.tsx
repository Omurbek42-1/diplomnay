import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contacts: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacts" ref={sectionRef} className="py-16 lg:py-24 bg-starbucks-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-starbucks-dark mb-6">
            {t('contactsTitle')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div>
              <h3 className="text-2xl font-bold text-starbucks-dark mb-6">
                {t('ourLocation')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-starbucks-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-starbucks-dark mb-1">Адрес</h4>
                    <p className="text-gray-600">{t('address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-starbucks-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-starbucks-dark mb-1">Телефон</h4>
                    <p className="text-gray-600">{t('phone')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-starbucks-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-starbucks-dark mb-1">Email</h4>
                    <p className="text-gray-600">info@starbucks.kg</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-starbucks-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-starbucks-dark mb-1">Режим работы</h4>
                    <p className="text-gray-600">{t('workingHours')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map with red marker */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.5474929188854!2d74.59036731545756!3d42.87524147915795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec98dc8e44d6d%3A0x5a2501f1d5b05a8c!2sStarbucks%20Coffee!5e0!3m2!1sen!2sus!4v1645123456789!5m2!1sen!2sus&markers=color:red%7Clabel:S%7C42.87524147915795,74.59036731545756"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Starbucks Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-starbucks-dark mb-6">
                {t('contactForm')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-primary focus:border-transparent transition-colors duration-200"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-primary focus:border-transparent transition-colors duration-200"
                    placeholder="Введите ваш email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-primary focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Введите ваше сообщение"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-starbucks-primary hover:bg-starbucks-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{t('send')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;