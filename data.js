// Dummy property data for the real estate marketplace
const properties = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    price: 2500000,
    location: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    type: "Villa",
    images: ["assets/Luxury Villa in Beverly Hills.jpg"],
    description: "Stunning luxury villa with panoramic views, pool, and modern amenities.",
    features: ["Pool", "Garden", "Garage", "Security System"],
    agent: "John Doe",
    listedDate: "2023-10-01"
  },
  {
    id: 2,
    title: "Modern Apartment Downtown",
    price: 850000,
    location: "Downtown LA, CA",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "Apartment",
    images: ["assets/Modern Apartment Downtown.jpg"],
    description: "Contemporary apartment in the heart of the city with city views.",
    features: ["City View", "Gym", "Parking"],
    agent: "Jane Smith",
    listedDate: "2023-09-15"
  },
  {
    id: 3,
    title: "Cozy Family Home",
    price: 650000,
    location: "Suburbia, CA",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: "House",
    images: ["assets/Cozy Family Home.webp"],
    description: "Perfect family home with large backyard and updated kitchen.",
    features: ["Backyard", "Updated Kitchen", "Fireplace"],
    agent: "Bob Johnson",
    listedDate: "2023-08-20"
  },
  {
    id: 4,
    title: "Penthouse Suite",
    price: 3200000,
    location: "Hollywood, CA",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    type: "Penthouse",
    images: ["assets/Penthouse Suite.webp"],
    description: "Exclusive penthouse with rooftop terrace and luxury finishes.",
    features: ["Rooftop Terrace", "Concierge", "High-End Finishes"],
    agent: "Alice Brown",
    listedDate: "2023-11-01"
  },
  {
    id: 5,
    title: "Beachfront Condo",
    price: 1200000,
    location: "Malibu, CA",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: "Condo",
    images: ["assets/Beachfront Condo.webp"],
    description: "Oceanfront condo with direct beach access and stunning sunsets.",
    features: ["Beach Access", "Ocean View", "Balcony"],
    agent: "Charlie Wilson",
    listedDate: "2023-07-10"
  },
  {
    id: 6,
    title: "Historic Townhouse",
    price: 950000,
    location: "Old Town, CA",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: "Townhouse",
    images: ["assets/Historic Townhouse.webp"],
    description: "Charming historic townhouse with original features and modern updates.",
    features: ["Historic Charm", "Hardwood Floors", "Patio"],
    agent: "Diana Lee",
    listedDate: "2023-06-05"
  }
];

// Function to get property by ID
function getPropertyById(id) {
  return properties.find(property => property.id === parseInt(id));
}

// Function to filter properties
function filterProperties(filters) {
  return properties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    if (filters.type && property.type !== filters.type) return false;
    return true;
  });
}
