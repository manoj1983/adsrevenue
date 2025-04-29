
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b4c7ee97-2259-42bf-b426-81aa9d18ada6.png" 
              alt="Ads Revenue Logo" 
              className="h-12"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-800 hover:text-brand-orange relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-800 hover:text-brand-orange relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/about') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`text-gray-800 hover:text-brand-orange relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/services') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className={`text-gray-800 hover:text-brand-orange relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/blog') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-800 hover:text-brand-orange relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/contact') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Contact
            </Link>
            <Link to="/contact">
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                Get Started
              </Button>
            </Link>
          </nav>

          <button 
            className="md:hidden text-gray-800"
            onClick={toggleMenu}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-800 hover:text-brand-orange font-medium py-2 relative ${isActive('/') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-800 hover:text-brand-orange font-medium py-2 relative ${isActive('/about') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`text-gray-800 hover:text-brand-orange font-medium py-2 relative ${isActive('/services') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/blog" 
                className={`text-gray-800 hover:text-brand-orange font-medium py-2 relative ${isActive('/blog') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-800 hover:text-brand-orange font-medium py-2 relative ${isActive('/contact') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button 
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white w-full"
                >
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
