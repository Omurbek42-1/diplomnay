import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Reviews: React.FC = () => {
  const { t, language } = useLanguage();
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

  const reviews = {
    ru: [
      {
        id: 1,
        name: 'Анна Петрова',
        rating: 5,
        text: 'Потрясающий кофе и отличное обслуживание! Латте здесь просто невероятный. Обязательно вернусь еще.',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 2,
        name: 'Дмитрий Смирнов',
        rating: 5,
        text: 'Лучшее место для работы в городе. Атмосфера уютная, кофе отменный, wi-fi быстрый. Что еще нужно?',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 3,
        name: 'Елена Козлова',
        rating: 4,
        text: 'Очень вкусный капучино и приятная атмосфера. Персонал дружелюбный и профессиональный.',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 4,
        name: 'Михаил Иванов',
        rating: 5,
        text: 'Отличное качество кофе по разумным ценам. Особенно нравится американо - крепкий и ароматный.',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 5,
        name: 'Ольга Сидорова',
        rating: 5,
        text: 'Моё любимое место для встреч с друзьями. Фраппучино здесь готовят лучше всех в городе!',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 6,
        name: 'Александр Николаев',
        rating: 4,
        text: 'Хорошее место с качественным кофе. Персонал всегда улыбается и быстро обслуживает.',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    ky: [
      {
        id: 1,
        name: 'Айнура Касымова',
        rating: 5,
        text: 'Абдан сонун кофе жана мыкты тейлөө! Латте бул жерде укмуштуудай. Сөзсүз кайра келем.',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 2,
        name: 'Эрлан Тологонов',
        rating: 5,
        text: 'Шаарда иштөө үчүн эң мыкты жер. Атмосфера жайлуу, кофе эң сонун, wi-fi тез. Дагы эмне керек?',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 3,
        name: 'Гүлнара Жумабекова',
        rating: 4,
        text: 'Абдан даамдуу капучино жана жагымдуу атмосфера. Кызматкерлер достук жана кесипкөй.',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 4,
        name: 'Нурбек Исаков',
        rating: 5,
        text: 'Акылдуу бааларда кофенин мыкты сапаты. Өзгөчө американо жагат - күчтүү жана жыттуу.',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 5,
        name: 'Жамила Абдырахманова',
        rating: 5,
        text: 'Достор менен жолугушуу үчүн сүйүктүү жерим. Фраппучинону шаарда эң жакшы даярдашат!',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 6,
        name: 'Бакыт Мамытов',
        rating: 4,
        text: 'Сапаттуу кофе менен жакшы жер. Кызматкерлер ар дайым жылмайышат жана тез тейлешет.',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  };

  const currentReviews = reviews[language];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="reviews" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-starbucks-dark mb-6">
            {t('reviewsTitle')}
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentReviews.map((review, index) => (
            <div
              key={review.id}
              className={`bg-starbucks-light p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar and Name */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-starbucks-dark">{review.name}</h3>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-starbucks-primary text-white px-8 py-4 rounded-full">
            <div className="flex space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-xl font-semibold">4.8/5</span>
            <span className="text-white/90">• 1,247 отзывов</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;