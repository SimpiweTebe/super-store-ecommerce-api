export const CATEGORIES = {
  Jackets: 'Jackets',
  Dresses: 'Dresses',
  Jeans: 'Jeans',
  Shoes: 'Shoes',
}

const baseURL = 'https://github.com/SimpiweTebe/super-store-ecommerce-api/blob/main/images'

export const products = [
  {
    id: 1,
    brand: `Levis Strauss`,
    name: '501 Jean',
    price: 999.00,
    category: CATEGORIES.Jeans,
    imageUrl: `${baseURL}/jean/01.jpg?raw=true`,
    availableSize: ['29','32','36', '40'],
    slideImages: [
     `${baseURL}/jean/01.jpg?raw=true`,
     `${baseURL}/jean/02.jpg?raw=true`,
     `${baseURL}/jean/03.jpg?raw=true`,
     `${baseURL}/jean/04.jpg?raw=true`,
    ],
    QTY: 0,
    description: `Levi's 501 men's jeans are the iconic original straight-leg denim with a signature button fly, known for their durability and timeless style that conforms to your shape over time. They are available from various online retailers and come in several fit variations besides the classic original.`
  },
  {
    id: 2,
    brand: `Nike`,
    name: 'Jordan XDR',
    price: 2799.99,
    category: CATEGORIES.Shoes,
    imageUrl: `${baseURL}/jordan/01.jpg?raw=true`,
    availableSize: ['6','7','8', '9', '10'],
    slideImages: [
     `${baseURL}/jordan/01.jpg?raw=true`,
     `${baseURL}/jordan/02.jpg?raw=true`,
     `${baseURL}/jordan/03.jpg?raw=true`,
     `${baseURL}/jordan/04.jpg?raw=true`,
     `${baseURL}/jordan/05.jpg?raw=true`,
    ],
    QTY: 0,
    description: `Extra Durable Rubber, a specific, harder rubber compound used in the outsole of some Nike and Jordan Brand athletic shoes, designed specifically for enhanced durability on outdoor courts.`
  },
  {
    id: 3,
    brand: `Polo Inc.`,
    name: 'Zipped jacket',
    price: 599.00,
    category: CATEGORIES.Jackets,
    imageUrl: `${baseURL}/jordan/01.jpg?raw=true`,
    availableSize: ['29','32','36', '40'],
    slideImages: [
     `${baseURL}/jacket01/01.jpg?raw=true`,
     `${baseURL}/jacket01/02.jpg?raw=true`,
     `${baseURL}/jacket01/03.jpg?raw=true`,
     `${baseURL}/jacket01/04.jpg?raw=true`,
     `${baseURL}/jacket01/05.jpg?raw=true`,
    ],
    QTY: 0,
    description: `Extra Durable Rubber, a specific, harder rubber compound used in the outsole of some Nike and Jordan Brand athletic shoes, designed specifically for enhanced durability on outdoor courts.`
  },
]