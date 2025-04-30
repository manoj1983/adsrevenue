
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-background/70 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b4c7ee97-2259-42bf-b426-81aa9d18ada6.png" 
              alt="Ads Revenue Logo" 
              className="h-12 transition-all duration-300"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative ${
                isActive('/') 
                  ? 'font-semibold text-brand-orange after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-brand-orange after:rounded-full' 
                  : 'font-medium'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative ${
                isActive('/about') 
                  ? 'font-semibold text-brand-orange after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-brand-orange after:rounded-full' 
                  : 'font-medium'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative ${
                isActive('/services') 
                  ? 'font-semibold text-brand-orange after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-brand-orange after:rounded-full' 
                  : 'font-medium'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative ${
                isActive('/blog') 
                  ? 'font-semibold text-brand-orange after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-brand-orange after:rounded-full' 
                  : 'font-medium'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative ${
                isActive('/contact') 
                  ? 'font-semibold text-brand-orange after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-brand-orange after:rounded-full' 
                  : 'font-medium'
              }`}
            >
              Contact
            </Link>
            
            <div className="flex items-center gap-4">              
              <a href="tel:+919555442836">
                <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center gap-2">
                  <Phone size={18} />
                  <span className="hidden sm:inline">+91 9555442836</span>
                </Button>
              </a>
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button 
              className="text-foreground"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-background shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${
                    isActive('/') 
                      ? 'font-semibold text-brand-orange border-l-4 border-brand-orange pl-2' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${
                    isActive('/about') 
                      ? 'font-semibold text-brand-orange border-l-4 border-brand-orange pl-2' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${
                    isActive('/services') 
                      ? 'font-semibold text-brand-orange border-l-4 border-brand-orange pl-2' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/blog" 
                  className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${
                    isActive('/blog') 
                      ? 'font-semibold text-brand-orange border-l-4 border-brand-orange pl-2' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${
                    isActive('/contact') 
                      ? 'font-semibold text-brand-orange border-l-4 border-brand-orange pl-2' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <a 
                  href="tel:+919555442836"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white w-full flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    <span>+91 9555442836</span>
                  </Button>
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
