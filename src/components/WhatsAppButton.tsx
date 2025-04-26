
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919555442836"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-1/2 transform translate-y-1/2 right-0 bg-green-500 text-white p-3 rounded-l-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 z-40"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
