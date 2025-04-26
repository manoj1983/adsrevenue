
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "10 SEO Strategies to Boost Your Website Ranking",
      excerpt: "Learn the latest on-page and off-page SEO techniques to improve your search engine visibility and drive more organic traffic.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "SEO",
      date: "Apr 15, 2025",
      tags: ["SEO", "On-page SEO", "Technical SEO"]
    },
    {
      id: 2,
      title: "Maximizing ROI with Google Ads Campaigns",
      excerpt: "Discover how to optimize your Google Ads campaigns to achieve better conversions and reduce cost per acquisition.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Google Ads",
      date: "Apr 12, 2025",
      tags: ["Google Ads", "PPC", "SEM"]
    },
    {
      id: 3,
      title: "Building Effective Meta Ads for Higher Engagement",
      excerpt: "Learn the best practices for creating engaging Facebook and Instagram ads that convert visitors into customers.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      category: "Meta Ads",
      date: "Apr 8, 2025",
      tags: ["Meta Ads", "Facebook", "Instagram"]
    },
    {
      id: 4,
      title: "Social Media Marketing Strategies for 2025",
      excerpt: "Stay ahead of the competition with these cutting-edge social media marketing tactics that drive engagement and conversions.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
      category: "Social Media",
      date: "Apr 5, 2025",
      tags: ["Social Media", "Marketing", "Strategy"]
    },
    {
      id: 5,
      title: "The Power of Content Marketing in Digital Strategy",
      excerpt: "Discover how content marketing can establish your brand as an authority and drive long-term customer engagement.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      category: "Content Marketing",
      date: "Apr 2, 2025",
      tags: ["Content Marketing", "Strategy", "Copywriting"]
    },
    {
      id: 6,
      title: "Email Marketing Campaigns That Convert",
      excerpt: "Learn how to create email marketing campaigns that nurture leads and convert them into loyal customers.",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2",
      category: "Email Marketing",
      date: "Mar 29, 2025",
      tags: ["Email Marketing", "Conversions", "Automation"]
    },
    {
      id: 7,
      title: "Understanding Google Analytics 4 for Better Insights",
      excerpt: "Master the new Google Analytics 4 platform to gather deeper insights about your website visitors and their behavior.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Analytics",
      date: "Mar 26, 2025",
      tags: ["Google Analytics", "Data", "Insights"]
    },
    {
      id: 8,
      title: "Local SEO Techniques for Small Businesses",
      excerpt: "Improve your local search presence with these proven local SEO strategies designed for small and medium businesses.",
      image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef",
      category: "Local SEO",
      date: "Mar 23, 2025",
      tags: ["Local SEO", "Small Business", "Google My Business"]
    },
  ];

  const categories = [
    "All Categories", "SEO", "Google Ads", "Meta Ads", "Social Media", 
    "Content Marketing", "Email Marketing", "Analytics", "Local SEO"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 py-16 relative overflow-hidden opacity-0 animate-[fade-in_0.6s_ease-out_0.3s_forwards]">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-[fade-in_0.6s_ease-out_0.4s_forwards]">
                Digital Marketing Blog
              </h1>
              <p className="text-lg text-gray-600 mb-8 opacity-0 animate-[fade-in_0.6s_ease-out_0.5s_forwards]">
                Insights, strategies, and tips to help you navigate the digital marketing landscape and grow your business.
              </p>
              <div className="relative opacity-0 animate-[fade-in_0.6s_ease-out_0.6s_forwards]">
                <Input 
                  type="search" 
                  placeholder="Search articles..." 
                  className="py-6 pl-12 pr-4 bg-white shadow-lg rounded-lg w-full max-w-md"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="border-b opacity-0 animate-[fade-in_0.6s_ease-out_0.7s_forwards]">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button 
                  key={category} 
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-brand-orange hover:bg-brand-orange-dark" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group opacity-0"
                  style={{ animationDelay: `${900 + (index * 100)}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark font-medium">
                      Read More <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12 opacity-0 animate-[fade-in_0.6s_ease-out_1.8s_forwards]">
              <div className="inline-flex rounded-md shadow-sm">
                <Button variant="outline" className="rounded-r-none">Previous</Button>
                <Button variant="outline" className="rounded-none bg-brand-orange text-white border-brand-orange">1</Button>
                <Button variant="outline" className="rounded-none">2</Button>
                <Button variant="outline" className="rounded-none">3</Button>
                <Button variant="outline" className="rounded-l-none">Next</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-gray-50 opacity-0 animate-[fade-in_0.6s_ease-out_1.9s_forwards]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-8">
                Get the latest digital marketing insights and strategies delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="py-6" />
                <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
