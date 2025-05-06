
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import SocialShare from '@/components/SocialShare';
import { useBlogPost } from '@/hooks/useBlogPost';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return <BlogPostError />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative aspect-[2.5/1] overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
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

        {/* Content Section */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-brand-orange mb-6 transition-colors">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blog
                </Link>

                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="prose max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {post.content}
                  </ReactMarkdown>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                      <span key={tag.id} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <SocialShare title={post.title} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">About This Article</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">
                      {new Date(post.published_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-brand-orange">{post.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our team of digital marketing experts can help you implement these strategies for your business.
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

const BlogPostSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow pt-20">
      {/* Hero Skeleton */}
      <div className="relative aspect-[2.5/1] overflow-hidden bg-gray-300 animate-pulse"></div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-1 w-full my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

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
