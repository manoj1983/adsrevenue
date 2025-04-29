
import React, { Suspense } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

// Animation variants
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

// Loading fallback with smoother animation
const SectionLoading = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-3xl h-64"
    />
  </div>
);

// Lazy loading section wrapper component with smoother animations
const LazySection = ({ children, id }: { children: React.ReactNode, id: string }) => (
  <motion.div 
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px 0px" }}
    variants={fadeInUp}
  >
    {children}
  </motion.div>
);

const Contact = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main 
            className="flex-grow pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-background py-20 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
                  alt="Digital Marketing Background"
                  className="w-full h-full object-cover opacity-20"
                  loading="eager"
                />
              </div>
              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: 0.3, duration: 0.6 } 
                    }
                  }}
                  className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
                >
                  Contact Us
                </motion.h1>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: 0.4, duration: 0.6 } 
                    }
                  }}
                  className="text-lg text-foreground"
                >
                  We'd love to hear from you. Reach out to our team with any questions or inquiries.
                </motion.p>
              </div>
            </motion.div>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="contact-form">
                <ContactSection />
              </LazySection>
            </Suspense>

            {/* Google Maps Embed Section */}
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="location">
                <section className="py-12 bg-muted">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-4 text-foreground">Our Office Location</h2>
                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Visit our office to meet with our team and discuss your needs in person.
                      </p>
                      <div className="w-full rounded-lg overflow-hidden shadow-lg">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.515003117422!2d77.07703487475443!3d28.704151280826157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07c2f97f0a23%3A0x252d1b2d16651b6!2sGraceleen%20MediaWorks%20-%20Digital%20Marketing%20Agency%20in%20Delhi%2C%20Website%20Designing%20Agency%20in%20Delhi!5e0!3m2!1sen!2sin!4v1745932949575!5m2!1sen!2sin" 
                          width="100%" 
                          height="450" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg shadow-lg"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </section>
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="faq">
                <section className="py-16 bg-background">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                          className="bg-card p-6 rounded-lg relative overflow-hidden border border-border"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: 0.1 * index, duration: 0.5 }
                            }
                          }}
                        >
                          <h3 className="text-xl font-bold mb-2 relative z-10 text-foreground">{faq.question}</h3>
                          <p className="text-muted-foreground relative z-10">{faq.answer}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              </LazySection>
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Contact;
