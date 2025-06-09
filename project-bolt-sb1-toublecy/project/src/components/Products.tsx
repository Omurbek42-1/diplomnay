import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const Products: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
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

  const products = [
    {
      id: 'latte',
      name: t('latte'),
      description: t('latteDesc'),
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 180, large: 240 }
    },
    {
      id: 'cappuccino',
      name: t('cappuccino'),
      description: t('cappuccinoDesc'),
      image: 'https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 170, large: 230 }
    },
    {
      id: 'americano',
      name: t('americano'),
      description: t('americanoDesc'),
      image: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 120, large: 160 }
    },
    {
      id: 'macchiato',
      name: t('macchiato'),
      description: t('macchiatoDesc'),
      image: 'https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 200, large: 260 }
    },
    {
      id: 'mocha',
      name: t('mocha'),
      description: t('mochaDesc'),
      image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 220, large: 280 }
    },
    {
      id: 'frappuccino',
      name: t('frappuccino'),
      description: t('frappuccinoDesc'),
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: { small: 250, large: 320 }
    }
  ];

  const handleAddToCart = (product: typeof products[0], size: 'small' | 'large') => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.prices[size],
      size,
      image: product.image
    });
  };

  return (
    <section id="products" ref={sectionRef} className="py-16 lg:py-24 bg-starbucks-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-starbucks-dark mb-6">
            {t('productsTitle')}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-starbucks-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Size and Price Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-700">{t('small')}</span>
                      <span className="block text-lg font-bold text-starbucks-primary">
                        {product.prices.small} сом
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product, 'small')}
                      className="bg-starbucks-primary hover:bg-starbucks-secondary text-white p-2 rounded-full transition-colors duration-200 transform hover:scale-105"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-700">{t('large')}</span>
                      <span className="block text-lg font-bold text-starbucks-primary">
                        {product.prices.large} сом
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product, 'large')}
                      className="bg-starbucks-primary hover:bg-starbucks-secondary text-white p-2 rounded-full transition-colors duration-200 transform hover:scale-105"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;