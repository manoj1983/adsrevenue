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
import { getAllPosts } from "@/lib/notion"; 
import { useQuery } from "@tanstack/react-query"; 

const Blog = () => {
  // ... (saara code waisa hi rahega) ...
  // useEffect, useState, useQuery, filteredPosts, handlers...

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* ... (Hero Section) ... */}
        <section ref={postsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {isLoading ? (
              // ... (Skeleton) ...
            ) : isError ? (
              // ... (Error) ...
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id || index}
                    // ... (animation props)
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 group h-full">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {/* ... (Image loading shimmer) ... */}

                        {post.image ? (
                          <img
                            // 💡 YEH RAHA BADLAAV
                            src={`/.netlify/images?url=${encodeURIComponent(
                              post.image
                            )}&w=600&fm=webp&q=80`}
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
                          // ... (No Image div) ...
                        )}
                      </div>

                      <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        {/* ... (Date, Title, Excerpt, Link - sab waisa hi) ... */}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              // ... (No posts) ...
            )}
          </div>
        </section>
        {/* ... (Newsletter Section) ... */}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
