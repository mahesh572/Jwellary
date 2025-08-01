import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const FeaturedProducts: React.FC = () => {
  const { dispatch } = useApp();
  const featuredProducts = mockProducts.filter(product => product.featured);

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleAddToWishlist = (product: any) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">
            Featured Collection
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our most coveted pieces, handpicked for their exceptional beauty and craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="card card-hover group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-rose-600 transition-colors shadow-lg"
                  >
                    <Heart size={20} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-primary-600 transition-colors shadow-lg"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) 
                          ? 'text-gold-400 fill-current' 
                          : 'text-slate-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500 ml-2">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-slate-800">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* Material Indicator */}
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-rose-300 to-rose-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary px-8 py-3">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;