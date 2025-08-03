import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingBag, Heart, User, Menu, X, Crown } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cart, wishlist } = useSelector((state) => state.app);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-rose-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-rose-500 to-primary-500 text-white text-sm py-2">
        <div className="container text-center">
          <p className="font-medium">✨ Free shipping on orders over $500 | 30-day returns ✨</p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-rose-500 to-primary-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold gradient-text">Lumière</h1>
              <p className="text-xs text-slate-500 -mt-1">Fine Jewelry</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/collections" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Collections
            </Link>
            <Link to="/engagement" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Engagement
            </Link>
            <Link to="/wedding" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Wedding
            </Link>
            <Link to="/fine-jewelry" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Fine Jewelry
            </Link>
            <Link to="/watches" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Watches
            </Link>
            <Link to="/gifts" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">
              Gifts
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-slate-600 hover:text-primary-600 transition-colors hover:bg-primary-50 rounded-xl">
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button className="p-2 text-slate-600 hover:text-primary-600 transition-colors hover:bg-primary-50 rounded-xl relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <Link 
              to="/cart" 
              className="p-2 text-slate-600 hover:text-primary-600 transition-colors hover:bg-primary-50 rounded-xl relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-slate-600 hover:text-primary-600 transition-colors hover:bg-primary-50 rounded-xl"
              >
                <User size={20} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-slide-down">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-medium text-slate-800">{user?.firstName}</p>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 animate-slide-down">
            <nav className="flex flex-col space-y-2 mt-4">
              <Link 
                to="/collections" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/engagement" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Engagement
              </Link>
              <Link 
                to="/wedding" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wedding
              </Link>
              <Link 
                to="/fine-jewelry" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fine Jewelry
              </Link>
              <Link 
                to="/watches" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Watches
              </Link>
              <Link 
                to="/gifts" 
                className="py-3 px-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gifts
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;