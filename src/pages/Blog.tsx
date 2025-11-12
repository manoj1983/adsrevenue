import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/notion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        console.log("✅ Raw Notion Data:", data);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("❌ Unexpected Notion response format:", data);
        }
      })
      .catch((err) => console.error("❌ Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div
              key={post.id || i}
              className="border rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition-all duration-300"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
              )}

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.content.slice(0, 140)}...
              </p>

              <Link
                to={`/${post.slug.replace(/\s+/g, "-").toLowerCase()}`}
                className="inline-flex items-center text-brand-orange font-medium hover:text-brand-orange-dark"
              >
                Read More <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
