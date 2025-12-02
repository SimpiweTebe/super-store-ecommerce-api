export const CATEGORIES = {
  Jackets: 'Jackets',
  Dresses: 'Dresses',
  Jeans: 'Jeans',
  Shoes: 'Shoes',
}

export const products = [
  {
    id: 1,
    brand: `Levis Strauss`,
    name: '501 Jean',
    price: 999.00,
    category: CATEGORIES.Jeans,
    imageUrl: require('./images/jean/01.jpg'),
    availableSize: ['29','32','36', '40'],
    slideImages: [
      require('./images/jean/01.jpg'),
      require('./images/jean/02.jpg'),
      require('./images/jean/03.jpg'),
      require('./images/jean/04.jpg'),
    ],
    QTY: 0,
    description: `Levi's 501 men's jeans are the iconic original straight-leg denim with a signature button fly, known for their durability and timeless style that conforms to your shape over time. They are available from various online retailers and come in several fit variations besides the classic original.`
  },
  {
    id: 2,
    brand: `Levis Strauss`,
    name: '501 Jean',
    price: 999.00,
    category: CATEGORIES.Jeans,
    imageUrl: require('./images/jean/01.jpg'),
    availableSize: ['29','32','36', '40'],
    slideImages: [
      require('./images/jean/01.jpg'),
      require('./images/jean/02.jpg'),
      require('./images/jean/03.jpg'),
      require('./images/jean/04.jpg'),
    ],
    QTY: 0,
    description: `Levi's 501 men's jeans are the iconic original straight-leg denim with a signature button fly, known for their durability and timeless style that conforms to your shape over time. They are available from various online retailers and come in several fit variations besides the classic original.`
  },
]