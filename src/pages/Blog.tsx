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
import { getAllPosts } from "@/lib/notion"; // ✅ Our Notion fetcher

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

  // 🔹 Filter by search term (safe version)
  const filteredPosts = (posts || []).filter((post) => {
    const title = (post?.title || "").toString().toLowerCase();
    const content = (post?.content || "").toString().toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search) || content.includes(search);
  });

  console.log("🟢 Rendered Posts:", filteredPosts);
  console.log("🟢 Total:", filteredPosts.length);

  // 🔹 Animations
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
        {/* 🔹 Hero Section */}
        <div ref={heroRef} className="bg-background py-20 relative overflow-hidden">
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
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Digital Marketing Blog
            </motion.h1>
            <motion.p
              className="text-lg text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Insights, strategies, and tips to help you navigate the digital
              marketing landscape and grow your business.
            </motion.p>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Input
                type="search"
                placeholder="Search articles..."
                className="py-6 pl-12 pr-4 bg-white shadow-lg rounded-lg w-full max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </motion.div>
          </div>
        </div>

        {/* 🔹 Blog Posts */}
        <section ref={postsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
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
            ) : filteredPosts.length > 0 ? (
              // Show fetched posts
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: Math.min(0.03 * index, 0.25),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 group h-full">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <div
                          className="absolute inset-0 bg-gray-200 loading-shimmer"
                          style={{
                            opacity: imagesLoaded[post.id] ? 0 : 1,
                            transition: "opacity 0.3s ease-out",
                          }}
                        />
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
    )}
  </div>
                      <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
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
                        <p className="text-gray-600 mb-4 flex-grow">
                          {post.content.slice(0, 150)}...
                        </p>
                        <Link
                          to={`/${post.slug.replace(/\s+/g, "-").toLowerCase()}`}
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

        {/* 🔹 Newsletter Section */}
        <section ref={newsletterRef} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl font-bold mb-4 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
              >
                Subscribe to Our Newsletter
              </motion.h2>
              <motion.form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isNewsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Input
                  placeholder="Enter your email"
                  className="py-6"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white"
                  type="submit"
                >
                  Subscribe
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
