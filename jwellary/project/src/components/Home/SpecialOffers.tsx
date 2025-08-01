import React from 'react';
import Button from '../UI/Button';

const SpecialOffers: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mother's Day Gifts */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mother's Day Gifts</h3>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Gift Box"
                className="w-32 h-32 mx-auto rounded-lg object-cover"
              />
            </div>
            <Button variant="outline" size="sm">
              Shop Now
            </Button>
          </div>

          {/* Gifts for Her */}
          <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Gifts for Her</h3>
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Jewelry Gift"
                className="w-32 h-32 mx-auto rounded-lg object-cover"
              />
            </div>
            <Button variant="outline" size="sm">
              Shop Now
            </Button>
          </div>

          {/* Something Brilliant */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Something Brilliant</h3>
            <p className="text-sm text-gray-600 mb-4">Awaits on 4/28</p>
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Luxury Item"
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>
            <Button variant="ghost" size="sm">
              Learn More
            </Button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Love Your Way</h4>
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/1446944/pexels-photo-1446944.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Love Collection"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
              <Button variant="ghost" size="sm">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;