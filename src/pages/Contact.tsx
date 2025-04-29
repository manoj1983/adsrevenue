
import React from 'react';
import { motion } from "framer-motion";
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.6
    }
  }
};

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow pt-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white py-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-black"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-black"
            >
              We'd love to hear from you. Reach out to our team with any questions or inquiries.
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ContactSection />
        </motion.div>

        {/* Office Location Section */}
        <motion.section 
          variants={item} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="py-12 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Office Location</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Visit our office to meet with our team and discuss your needs in person.
              </p>
              <div className="mt-6">
                <a 
                  href="https://maps.app.goo.gl/j7uBmtADgAkmqNmC9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center gap-2">
                    <span>View on Google Maps</span>
                    <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.section>
        
        <motion.section variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our services and how we can help you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How quickly can I expect to see results?",
                  answer: "While some improvements can be seen within days, significant revenue increases typically become apparent within 4-6 weeks as our optimization strategies take full effect."
                },
                {
                  question: "What services do you offer?",
                  answer: "We offer comprehensive digital marketing services including SEO (On-page, Off-page, Technical, Local), Google Ads, Meta Ads, Social Media Marketing, Content Marketing, Email Marketing, and Analytics Setup."
                },
                {
                  question: "Do you provide reports and analytics?",
                  answer: "Yes, we provide detailed monthly reports with comprehensive analytics and insights about your campaigns' performance and ROI."
                },
                {
                  question: "What makes your service different?",
                  answer: "Our approach combines cutting-edge technology with personalized strategies, ensuring maximum ROI for each client's unique needs and goals."
                },
                {
                  question: "How do you measure success?",
                  answer: "We track key performance indicators tailored to your specific goals, whether it's increased visibility, higher traffic, improved conversion rates, or enhanced revenue generation."
                },
                {
                  question: "What is your pricing structure?",
                  answer: "We offer flexible pricing plans customized to your business size and needs. We believe in transparent pricing with no hidden fees or long-term contracts unless specified."
                },
                {
                  question: "How long have you been in business?",
                  answer: "Ads Revenue was founded in 2025 and has been helping businesses optimize their advertising strategies and maximize their revenue ever since."
                },
                {
                  question: "Do you work with businesses of all sizes?",
                  answer: "Yes, we work with businesses of all sizes, from small local businesses to large enterprises. Our strategies are tailored to meet the specific needs and goals of each client."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-2 relative z-10">{faq.question}</h3>
                  <p className="text-gray-600 relative z-10">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;
