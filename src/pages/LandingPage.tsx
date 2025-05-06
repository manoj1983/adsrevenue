
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Boost Your Ad Revenue by <span className="text-yellow-300">300%</span> in 60 Days
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  Our proven strategies have helped over 500 businesses increase their advertising ROI and maximize their revenue potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-700 font-bold px-8 py-6 text-lg"
                  >
                    <a href="#contact-form">Get Started Now</a>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg"
                  >
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl">
                  <img 
                    src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png" 
                    alt="Digital Marketing Dashboard" 
                    className="rounded-lg shadow-md"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-yellow-300 text-blue-700 font-bold px-6 py-3 rounded-lg shadow-lg">
                    +300% ROI
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Advertising Solutions Work</h2>
              <p className="text-lg text-gray-600">
                We combine industry expertise, data-driven insights, and cutting-edge technology to deliver exceptional results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Targeted Campaigns',
                  description: 'Reach your ideal customers with precision targeting across multiple platforms and channels.',
                  icon: '🎯'
                },
                {
                  title: 'Conversion Optimization',
                  description: 'Turn visitors into customers with our proven conversion rate optimization techniques.',
                  icon: '📈'
                },
                {
                  title: 'ROI-Focused Strategy',
                  description: 'Every dollar spent is tracked and optimized to maximize your return on investment.',
                  icon: '💰'
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.1 * index,
                        duration: 0.6
                      }
                    }
                  }}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have transformed their advertising strategy with us.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[1, 2, 3, 4].map((index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.1 * index,
                        duration: 0.6
                      }
                    }
                  }}
                  className="flex justify-center"
                >
                  <div className="h-12 w-36 bg-gray-200 rounded animate-pulse"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Comprehensive Advertising Solutions</h2>
              <p className="text-lg text-gray-600">
                Everything you need to drive growth through effective advertising across all platforms.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Google Ads Management',
                  features: [
                    'Keyword research and optimization',
                    'Ad copy creation and testing',
                    'Landing page optimization',
                    'Conversion tracking setup',
                    'Budget management and ROI tracking'
                  ]
                },
                {
                  title: 'Meta Advertising',
                  features: [
                    'Facebook and Instagram ad campaigns',
                    'Custom audience creation',
                    'Creative design and testing',
                    'Retargeting strategy',
                    'Performance analysis and optimization'
                  ]
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.2,
                        duration: 0.6
                      }
                    }
                  }}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
