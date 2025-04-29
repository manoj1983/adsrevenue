
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, Phone } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
              className="h-12"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/about') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/services') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/blog') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-foreground hover:text-brand-orange transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-brand-orange after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center ${isActive('/contact') ? 'font-semibold text-brand-orange after:scale-x-100' : 'font-medium'}`}
            >
              Contact
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
                )}
              </button>
              
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
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
              )}
            </button>
            <button 
              className="text-foreground"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${isActive('/') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${isActive('/about') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${isActive('/services') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/blog" 
                className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${isActive('/blog') ? 'font-semibold text-brand-orange' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`text-foreground hover:text-brand-orange transition-colors duration-300 font-medium py-2 relative ${isActive('/contact') ? 'font-semibold text-brand-orange' : ''}`}
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
        </div>
      )}
    </header>
  );
};

export default Header;
