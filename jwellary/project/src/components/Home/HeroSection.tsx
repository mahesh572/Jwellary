import React from 'react';
import Button from '../UI/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-teal-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Banner Heading
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
            </p>
            <Button size="lg" className="px-8 py-3">
              Shop Now
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-teal-100 rounded-full w-96 h-96 mx-auto relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Featured Jewelry"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Floating product elements */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg animate-pulse">
              <img
                src="https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Ring"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-8 bg-white rounded-full p-3 shadow-lg animate-pulse delay-1000">
              <img
                src="https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Earrings"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;