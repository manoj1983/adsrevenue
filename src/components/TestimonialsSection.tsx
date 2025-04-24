
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Ads Revenue has transformed our monetization strategy completely. We've seen a 40% increase in ad revenue within just 3 months of working with them.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechBlog Inc."
    },
    {
      content: "The team at Ads Revenue provided exceptional guidance and support throughout our partnership. They truly understand the digital advertising landscape.",
      author: "Michael Chen",
      role: "CEO, Digital Publishers Network"
    },
    {
      content: "Working with Ads Revenue has been a game-changer for our business. Their optimization techniques helped us increase our CPM rates significantly.",
      author: "David Williams",
      role: "Publisher, Online Media Group"
    },
    {
      content: "I can't recommend Ads Revenue enough. Their insights and strategies have helped us achieve record-breaking revenue numbers quarter after quarter.",
      author: "Amanda Rodriguez",
      role: "COO, WebContent Solutions"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients about their experiences working with us.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="border border-gray-200 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {[...Array(5)].map((_, starIndex) => (
                        <span key={starIndex} className="text-yellow-400 text-xl mr-1">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
