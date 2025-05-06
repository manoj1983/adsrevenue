
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Navigation } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Call the Supabase Edge Function to submit the form
      const response = await fetch('https://kxvdamaycgeioudmjrli.supabase.co/functions/v1/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Show success message
      toast({
        title: "Success!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset the form
      reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Show error message
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-700 font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-gray-700 font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  className={errors.message ? 'border-red-500' : ''}
                  rows={5}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
