// src/data/categoriesData.js

export const categories = [
  {
    id: "all",
    name: "All Coffees",
    icon: "coffee",
    color: "#6F4E37",
    description: "Explore our complete coffee collection",
    count: 10
  },
  {
    id: "hot",
    name: "Hot Coffees",
    icon: "hot",
    color: "#FF6B35",
    description: "Warm and comforting hot beverages",
    count: 5
  },
  {
    id: "cold",
    name: "Cold Coffees",
    icon: "cold",
    color: "#4A90E2",
    description: "Refreshing iced and cold brew options",
    count: 3
  },
  {
    id: "espresso",
    name: "Espresso",
    icon: "espresso",
    color: "#8B4513",
    description: "Strong and intense espresso shots",
    count: 1
  },
  {
    id: "special",
    name: "Specialty",
    icon: "star",
    color: "#FFD700",
    description: "Unique and specialty coffee drinks",
    count: 2
  }
];

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

export const getCategoryName = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.name : "All Coffees";
};

export const getCategoryColor = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.color : "#6F4E37";
};

export const getCategoryIcon = (categoryId) => {
  const category = getCategoryById(categoryId);
  const icons = {
    coffee: "coffee",
    hot: "hot",
    cold: "cold",
    espresso: "espresso",
    star: "star"
  };
  return category ? icons[category.icon] : "coffee";
};