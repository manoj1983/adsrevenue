
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25, 
      stiffness: 100,
      duration: 0.6 
    }
  }
};

const ContactFormSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Advertising Strategy?</h2>
            <p className="text-lg opacity-90">
              Fill out the form below for a free consultation and discover how we can help you achieve your advertising goals.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 }
              }
            }}
            id="contact-form"
            className="bg-white text-gray-800 p-8 rounded-xl shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">Website</label>
                  <Input id="website" placeholder="yourcompany.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">How can we help?</label>
                <Textarea id="message" rows={4} placeholder="Tell us about your advertising goals..." required />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                Get Your Free Consultation <ArrowRight className="ml-2" />
              </Button>
              <p className="text-xs text-center text-gray-500">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
