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

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch posts from Notion
  useEffect(() => {
    getAllPosts()
      .then((data) => {
        console.log("✅ Notion posts fetched:", data);
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          console.warn("⚠️ No valid posts returned from Notion function");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching Notion posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 💡 Search filter (No changes needed here)
  const filteredPosts = (posts || []).filter((post) => {
    const title = (post?.title || "").toString().toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });

  console.log("🟢 Rendered Posts:", filteredPosts);
  console.log("🟢 Total:", filteredPosts.length);

  // ... (Animations and handlers remain the same)
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
            {loading ? (
              // Loading skeleton (No changes)
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
                        {/* ... (Image loading JSX remains the same) */}
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
                        <div className="text-sm text-gray-500 mb-2">
                          {/* ... (Date JSX remains the same) */}
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
                        
                        {/* 💡 Yahaan badlaav karein */}
                        <p className="text-gray-600 mb-4 flex-grow">
                          {/* ❌ Purana Code:
                          {(post.content || "").slice(0, 150)}...
                          */}
                          
                          {/* ✅ Naya Code: */}
                          {post.excerpt || '...'} {/* Agar excerpt khaali ho toh '...' dikhayein */}
                        </p>
                        
                        <Link
                          to={`/${post.slug}`} // Assuming /post-slug structure
                          // 💡 ID ko state mein pass karein
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
              // No posts (No changes)
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
