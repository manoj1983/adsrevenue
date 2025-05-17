
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

// Define form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(3, { message: 'Subject is required' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<{
    database: boolean | null;
    sheet: boolean | null;
  }>({
    database: null,
    sheet: null
  });

  // Initialize react-hook-form with zod resolver
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmissionStatus({ database: null, sheet: null });
    
    try {
      console.log("Submitting form data:", data);
      
      // Call the Supabase Edge Function to submit the form
      const response = await fetch('https://kxvdamaycgeioudmjrli.supabase.co/functions/v1/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      console.log("Received response:", result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Update submission status
      setSubmissionStatus({
        database: true,
        sheet: result.sheetUpdated
      });
      
      // Show success message
      if (result.sheetUpdated) {
        toast({
          title: "Success!",
          description: "Thank you for your message. We've saved it in our database and added it to our spreadsheet.",
        });
      } else {
        toast({
          title: "Partial Success",
          description: "Your message was saved in our database, but we couldn't add it to our spreadsheet. We'll process it manually later.",
          variant: "default",
        });
      }
      
      // Reset the form
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Update submission status
      setSubmissionStatus({
        database: false,
        sheet: false
      });
      
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
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Sending...
              </span>
            ) : 'Send Message'}
          </Button>
          
          {submissionStatus.sheet === false && submissionStatus.database === true && (
            <p className="text-orange-500 text-sm mt-2">
              Your message was saved to our database but couldn't be added to our spreadsheet. 
              We'll process it manually.
            </p>
          )}
          
          {submissionStatus.database === false && (
            <p className="text-red-500 text-sm mt-2">
              Failed to save your message. Please try again.
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
