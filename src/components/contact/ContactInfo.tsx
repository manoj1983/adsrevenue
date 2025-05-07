
import React from 'react';
import { Mail, Phone, Navigation } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
        <p className="text-gray-600 mb-8">
          Feel free to reach out to us using any of the contact methods below. Our team is available to answer your questions and provide the support you need.
        </p>

        <div className="space-y-6">
          <div className="flex items-start">
            <Phone className="text-brand-orange mr-4 mt-1" size={24} />
            <div>
              <h4 className="font-bold">Phone Number</h4>
              <a href="tel:+919555442836" className="text-gray-600 hover:text-brand-orange">+91 9555442836</a>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="text-brand-orange mr-4 mt-1" size={24} />
            <div>
              <h4 className="font-bold">Email Address</h4>
              <a href="mailto:support@adsrevenue.net" className="text-gray-600 hover:text-brand-orange">
                support@adsrevenue.net
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <Navigation className="text-brand-orange mr-4 mt-1" size={24} />
            <div>
              <h4 className="font-bold">Office Location</h4>
              <p className="text-gray-600">
                123 Ad Revenue Street<br />
                New Delhi, India
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-brand-orange rounded-lg text-white">
        <h4 className="font-bold text-xl mb-2">Business Hours</h4>
        <div className="space-y-2">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
