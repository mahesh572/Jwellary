import React from 'react';
import { Truck, RotateCcw, Headphones, Gift } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50">
      {/* Services Section */}
      <div className="border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-teal-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Complimentary Delivery</h3>
              <p className="text-sm text-gray-600">Free shipping on orders over $100</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="text-teal-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy Return or Exchange</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-teal-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Company at Your Service</h3>
              <p className="text-sm text-gray-600">24/7 customer support</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="text-teal-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Free Gift Wrapping</h3>
              <p className="text-sm text-gray-600">Beautiful packaging included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Client Care */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Client Care</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/contact" className="hover:text-teal-600 transition-colors">Contact Us</a></li>
                <li><a href="/size-guide" className="hover:text-teal-600 transition-colors">Size Guide</a></li>
                <li><a href="/track-order" className="hover:text-teal-600 transition-colors">Track Your Order</a></li>
                <li><a href="/returns" className="hover:text-teal-600 transition-colors">Returns & Exchanges</a></li>
              </ul>
            </div>

            {/* Our Company */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Our Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/about" className="hover:text-teal-600 transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-teal-600 transition-colors">Careers</a></li>
                <li><a href="/sustainability" className="hover:text-teal-600 transition-colors">Sustainability</a></li>
                <li><a href="/press" className="hover:text-teal-600 transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Related Site */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Related Site</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/wedding-registry" className="hover:text-teal-600 transition-colors">Wedding & Gift Registry</a></li>
                <li><a href="/business-accounts" className="hover:text-teal-600 transition-colors">Business Accounts</a></li>
                <li><a href="/affiliate" className="hover:text-teal-600 transition-colors">Affiliate Program</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Subscribe To Our Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Be the first to know about our latest collections and exclusive offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2024 Jewelry Store. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-teal-600 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-teal-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;