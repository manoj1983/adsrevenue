// src/pages/Blog.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPosts } from "@/lib/notion"; // ✅ Hamaara fetcher

// 💡 1. 'useQuery' ko import karein
import { useQuery } from "@tanstack/react-query"; 

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );
  
  // 💡 2. 'useState' aur 'useEffect' ko 'useQuery' se replace karein
  const { 
    data: posts,      // 'posts' ab 'data' se aa raha hai
    isLoading,   // 'loading' ki jagah 'isLoading'
    isError,     // Error state
  } = useQuery({
    queryKey: ['blogPosts'], // 👈 Yeh cache (memory) ka naam hai
    queryFn: getAllPosts,   // 👈 Yeh hamaara data laane waala function hai
  });

  // 💡 3. Search filter ab 'posts' (jo 'data' hai) par kaam karega
  const filteredPosts = (posts || []).filter((post) => {
    const title = (post?.title || "").toString().toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });

  console.log("🟢 Rendered Posts:", filteredPosts);
  console.log("🟢 Total:", filteredPosts.length);

  // ... (Animations and handlers baaki sab waisa hi rahega)
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const postsRef = useRef(null);
  const isPostsInView = useInView(postsRef, { once: true, margin: "-50px 0px" });
  const newsletterRef = useRef(null);
  const isNewsletterInView = useInView(newsletterRef, { once: true });

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Newsletter feature is currently inactive in demo mode.");
    setEmail("");
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* 🔹 Hero Section (No changes) */}
        <div ref={heroRef} className="bg-background py-20 relative overflow-hidden">
          {/* ... (Hero JSX remains the same) */}
        </div>

        {/* 🔹 Blog Posts */}
        <section ref={postsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            
            {/* 💡 4. 'loading' ki jagah 'isLoading' ka istemaal karein */}
            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden h-full">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-1/4 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : isError ? (
              // 💡 5. Agar error aaye toh message dikhayein
              <div className="text-center py-16 text-red-600">
                <h3 className="text-xl font-medium mb-2">Error loading posts</h3>
                <p className="text-gray-500">
                  Could not fetch data from Notion. Please try again later.
                </p>
              </div>
            ) : filteredPosts.length > 0 ? (
              // Show fetched posts
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id || index}
                    // ... (animation props)
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 group h-full">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {/* ... (Image loading JSX) */}
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onLoad={() => handleImageLoad(post.id)}
                            style={{
                              opacity: imagesLoaded[post.id] ? 1 : 0,
                              transition: "opacity 0.5s ease-out",
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        {/* ... (Date, Title) ... */}
                        <div className="text-sm text-gray-500 mb-2">
                          {post.date
                            ? new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 flex-grow">
                          {post.excerpt || '...'}
                        </p>
                        
                        {/* Link (State pass-through ke saath) */}
                        <Link
                          to={`/${post.slug}`}
                          state={{ postId: post.id, excerpt: post.excerpt, title: post.title, date: post.date, image: post.image }}
                          className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark font-medium group"
                        >
                          Read More{" "}
                          <ArrowRight
                            size={16}
                            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              // No posts
              <div className="text-center py-16">
                 <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
                 <p className="text-gray-500">
                   Try changing your search or keyword
                 </p>
              </div>
            )}
          </div>
        </section>

        {/* 🔹 Newsletter Section (No changes) */}
        <section ref={newsletterRef} className="py-16 bg-gray-50">
           {/* ... (Newsletter JSX remains the same) */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
