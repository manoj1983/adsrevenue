import remarkGfm from "remark-gfm";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SocialShare from "@/components/SocialShare";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getAllPosts } from "@/lib/notion"; // ✅ Notion fetcher

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 // 🔹 Update SEO title and canonical link
  useEffect(() => {
    if (post?.title) {
      // Page Title
      document.title = post.title + " | AdsRevenue Blog";

      // Canonical Tag
      const link = document.querySelector("link[rel='canonical']") || document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", window.location.href);
      document.head.appendChild(link);
    }
  }, [post]);
  // 🔹 Fetch post from Notion
  useEffect(() => {
    if (!slug) return;

    getAllPosts()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug);
        setPost(found);
      })
      .catch((err) => console.error("Error fetching Notion post:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <BlogPostSkeleton />;
  if (!post) return <BlogPostError />;

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* 🔹 Hero Section */}
        <div className="relative aspect-[2.5/1] overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </div>

        {/* 🔹 Content Section */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-gray-600 hover:text-brand-orange mb-6 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blog
                </Link>

                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                    Blog
                  </span>
                  <span className="text-gray-500 text-sm">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>

                <div className="prose max-w-none">
import remarkGfm from "remark-gfm"; // ✨ Add this at the top

...

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]}
  components={{
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
    img: ({ node, ...props }) => (
      <img
        className="rounded-lg shadow-md my-6 w-full object-cover"
        alt={props.alt}
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-4"
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <table className="w-full border-collapse border border-gray-300 my-6" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="border border-gray-300 px-3 py-2" {...props} />
    ),
    code: ({ node, inline, ...props }) =>
      inline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
      ) : (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
          <code {...props} />
        </pre>
      ),
  }}
>
  {post.content}
</ReactMarkdown>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {new Date(post.date).toDateString()}
                    </span>
                  </div>
                  <SocialShare title={post.title} url={currentUrl} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">About This Article</h3>
                <p className="text-gray-600 mb-4">
                  {post.content.slice(0, 160)}...
                </p>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-brand-orange">Blog</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our team of digital marketing experts can help you implement
                  these strategies for your business.
                </p>
                <Button className="w-full bg-brand-orange hover:bg-brand-orange-dark">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// 🔹 Loading skeleton
const BlogPostSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow pt-20">
      <div className="relative aspect-[2.5/1] overflow-hidden bg-gray-300 animate-pulse"></div>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-16 w-full mb-4" />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

// 🔹 Error fallback
const BlogPostError = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow pt-20">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Link>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default BlogPost;
