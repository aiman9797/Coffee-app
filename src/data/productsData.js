// src/data/productsData.js

export const products = [
  {
    id: 1,
    name: "Hot Cappuccino",
    price: 250,
    oldPrice: 300,
    description: "Rich espresso with steamed milk and foam. A classic Italian coffee drink.",
    longDescription: "Cappuccino is a coffee drink that today is typically composed of a single espresso shot and hot milk, with the surface topped with foamed milk. It is a perfect balance of rich espresso, creamy milk, and airy foam. The name comes from the Capuchin friars, referring to the color of their habits.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213",
    category: "hot",
    roastType: "medium",
    flavor: ["chocolate", "nutty", "creamy"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isFeatured: true,
    isNew: false,
    discount: 15,
    ingredients: ["Espresso Shot", "Steamed Milk", "Milk Foam"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 120,
      sugar: 8,
      caffeine: 80,
      protein: 4,
      fat: 5
    },
    brewingTime: "3-5 minutes",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Caramel Latte",
    price: 280,
    oldPrice: 320,
    description: "Smooth latte with sweet caramel drizzle.",
    longDescription: "A delicious blend of espresso, steamed milk, and rich caramel syrup, topped with whipped cream and a caramel drizzle. Sweet, smooth, and satisfying - perfect for those with a sweet tooth.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    category: "hot",
    roastType: "dark",
    flavor: ["caramel", "sweet", "vanilla", "buttery"],
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    isFeatured: true,
    isNew: false,
    discount: 12,
    ingredients: ["Espresso Shot", "Steamed Milk", "Caramel Syrup", "Whipped Cream", "Caramel Drizzle"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 250,
      sugar: 28,
      caffeine: 75,
      protein: 6,
      fat: 8
    },
    brewingTime: "4-6 minutes",
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Iced Americano",
    price: 220,
    oldPrice: 250,
    description: "Refreshing cold coffee with bold flavor.",
    longDescription: "Espresso shots diluted with cold water and served over ice. Strong, refreshing, and perfect for hot days. Low in calories but high in caffeine content.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    category: "cold",
    roastType: "light",
    flavor: ["bold", "citrus", "clean", "bright"],
    rating: 4.3,
    reviewCount: 87,
    inStock: true,
    isFeatured: false,
    isNew: true,
    discount: 0,
    ingredients: ["Double Espresso", "Cold Water", "Ice Cubes"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 15,
      sugar: 0,
      caffeine: 150,
      protein: 0,
      fat: 0
    },
    brewingTime: "2-3 minutes",
    difficulty: "Easy"
  },
  {
    id: 4,
    name: "Mocha Frappe",
    price: 320,
    oldPrice: 380,
    description: "Chocolate coffee blended with ice and cream.",
    longDescription: "A blended coffee drink with chocolate, espresso, milk, and ice, topped with whipped cream and chocolate syrup. A dessert-like coffee experience that chocolate lovers will adore.",
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4d",
    category: "cold",
    roastType: "medium",
    flavor: ["chocolate", "sweet", "creamy", "rich"],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    isFeatured: true,
    isNew: false,
    discount: 18,
    ingredients: ["Espresso", "Chocolate Syrup", "Milk", "Ice", "Whipped Cream", "Chocolate Shavings"],
    sizes: ["Small (300ml)", "Medium (450ml)", "Large (600ml)"],
    nutritionalInfo: {
      calories: 380,
      sugar: 45,
      caffeine: 120,
      protein: 7,
      fat: 15
    },
    brewingTime: "5-7 minutes",
    difficulty: "Medium"
  },
  {
    id: 5,
    name: "Irish Coffee",
    price: 350,
    oldPrice: 400,
    description: "Coffee with Irish whiskey and cream.",
    longDescription: "Hot coffee with Irish whiskey, brown sugar, and topped with thick cream. A classic Irish warm-up that's perfect for cold evenings or special occasions.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    category: "special",
    roastType: "dark",
    flavor: ["whiskey", "creamy", "warm", "sweet"],
    rating: 4.6,
    reviewCount: 64,
    inStock: true,
    isFeatured: false,
    isNew: false,
    discount: 0,
    ingredients: ["Hot Coffee", "Irish Whiskey", "Brown Sugar", "Thick Cream"],
    sizes: ["Medium (250ml)", "Large (350ml)"],
    nutritionalInfo: {
      calories: 220,
      sugar: 12,
      caffeine: 85,
      protein: 2,
      fat: 10
    },
    brewingTime: "5-8 minutes",
    difficulty: "Hard",
    containsAlcohol: true
  },
  {
    id: 6,
    name: "Vanilla Latte",
    price: 270,
    oldPrice: 300,
    description: "Sweet vanilla flavored latte.",
    longDescription: "Espresso with steamed milk and vanilla syrup. Smooth, comforting, and perfectly sweetened. A crowd favorite that never disappoints.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a4",
    category: "hot",
    roastType: "medium",
    flavor: ["vanilla", "sweet", "smooth", "creamy"],
    rating: 4.4,
    reviewCount: 112,
    inStock: true,
    isFeatured: true,
    isNew: true,
    discount: 10,
    ingredients: ["Espresso Shot", "Steamed Milk", "Vanilla Syrup", "Vanilla Bean"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 200,
      sugar: 24,
      caffeine: 70,
      protein: 5,
      fat: 6
    },
    brewingTime: "3-5 minutes",
    difficulty: "Easy"
  },
  {
    id: 7,
    name: "Cold Brew",
    price: 300,
    oldPrice: 350,
    description: "Slow-steeped cold coffee.",
    longDescription: "Coffee grounds steeped in cold water for 12-24 hours. Smooth, less acidic, and naturally sweet. The perfect summer refreshment.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    category: "cold",
    roastType: "light",
    flavor: ["smooth", "chocolate", "nutty", "low-acid"],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isFeatured: false,
    isNew: false,
    discount: 0,
    ingredients: ["Cold Brew Coffee Concentrate", "Cold Water", "Ice"],
    sizes: ["Small (350ml)", "Medium (500ml)", "Large (750ml)"],
    nutritionalInfo: {
      calories: 5,
      sugar: 0,
      caffeine: 200,
      protein: 0,
      fat: 0
    },
    brewingTime: "12-24 hours (steeping)",
    difficulty: "Medium"
  },
  {
    id: 8,
    name: "Espresso Shot",
    price: 120,
    oldPrice: 150,
    description: "Strong and bold coffee shot.",
    longDescription: "A concentrated form of coffee made by forcing hot water through finely-ground coffee beans. Intense, aromatic, and the base for many coffee drinks.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a",
    category: "espresso",
    roastType: "dark",
    flavor: ["bold", "intense", "bitter", "aromatic"],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    isFeatured: false,
    isNew: false,
    discount: 0,
    ingredients: ["Freshly Ground Espresso Beans"],
    sizes: ["Single Shot (30ml)", "Double Shot (60ml)"],
    nutritionalInfo: {
      calories: 3,
      sugar: 0,
      caffeine: 75,
      protein: 0,
      fat: 0
    },
    brewingTime: "25-30 seconds",
    difficulty: "Hard"
  },
  {
    id: 9,
    name: "Hazelnut Latte",
    price: 290,
    oldPrice: 330,
    description: "Nutty and aromatic hazelnut latte.",
    longDescription: "Espresso combined with steamed milk and rich hazelnut syrup. Topped with crushed hazelnuts for extra crunch and flavor.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    category: "hot",
    roastType: "medium",
    flavor: ["hazelnut", "nutty", "creamy", "sweet"],
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    isFeatured: true,
    isNew: true,
    discount: 15,
    ingredients: ["Espresso Shot", "Steamed Milk", "Hazelnut Syrup", "Crushed Hazelnuts"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 230,
      sugar: 26,
      caffeine: 70,
      protein: 5,
      fat: 7
    },
    brewingTime: "3-5 minutes",
    difficulty: "Easy"
  },
  {
    id: 10,
    name: "Matcha Latte",
    price: 310,
    oldPrice: 360,
    description: "Japanese green tea latte.",
    longDescription: "Ceremonial grade matcha green tea powder whisked with hot water and combined with steamed milk. Earthy, sweet, and full of antioxidants.",
    image: "https://images.unsplash.com/photo-1534882870296-5a3f2ab0afdf",
    category: "special",
    roastType: "none",
    flavor: ["earthy", "sweet", "grassy", "creamy"],
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    isFeatured: true,
    isNew: true,
    discount: 10,
    ingredients: ["Matcha Powder", "Hot Water", "Steamed Milk", "Honey (optional)"],
    sizes: ["Small (240ml)", "Medium (350ml)", "Large (470ml)"],
    nutritionalInfo: {
      calories: 180,
      sugar: 15,
      caffeine: 45,
      protein: 6,
      fat: 5
    },
    brewingTime: "3-4 minutes",
    difficulty: "Medium",
    caffeineContent: "Low"
  }
];

// Featured Products
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// New Arrivals
export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

// Products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.flavor.some(f => f.toLowerCase().includes(searchTerm))
  );
};

// Get products by price range
export const getProductsByPriceRange = (min, max) => {
  return products.filter(product => product.price >= min && product.price <= max);
};

// Sort products
export const sortProducts = (products, sortBy) => {
  switch(sortBy) {
    case 'price_asc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price_desc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'rating_desc':
      return [...products].sort((a, b) => b.rating - a.rating);
    case 'newest':
      return [...products].sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    default:
      return products;
  }
};