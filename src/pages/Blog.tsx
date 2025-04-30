
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true });

  const postsRef = useRef(null);
  const isPostsInView = useInView(postsRef, { once: true, margin: "-50px 0px" });

  const newsletterRef = useRef(null);
  const isNewsletterInView = useInView(newsletterRef, { once: true });

  const blogPosts = [
    {
      id: 1,
      title: "10 SEO Strategies to Boost Your Website Ranking",
      excerpt: "Learn the latest on-page and off-page SEO techniques to improve your search engine visibility and drive more organic traffic.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "SEO",
      date: "Apr 15, 2025",
      tags: ["SEO", "On-page SEO", "Technical SEO"],
      slug: "10-seo-strategies-to-boost-your-website-ranking"
    },
    {
      id: 2,
      title: "Maximizing ROI with Google Ads Campaigns",
      excerpt: "Discover how to optimize your Google Ads campaigns to achieve better conversions and reduce cost per acquisition.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Google Ads",
      date: "Apr 12, 2025",
      tags: ["Google Ads", "PPC", "SEM"],
      slug: "maximizing-roi-with-google-ads-campaigns"
    },
    {
      id: 3,
      title: "Building Effective Meta Ads for Higher Engagement",
      excerpt: "Learn the best practices for creating engaging Facebook and Instagram ads that convert visitors into customers.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      category: "Meta Ads",
      date: "Apr 8, 2025",
      tags: ["Meta Ads", "Facebook", "Instagram"],
      slug: "building-effective-meta-ads-for-higher-engagement"
    },
    {
      id: 4,
      title: "Social Media Marketing Strategies for 2025",
      excerpt: "Stay ahead of the competition with these cutting-edge social media marketing tactics that drive engagement and conversions.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
      category: "Social Media",
      date: "Apr 5, 2025",
      tags: ["Social Media", "Marketing", "Strategy"],
      slug: "social-media-marketing-strategies-for-2025"
    },
    {
      id: 5,
      title: "The Power of Content Marketing in Digital Strategy",
      excerpt: "Discover how content marketing can establish your brand as an authority and drive long-term customer engagement.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      category: "Content Marketing",
      date: "Apr 2, 2025",
      tags: ["Content Marketing", "Strategy", "Copywriting"],
      slug: "the-power-of-content-marketing-in-digital-strategy"
    },
    {
      id: 6,
      title: "Email Marketing Campaigns That Convert",
      excerpt: "Learn how to create email marketing campaigns that nurture leads and convert them into loyal customers.",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2",
      category: "Email Marketing",
      date: "Mar 29, 2025",
      tags: ["Email Marketing", "Conversions", "Automation"],
      slug: "email-marketing-campaigns-that-convert"
    },
    {
      id: 7,
      title: "Understanding Google Analytics 4 for Better Insights",
      excerpt: "Master the new Google Analytics 4 platform to gather deeper insights about your website visitors and their behavior.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Analytics",
      date: "Mar 26, 2025",
      tags: ["Google Analytics", "Data", "Insights"],
      slug: "understanding-google-analytics-4-for-better-insights"
    },
    {
      id: 8,
      title: "Local SEO Techniques for Small Businesses",
      excerpt: "Improve your local search presence with these proven local SEO strategies designed for small and medium businesses.",
      image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef",
      category: "Local SEO",
      date: "Mar 23, 2025",
      tags: ["Local SEO", "Small Business", "Google My Business"],
      slug: "local-seo-techniques-for-small-businesses"
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
        <div 
          ref={heroRef}
          className="bg-gradient-to-r from-gray-100 to-gray-50 py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Digital Marketing Blog
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Insights, strategies, and tips to help you navigate the digital marketing landscape and grow your business.
              </motion.p>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Input 
                  type="search" 
                  placeholder="Search articles..." 
                  className="py-6 pl-12 pr-4 bg-white shadow-lg rounded-lg w-full max-w-md"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div 
          ref={categoriesRef}
          className="border-b"
        >
          <div className="container mx-auto px-4 md:px-6 py-6">
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={isCategoriesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.05 * index,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Button 
                    variant={index === 0 ? "default" : "outline"}
                    className={index === 0 ? "bg-brand-orange hover:bg-brand-orange-dark" : ""}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Blog Posts */}
        <section 
          ref={postsRef}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 group h-full">
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                      <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/blog/${post.id}/${post.slug}`} className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark font-medium group">
                        Read More <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination */}
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex rounded-md shadow-sm">
                <Button variant="outline" className="rounded-r-none">Previous</Button>
                <Button variant="outline" className="rounded-none bg-brand-orange text-white border-brand-orange">1</Button>
                <Button variant="outline" className="rounded-none">2</Button>
                <Button variant="outline" className="rounded-none">3</Button>
                <Button variant="outline" className="rounded-l-none">Next</Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section 
          ref={newsletterRef}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Subscribe to Our Newsletter
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Get the latest digital marketing insights and strategies delivered straight to your inbox.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Input placeholder="Enter your email" className="py-6" />
                <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">Subscribe</Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
