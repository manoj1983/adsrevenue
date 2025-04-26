
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-[fade-in_0.6s_ease-out_0.3s_forwards]">Contact Us</h1>
            <p className="text-lg text-gray-600 opacity-0 animate-[fade-in_0.6s_ease-out_0.4s_forwards]">
              We'd love to hear from you. Reach out to our team with any questions or inquiries.
            </p>
          </div>
        </div>
        
        <div className="opacity-0 animate-[fade-in_0.6s_ease-out_0.5s_forwards]">
          <ContactSection />
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 animate-fade-in [animation-delay:500ms]">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our services and how we can help you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:600ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">How quickly can I expect to see results?</h3>
                <p className="text-gray-600 relative z-10">
                  While some improvements can be seen within days, significant revenue increases typically become apparent within 4-6 weeks as our optimization strategies take full effect.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:700ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">What services do you offer?</h3>
                <p className="text-gray-600 relative z-10">
                  We offer comprehensive digital marketing services including SEO (On-page, Off-page, Technical, Local), Google Ads, Meta Ads, Social Media Marketing, Content Marketing, Email Marketing, and Analytics Setup.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:800ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">Do you provide reports and analytics?</h3>
                <p className="text-gray-600 relative z-10">
                  Yes, we provide detailed monthly reports with comprehensive analytics and insights about your campaigns' performance and ROI.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:900ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">What makes your service different?</h3>
                <p className="text-gray-600 relative z-10">
                  Our approach combines cutting-edge technology with personalized strategies, ensuring maximum ROI for each client's unique needs and goals.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:1000ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">How do you measure success?</h3>
                <p className="text-gray-600 relative z-10">
                  We track key performance indicators tailored to your specific goals, whether it's increased visibility, higher traffic, improved conversion rates, or enhanced revenue generation.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:1100ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">What is your pricing structure?</h3>
                <p className="text-gray-600 relative z-10">
                  We offer flexible pricing plans customized to your business size and needs. We believe in transparent pricing with no hidden fees or long-term contracts unless specified.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:1200ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">How long have you been in business?</h3>
                <p className="text-gray-600 relative z-10">
                  Ads Revenue was founded in 2025 and has been helping businesses optimize their advertising strategies and maximize their revenue ever since.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:1300ms] relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">Do you work with businesses of all sizes?</h3>
                <p className="text-gray-600 relative z-10">
                  Yes, we work with businesses of all sizes, from small local businesses to large enterprises. Our strategies are tailored to meet the specific needs and goals of each client.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
