// Sample product data for dynamic navigation
const productsData = [
  {
    id: 's21ultra',
    name: 'Samsung Galaxy S21 Ultra',
    category: 'Electronics',
    price: 999.99,
    oldPrice: 1199.99,
    discount: 17,
    rating: 4.5,
    reviews: 128,
    image: 'images/samsung-galaxy-s21.png',
    images: [
      'images/samsung-galaxy-s21.png',
      'images/samsung-galaxy-s21-back.png'
    ],
    brand: 'Samsung',
    sku: 'SM-G998B',
    description: 'Experience the ultimate in mobile technology with the Samsung Galaxy S21 Ultra. Featuring a stunning 6.8-inch Dynamic AMOLED display, powerful 108MP camera system, and 5G connectivity.',
    specs: {
      Display: '6.8\" Dynamic AMOLED 2X',
      Processor: 'Exynos 2100',
      RAM: '12GB/16GB',
      Storage: '128GB/256GB/512GB',
      Battery: '5000mAh'
    }
  },
  {
    id: 'iphone13pro',
    name: 'iPhone 13 Pro',
    category: 'Electronics',
    price: 1099.99,
    oldPrice: 1299.99,
    discount: 15,
    rating: 4.8,
    reviews: 210,
    image: 'images/iphone-13-pro.png',
    images: [
      'images/iphone-13-pro.png'
    ],
    brand: 'Apple',
    sku: 'IP13PRO',
    description: 'The iPhone 13 Pro features a new camera system, improved battery life, and the powerful A15 Bionic chip.',
    specs: {
      Display: '6.1\" Super Retina XDR',
      Processor: 'A15 Bionic',
      RAM: '6GB',
      Storage: '128GB/256GB/512GB/1TB',
      Battery: '3095mAh'
    }
  },
  {
    id: 'pixel6',
    name: 'Google Pixel 6',
    category: 'Electronics',
    price: 699.99,
    oldPrice: 799.99,
    discount: 13,
    rating: 4.6,
    reviews: 95,
    image: 'images/pixel-6.png',
    images: [
      'images/pixel-6.png'
    ],
    brand: 'Google',
    sku: 'PIXEL6',
    description: 'Google Pixel 6 with Google Tensor chip, all-day battery, and advanced camera features.',
    specs: {
      Display: '6.4\" AMOLED',
      Processor: 'Google Tensor',
      RAM: '8GB',
      Storage: '128GB/256GB',
      Battery: '4614mAh'
    }
  },
  {
    id: 'smartwatch',
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 299.99,
    oldPrice: 349.99,
    discount: 14,
    rating: 4.4,
    reviews: 75,
    image: 'images/smartwatch.png',
    images: [
      'images/smartwatch.png'
    ],
    brand: 'SmartTech',
    sku: 'SWP-001',
    description: 'Advanced smartwatch with health tracking, notifications, and long battery life.',
    specs: {
      Display: '1.4\" AMOLED',
      Battery: '340mAh',
      Connectivity: 'Bluetooth 5.0',
      Waterproof: 'IP68',
      Sensors: 'Heart Rate, SpO2, GPS'
    }
  },
  {
    id: 'headphones',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 249.99,
    oldPrice: 299.99,
    discount: 17,
    rating: 4.7,
    reviews: 120,
    image: 'images/headphones.png',
    images: [
      'images/headphones.png'
    ],
    brand: 'AudioPro',
    sku: 'APH-200',
    description: 'Premium wireless headphones with active noise cancellation and superior sound quality.',
    specs: {
      Type: 'Over-ear',
      Battery: '30 hours',
      Connectivity: 'Bluetooth 5.0',
      Features: 'ANC, Touch Controls',
      Driver: '40mm Dynamic'
    }
  },
  {
    id: 'coffee-maker',
    name: 'Smart Coffee Maker',
    category: 'Home Appliances',
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    rating: 4.3,
    reviews: 85,
    image: 'images/coffee-maker.png',
    images: [
      'images/coffee-maker.png'
    ],
    brand: 'HomeSmart',
    sku: 'HSC-100',
    description: 'Smart coffee maker with programmable settings and mobile app control.',
    specs: {
      Capacity: '12 cups',
      Power: '1000W',
      Features: 'WiFi, App Control',
      Programs: '5 Brew Settings',
      Filter: 'Permanent'
    }
  },
  {
    id: 'lamp',
    name: 'Smart LED Desk Lamp',
    category: 'Home Appliances',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    rating: 4.5,
    reviews: 65,
    image: 'images/lamp.png',
    images: [
      'images/lamp.png'
    ],
    brand: 'LightPro',
    sku: 'LP-200',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    specs: {
      Power: '10W',
      Colors: '3 Modes',
      Brightness: '5 Levels',
      Features: 'Touch Control',
      Lifespan: '50,000 hours'
    }
  }
]; 