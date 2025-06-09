import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ru' | 'ky';
  setLanguage: (lang: 'ru' | 'ky') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    about: 'О нас',
    products: 'Продукты',
    reviews: 'Отзывы',
    contacts: 'Контакты',
    
    // Home page
    welcome: 'Добро пожаловать в Starbucks',
    welcomeSubtitle: 'Откройте для себя наш мир премиального кофе',
    exploreMenu: 'Посмотреть меню',
    
    // About page
    aboutTitle: 'О компании Starbucks',
    aboutDescription: 'С 1971 года мы создаем уникальный опыт кофейной культуры, объединяя людей и сообщества по всему миру.',
    ourMission: 'Наша миссия',
    missionText: 'Вдохновлять и питать человеческий дух — один человек, одна чашка и один район за раз.',
    qualityTitle: 'Качество кофе',
    qualityText: 'Мы тщательно отбираем лучшие кофейные зерна со всего мира и обжариваем их с особой заботой.',
    yearsExperience: '50+ лет опыта',
    coffeeShops: '35,000+ кофеен',
    countries: '80+ стран',
    
    // Products
    productsTitle: 'Наши продукты',
    addToCart: 'В корзину',
    size: 'Размер',
    small: 'Маленький',
    large: 'Большой',
    cart: 'Корзина',
    total: 'Итого',
    checkout: 'Оформить заказ',
    removeFromCart: 'Удалить',
    
    // Product names and descriptions
    latte: 'Латте',
    latteDesc: 'Нежный кофе с молоком и легкой молочной пенкой',
    cappuccino: 'Капучино',
    cappuccinoDesc: 'Классический кофе с густой молочной пеной',
    americano: 'Американо',
    americanoDesc: 'Крепкий черный кофе для истинных ценителей',
    macchiato: 'Макиато',
    macchiatoDesc: 'Эспрессо с каплей вспененного молока',
    mocha: 'Мокка',
    mochaDesc: 'Кофе с шоколадом и взбитыми сливками',
    frappuccino: 'Фраппучино',
    frappuccinoDesc: 'Охлаждающий кофейный напиток со льдом',
    
    // Reviews
    reviewsTitle: 'Отзывы наших клиентов',
    
    // Contacts
    contactsTitle: 'Свяжитесь с нами',
    contactForm: 'Контактная форма',
    name: 'Имя',
    email: 'Email',
    message: 'Сообщение',
    send: 'Отправить',
    ourLocation: 'Наше местоположение',
    address: 'г. Бишкек, ул. Чуй 123',
    phone: '+996 312 123 456',
    workingHours: 'Часы работы: 7:00 - 23:00',
    
    // Payment methods
    paymentMethods: 'Способы оплаты',
    mbank: 'МБанк',
    demirbank: 'ДемирБанк',
    myMoney: 'Мой О Деньги'
  },
  ky: {
    // Navigation
    home: 'Башкы бет',
    about: 'Биз жөнүндө',
    products: 'Продукттар',
    reviews: 'Пикирлер',
    contacts: 'Байланыш',
    
    // Home page
    welcome: 'Starbucks-ка кош келиңиз',
    welcomeSubtitle: 'Биздин премиум кофе дүйнөсүн ачыңыз',
    exploreMenu: 'Менюну көрүү',
    
    // About page
    aboutTitle: 'Starbucks компаниясы жөнүндө',
    aboutDescription: '1971-жылдан бери биз дүйнө жүзү боюнча адамдарды жана коомдорду бириктирип, уникалдуу кофе маданиятынын тажрыйбасын түзөбүз.',
    ourMission: 'Биздин миссия',
    missionText: 'Адамдардын рухун шыктандыруу жана азыктандыруу — бир адам, бир чыны жана бир район.',
    qualityTitle: 'Кофенин сапаты',
    qualityText: 'Биз дүйнө жүзүнөн эң мыкты кофе дандарын тандап алып, аларды өзгөчө камкордук менен куурабыз.',
    yearsExperience: '50+ жыл тажрыйба',
    coffeeShops: '35,000+ кофеканалар',
    countries: '80+ өлкөлөр',
    
    // Products
    productsTitle: 'Биздин продукттар',
    addToCart: 'Себетке салуу',
    size: 'Өлчөм',
    small: 'Кичине',
    large: 'Чоң',
    cart: 'Себет',
    total: 'Жалпы',
    checkout: 'Буйрутманы тариздөө',
    removeFromCart: 'Алып салуу',
    
    // Product names and descriptions
    latte: 'Латте',
    latteDesc: 'Сүт жана жеңил сүт көбүгү менен жумшак кофе',
    cappuccino: 'Капучино',
    cappuccinoDesc: 'Калың сүт көбүгү менен классикалык кофе',
    americano: 'Американо',
    americanoDesc: 'Чыныгы баалоочулар үчүн күчтүү кара кофе',
    macchiato: 'Макиато',
    macchiatoDesc: 'Көбүктүү сүттүн тамчысы менен эспрессо',
    mocha: 'Мокка',
    mochaDesc: 'Шоколад жана согулган каймак менен кофе',
    frappuccino: 'Фраппучино',
    frappuccinoDesc: 'Муз менен салкындатуучу кофе суусундугу',
    
    // Reviews
    reviewsTitle: 'Кардарларыбыздын пикирлери',
    
    // Contacts
    contactsTitle: 'Биз менен байланышыңыз',
    contactForm: 'Байланыш формасы',
    name: 'Аты',
    email: 'Email',
    message: 'Билдирүү',
    send: 'Жөнөтүү',
    ourLocation: 'Биздин жайгашкан жери',
    address: 'Бишкек ш., Чүй көч. 123',
    phone: '+996 312 123 456',
    workingHours: 'Иш убактысы: 7:00 - 23:00',
    
    // Payment methods
    paymentMethods: 'Төлөө ыкмалары',
    mbank: 'МБанк',
    demirbank: 'ДемирБанк',
    myMoney: 'Менин Акчам'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ru' | 'ky'>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};