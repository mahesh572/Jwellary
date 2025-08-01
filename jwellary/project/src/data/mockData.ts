import { Product, Category, User, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    price: 2499.99,
    originalPrice: 2999.99,
    image: 'https://images.pexels.com/photos/1446944/pexels-photo-1446944.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'rings',
    rating: 4.9,
    reviewCount: 127,
    description: 'Exquisite 1-carat diamond solitaire ring in 18k white gold setting',
    inStock: true,
    featured: true,
    material: '18k White Gold',
    gemstone: '1ct Diamond',
    size: 'Adjustable'
  },
  {
    id: '2',
    name: 'Pearl Drop Earrings',
    price: 899.99,
    image: 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'earrings',
    rating: 4.8,
    reviewCount: 89,
    description: 'Elegant freshwater pearl drop earrings with gold accents',
    inStock: true,
    featured: true,
    material: '14k Gold',
    gemstone: 'Freshwater Pearls'
  },
  {
    id: '3',
    name: 'Emerald Tennis Bracelet',
    price: 1899.99,
    image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'bracelets',
    rating: 4.7,
    reviewCount: 64,
    description: 'Stunning emerald tennis bracelet with diamond accents',
    inStock: true,
    featured: true,
    material: '18k Yellow Gold',
    gemstone: 'Emeralds & Diamonds'
  },
  {
    id: '4',
    name: 'Rose Gold Chain Necklace',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'necklaces',
    rating: 4.6,
    reviewCount: 156,
    description: 'Delicate rose gold chain necklace with heart pendant',
    inStock: true,
    featured: true,
    material: '14k Rose Gold'
  },
  {
    id: '5',
    name: 'Sapphire Cocktail Ring',
    price: 3299.99,
    image: 'https://images.pexels.com/photos/1446944/pexels-photo-1446944.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'rings',
    rating: 4.9,
    reviewCount: 43,
    description: 'Bold sapphire cocktail ring surrounded by diamonds',
    inStock: true,
    material: 'Platinum',
    gemstone: '3ct Sapphire'
  },
  {
    id: '6',
    name: 'Vintage Gold Watch',
    price: 4599.99,
    image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'watches',
    rating: 4.8,
    reviewCount: 78,
    description: 'Classic vintage-inspired gold watch with leather strap',
    inStock: true,
    material: '18k Gold'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Rings',
    image: 'https://images.pexels.com/photos/1446944/pexels-photo-1446944.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 45,
    description: 'Engagement rings, wedding bands, and statement pieces'
  },
  {
    id: '2',
    name: 'Necklaces',
    image: 'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 32,
    description: 'Elegant chains, pendants, and statement necklaces'
  },
  {
    id: '3',
    name: 'Earrings',
    image: 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 28,
    description: 'Studs, hoops, and drop earrings for every occasion'
  },
  {
    id: '4',
    name: 'Bracelets',
    image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 19,
    description: 'Tennis bracelets, bangles, and charm bracelets'
  },
  {
    id: '5',
    name: 'Watches',
    image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 15,
    description: 'Luxury timepieces and elegant dress watches'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@jewelry.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    createdAt: '2024-01-15T10:30:00Z',
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 2 },
    ],
    total: 4299.97,
    status: 'processing',
    createdAt: '2024-01-20T14:30:00Z',
    shippingAddress: {
      street: '123 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  }
];