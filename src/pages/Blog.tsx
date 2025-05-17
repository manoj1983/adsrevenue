import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useCategories } from '@/hooks/useCategories';
import { useSubscribeToNewsletter } from '@/hooks/useSubscribeToNewsletter';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Fetch data from Supabase
  const { data: blogPosts = [], isLoading: isLoadingPosts } = useBlogPosts(selectedCategory);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { subscribeToNewsletter, isLoading: isSubscribing } = useSubscribeToNewsletter();

  // Filter posts by search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation refs
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true });

  const postsRef = useRef(null);
  const isPostsInView = useInView(postsRef, { once: true, margin: "-50px 0px" });

  const newsletterRef = useRef(null);
  const isNewsletterInView = useInView(newsletterRef, { once: true });

  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (await subscribeToNewsletter(email)) {
      setEmail(""); // Clear the email input on success
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section - Updated to use the same background as other pages */}
        <div 
          ref={heroRef}
          className="bg-background py-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover opacity-20"
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Digital Marketing Blog
            </motion.h1>
            <motion.p 
              className="text-lg text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Insights, strategies, and tips to help you navigate the digital marketing landscape and grow your business.
            </motion.p>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Input 
                type="search" 
                placeholder="Search articles..." 
                className="py-6 pl-12 pr-4 bg-white shadow-lg rounded-lg w-full max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </motion.div>
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
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {isLoadingCategories ? (
                // Loading state for categories
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-24 h-10 rounded-md" />
                ))
              ) : (
                // Render categories
                categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.4,
                      delay: 0.03 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Button 
                      variant={category === selectedCategory ? "default" : "outline"}
                      className={category === selectedCategory ? "bg-brand-orange hover:bg-brand-orange-dark" : ""}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Blog Posts */}
        <section 
          ref={postsRef}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            {isLoadingPosts ? (
              // Loading state for blog posts
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden h-full">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-1/4 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Skeleton className="h-6 w-16 rounded" />
                        <Skeleton className="h-6 w-20 rounded" />
                        <Skeleton className="h-6 w-14 rounded" />
                      </div>
                      <Skeleton className="h-6 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              // Render blog posts
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(0.03 * index, 0.25),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 group h-full">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {/* Show skeleton while image loads */}
                        <div className="absolute inset-0 bg-gray-200 loading-shimmer" 
                             style={{ opacity: imagesLoaded[post.id] ? 0 : 1, transition: "opacity 0.3s ease-out" }}>
                        </div>
                        <img 
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onLoad={() => handleImageLoad(post.id)}
                          style={{ 
                            opacity: imagesLoaded[post.id] ? 1 : 0, 
                            transition: "opacity 0.5s ease-out"
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        <div className="text-sm text-gray-500 mb-2">
                          {new Date(post.published_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags && post.tags.slice(0, 3).map((tag) => (
                            <span key={tag.id} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {tag.name}
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
            ) : (
              // No posts found
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
                <p className="text-gray-500">Try changing your search or category filter</p>
              </div>
            )}
            
            {/* Pagination - only show if we have enough posts */}
            {filteredPosts.length > 6 && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex rounded-md shadow-sm">
                  <Button variant="outline" className="rounded-r-none">Previous</Button>
                  <Button variant="outline" className="rounded-none bg-brand-orange text-white border-brand-orange">1</Button>
                  <Button variant="outline" className="rounded-none">2</Button>
                  <Button variant="outline" className="rounded-none">3</Button>
                  <Button variant="outline" className="rounded-l-none">Next</Button>
                </div>
              </motion.div>
            )}
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
                className="text-3xl font-bold mb-4 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Subscribe to Our Newsletter
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                Get the latest digital marketing insights and strategies delivered straight to your inbox.
              </motion.p>
              <motion.form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Input 
                  placeholder="Enter your email" 
                  className="py-6" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <Button 
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white"
                  type="submit"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
