import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-white inline-block p-2 rounded-lg mb-4">
              <img 
                src="/lovable-uploads/b4c7ee97-2259-42bf-b426-81aa9d18ada6.png" 
                alt="Ads Revenue Logo" 
                className="h-12"
              />
            </div>
            <p className="mb-4 text-gray-300">
              Maximize your advertising revenue with our innovative solutions and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/adsrevenueofficial" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-orange">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/adsrevenuenet" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-orange">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/adsrevenueofficial" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-orange">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/ads-revenue" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-orange">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-brand-orange">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-brand-orange">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Services</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-brand-orange">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-brand-orange">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">SEO Services</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Google Ads</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Meta Ads</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Social Media Marketing</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Content Marketing</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand-orange">Email Marketing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="mr-3 text-brand-orange mt-1" size={18} />
                <a href="tel:+919555442836" className="text-gray-300 hover:text-brand-orange">+91 9555442836</a>
              </div>
              <div className="flex items-start">
                <Mail className="mr-3 text-brand-orange mt-1" size={18} />
                <a href="mailto:support@adsrevenue.net" className="text-gray-300 hover:text-brand-orange">support@adsrevenue.net</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ads Revenue. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
