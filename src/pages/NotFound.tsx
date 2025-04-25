
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="Digital Marketing Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-brand-orange/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-100/20 animate-pulse [animation-delay:1500ms]"></div>
      
      <div className="text-center relative z-10 bg-white/80 backdrop-blur-sm p-12 rounded-xl shadow-xl animate-fade-in">
        <h1 className="text-9xl font-bold text-brand-orange mb-4 animate-fade-in [animation-delay:200ms]">404</h1>
        <p className="text-2xl text-gray-700 mb-6 animate-fade-in [animation-delay:400ms]">Oops! Page not found</p>
        <p className="text-gray-600 max-w-md mb-8 animate-fade-in [animation-delay:600ms]">
          The page you're looking for doesn't seem to exist. Let's get you back on track.
        </p>
        <Link to="/">
          <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-6 text-lg animate-scale-in [animation-delay:800ms] transition-transform duration-300 hover:scale-105">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
