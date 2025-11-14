import React, { useEffect, useState } from "react";
// 💡 1. 'useLocation' ko import karein
import { useParams, Link, useLocation } from "react-router-dom";
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
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllPosts } from "@/lib/notion"; // 👈 यह import ज़रूरी है
import { Helmet, HelmetProvider } from "react-helmet-async";

// ✅ Table of contents generator (captures heading text)
const generateTOC = (content: string) => {
  // ... (Aapka code - koi badlaav nahi)
  const headings = Array.from(content.matchAll(/^(##+)\s+(.*)$/gm));
  return headings.map((match) => {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { text, id, level };
  });
};

// helper: split intro (everything before first H2/H3) and body
const splitIntroAndBody = (content: string) => {
  // ... (Aapka code - koi badlaav nahi)
  const match = content.search(/^(##+)\s+/m);
  if (match === -1) {
    return { intro: content, body: "" };
  }
  const intro = content.slice(0, match).trim();
  const body = content.slice(match).trim();
  return { intro, body };
};

// ==========================================================
// 🔹 कंपोनेंट लॉजिक
// ==========================================================
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  // 💡 2. 'useLocation' ko call karein
  const location = useLocation();

  // 💡 3. State ko location state se seedha set karein (taaki title turant dikhe)
  const [post, setPost] = useState<any | null>(location.state || null);
  const [loading, setLoading] = useState(true); // Content ke liye loading true rakhein
  const [toc, setToc] = useState<{ text: string; id: string; level: number }[]>(
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 💡 4. START: Poora useEffect logic update karein
  useEffect(() => {
    if (!slug) return;

    // Helper function jo content fetch karegi
    const fetchFullPost = async (postId: string, metadata: any) => {
      // Pehle se metadata set karein (taaki title, image dikhe)
      if (metadata) {
        setPost(metadata);
      }
      
      try {
        // --- Step 2: Content Fetch karein ---
        const contentResponse = await fetch(
          `/.netlify/functions/notion-post-content?id=${postId}`
        );
        if (!contentResponse.ok) {
          const err = await contentResponse.json();
          throw new Error(err.error || "Failed to fetch post content");
        }
        const contentData = await contentResponse.json();

        // --- Step 3: Content ko milayein ---
        setPost((prevPost: any) => ({
          ...(prevPost || metadata), // Purana metadata + naya content
          content: contentData.content,
        }));

        setToc(generateTOC(contentData.content || ""));
      } catch (err) {
        console.error("Error during post content fetch:", err);
        setPost(null); // Error hone par post ko null karein
      } finally {
        setLoading(false); // Content aane ke baad hi loading band karein
      }
    };

    // --- NAYA ROUTING LOGIC ---
    if (location.state?.postId) {
      // --- FAST PATH ---
      // Agar user ne list page se click kiya hai
      console.log("Fast Path: Using ID from location state");
      fetchFullPost(location.state.postId, location.state);
    } else {
      // --- SLOW PATH ---
      // Agar user ne seedha URL type kiya hai (e.g., /my-post-slug)
      console.log("Slow Path: No location state, calling getAllPosts()");
      setLoading(true); // Yahaan loading ko dobara true karein
      getAllPosts()
        .then((posts) => {
          const found = posts.find((p) => p.slug === slug);
          if (found) {
            // ID milne ke baad content fetch karein
            fetchFullPost(found.id, found);
          } else {
            throw new Error("Post not found");
          }
        })
        .catch((err) => {
          console.error("Error during slow path fetch:", err);
          setPost(null);
          setLoading(false);
        });
    }
  }, [slug, location.state]); // 💡 5. 'location.state' ko dependency mein add karein
  // ⚠️ END: अपडेटेड useEffect लॉजिक

  if (loading) return <BlogPostSkeleton />;
  if (!post) return <BlogPostError />;

  const currentUrl = window.location.href;
  const { intro, body } = splitIntroAndBody(post.content || "");

  // ==========================================================
  // 🔹 JSX (Koi Badlaav Nahi)
  // ==========================================================
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <HelmetProvider>
          {/* ... (Aapka Helmet code - koi badlaav nahi) ... */}
           <Helmet>
             <title>{post.title} | AdsRevenue Blog</title>
             <meta name="description" content={(post.content || "").slice(0, 160)} />
             <meta
               name="keywords"
               content={`${post.title}, Digital Marketing, SEO, Blogging`}
             />
             <meta property="og:title" content={post.title} />
             <meta
               property="og:description"
               content={(post.content || "").slice(0, 160)}
             />
             <meta property="og:image" content={post.image || "/og-image.png"} />
             <meta property="og:type" content="article" />
             <meta name="robots" content="index, follow" />
           </Helmet>
        </HelmetProvider>

        {/* 🔹 Hero Section */}
        <div className="relative aspect-[2.5/1] overflow-hidden">
          {/* ... (Aapka Hero code - koi badlaav nahi) ... */}
          {post.image ? (
            <img
              loading="lazy"
              decoding="async"
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            {/* Main Content (left) */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                {/* ... (Back to Blog, Date, etc - koi badlaav nahi) ... */}
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

                {/* Intro paragraph (Aapka link fix yahaan pehle se hai) */}
                {intro && (
                  <div className="prose leading-relaxed">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange hover:underline"
                          />
                        ),
                      }}
                    >
                      {intro}
                    </ReactMarkdown>
                  </div>
                )}

                {/* TOC (koi badlaav nahi) */}
                {toc.length > 0 && (
                  <aside
                    aria-label="Table of contents"
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 mb-10
                      w-full sm:w-[96%] md:w-auto md:max-w-[350px] mx-auto md:mx-0"
                  >
                   {/* ... (Aapka TOC code - koi badlaav nahi) ... */}
                   <h3
                      className="text-base font-bold mb-3 text-gray-800 tracking-wide border-b border-gray-200 pb-2
                            line-clamp-2 overflow-hidden break-words"
                      title="Table of Contents"
                    >
                      📖 Table of Contents
                    </h3>
                    <ul className="divide-y divide-gray-100 text-gray-700 text-sm leading-relaxed">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          className={`py-2 transition-all duration-150 ${
                            item.level > 2 ? "pl-5 text-gray-600" : ""
                          }`}
                        >
                          <button
                            onClick={() => handleScroll(item.id, item.text)}
                            title={item.text}
                            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange rounded-sm
                                  hover:text-brand-orange hover:pl-1 transition-all duration-150"
                            aria-label={`Go to ${item.text}`}
                          >
                            <span className="inline-block align-middle break-words">
                              {item.text}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {/* Main article markdown (Aapka link fix yahaan pehle se hai) */}
                <div
                  className={`
                    prose md:prose-lg
                    ... (Aapki saari prose styling)
                    max-w-none text-gray-900
                  `}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      rehypeRaw,
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "append",
                          properties: { className: ["anchor"] },
                        },
                      ],
                    ]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-orange hover:underline"
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <img
                          className="rounded-lg shadow-md my-6 w-full object-cover opacity-0 transition-opacity duration-700"
                          loading="lazy"
                          onLoad={(e) =>
                            e.currentTarget.classList.remove("opacity-0")
                          }
                          alt={props.alt}
                          {...props}
                        />
                      ),
                    }}
                  >
                    {body || post.content}
                  </ReactMarkdown>
                </div>

                {/* ... (Separator, SocialShare - koi badlaav nahi) ... */}
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

            {/* Sidebar (Aapka excerpt fix yahaan pehle se hai) */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">About This Article</h3>
                <p className="text-gray-600 mb-4">{post.excerpt || '...'}</p>
                <Separator className="my-4" />
                {/* ... (Published, Category - koi badlaav nahi) ... */}
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

              {/* ... (Need Help? - koi badlaav nahi) ... */}
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

// ==========================================================
// 🔹 SKELETON COMPONENT (Koi Badlaav Nahi)
// ==========================================================
const BlogPostSkeleton = () => (
  // ... (Aapka code - koi badlaav nahi)
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
              <Skeleton className="h-6 w-3/C4 mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-16 w-full mb-4" />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

// ==========================================================
// 🔹 ERROR COMPONENT (Koi Badlaav Nahi)
// ==========================================================
const BlogPostError = () => (
  // ... (Aapka code - koi badlaav nahi)
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
