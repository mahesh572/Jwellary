import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-primary-400 rounded-full opacity-20"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-rose-400 rounded-full opacity-20"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200 mb-6">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-slate-700">New Collection Available</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-slate-800 mb-6 leading-tight">
              Exquisite
              <span className="gradient-text block">Jewelry</span>
              for Every Moment
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Discover our handcrafted collection of fine jewelry, where timeless elegance meets modern sophistication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Shop Collection</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
                <img
                  src="https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Luxury Jewelry Collection"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Product Cards */}
              <div className="absolute -top-4 -left-4 z-20 animate-float">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
                  <img
                    src="https://images.pexels.com/photos/1446944/pexels-photo-1446944.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Diamond Ring"
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <p className="text-xs font-medium text-slate-700 mt-2">Diamond Ring</p>
                  <p className="text-xs text-primary-600 font-semibold">$2,499</p>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 z-20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
                  <img
                    src="https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Pearl Earrings"
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <p className="text-xs font-medium text-slate-700 mt-2">Pearl Earrings</p>
                  <p className="text-xs text-primary-600 font-semibold">$899</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;