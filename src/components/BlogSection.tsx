
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 SEO Strategies to Boost Your Website Ranking",
      excerpt: "Learn the latest on-page and off-page SEO techniques to improve your search engine visibility and drive more organic traffic.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "SEO",
      date: "Apr 15, 2025",
      slug: "10-seo-strategies-to-boost-your-website-ranking"
    },
    {
      id: 2,
      title: "Maximizing ROI with Google Ads Campaigns",
      excerpt: "Discover how to optimize your Google Ads campaigns to achieve better conversions and reduce cost per acquisition.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Google Ads",
      date: "Apr 12, 2025",
      slug: "maximizing-roi-with-google-ads-campaigns"
    },
    {
      id: 3,
      title: "Building Effective Meta Ads for Higher Engagement",
      excerpt: "Learn the best practices for creating engaging Facebook and Instagram ads that convert visitors into customers.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      category: "Meta Ads",
      date: "Apr 8, 2025",
      slug: "building-effective-meta-ads-for-higher-engagement"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Latest Insights</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay up-to-date with the latest trends and strategies in digital marketing to stay ahead of your competition.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id} 
              variants={staggerItem}
              custom={index}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 h-full group card-hover dark:border-gray-700">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors duration-300 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.id}/${post.slug}`} 
                    className="inline-block"
                  >
                    <Button 
                      className="bg-brand-orange hover:bg-brand-orange-dark text-white transition-all duration-300 group"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-300 hover:border-brand-orange dark:hover:border-brand-orange group">
            View All Articles <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
