
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              This Privacy Policy explains how Ads Revenue collects, uses, and protects your personal information.
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, such as when you create an account, 
                  fill out a form, or communicate with us. This information may include your name, email address, 
                  phone number, company name, and any other information you choose to provide.
                </p>
                
                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the information we collect for various purposes, including:
                </p>
                <ul>
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Sending you technical notices, updates, security alerts, and administrative messages</li>
                  <li>Communicating with you about products, services, offers, and events</li>
                  <li>Monitoring and analyzing trends, usage, and activities</li>
                </ul>
                
                <h2>3. Information Sharing</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li>Vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                  <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
                  <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
                </ul>
                
                <h2>4. Data Security</h2>
                <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                </p>
                
                <h2>5. Cookies</h2>
                <p>
                  We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our website.
                </p>
                
                <h2>6. Your Choices</h2>
                <p>
                  You may update, correct, or delete information about you at any time by emailing us at support@adsrevenue.net.
                </p>
                
                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p>
                  Email: support@adsrevenue.net<br />
                  Phone: +91 9555442836
                </p>
                
                <h2>8. Changes to Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                
                <p className="text-sm text-gray-500 mt-8">
                  Last updated: April 24, 2025
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

export default PrivacyPolicy;
