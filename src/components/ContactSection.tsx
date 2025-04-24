
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Navigation } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission
    console.log('Form submitted');
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start optimizing your ad revenue? Reach out to our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-700 font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-gray-700 font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
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
                    <p className="text-gray-600">+91 9555442836</p>
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
