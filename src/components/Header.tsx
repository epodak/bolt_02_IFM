import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-orange-500">IFM</span>
              <span className="font-bold text-xl ml-1">Services</span>
            </Link>
            
            <nav className="hidden md:flex ml-10">
              <Link to="/products?category=digital" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                数字化服务
              </Link>
              <Link to="/products?category=onsite" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                现场执行
              </Link>
              <Link to="/products?category=physical" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                软硬一体
              </Link>
              <Link to="/products?category=training" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                培训课程
              </Link>
              <Link to="/products?category=bundle" className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                组合套餐
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="relative hidden md:block mr-4">
              <input
                type="text"
                placeholder="搜索服务..."
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <Link to="/cart" className="p-2 hover:text-orange-500 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            
            <Link to="/account" className="p-2 hover:text-orange-500 transition-colors ml-2">
              <User className="h-5 w-5" />
            </Link>
            
            <button 
              className="p-2 md:hidden ml-2" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/products?category=digital" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                数字化服务
              </Link>
              <Link 
                to="/products?category=onsite" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                现场执行
              </Link>
              <Link 
                to="/products?category=physical" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                软硬一体
              </Link>
              <Link 
                to="/products?category=training" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                培训课程
              </Link>
              <Link 
                to="/products?category=bundle" 
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                组合套餐
              </Link>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="搜索服务..."
                  className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;