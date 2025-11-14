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
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllPosts } from "@/lib/notion"; // 👈 यह import ज़रूरी है
import { Helmet, HelmetProvider } from "react-helmet-async";

// ✅ Table of contents generator (captures heading text)
const generateTOC = (content: string) => {
  // match lines that start with ## or ### (H2/H3). Keep the original text.
  const headings = Array.from(content.matchAll(/^(##+)\s+(.*)$/gm));
  return headings.map((match) => {
    const level = match[1].length; // 2 => ##, 3 => ###
    const text = match[2].trim();
    // naive slug (used as a first attempt). We'll fallback to searching DOM by text if needed.
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { text, id, level };
  });
};

// helper: split intro (everything before first H2/H3) and body (from first H2/H3 onward)
const splitIntroAndBody = (content: string) => {
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
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<{ text: string; id: string; level: number }[]>(
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ⚠️ START: अपडेटेड useEffect लॉजिक
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    let postMetadata: any = null;

    // --- Step 1: मेटाडेटा (Title, Image, ID) Fetch करें ---
    getAllPosts()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug);

        if (!found) {
          throw new Error("Post not found");
        }

        // मेटाडेटा को सेव करें
        postMetadata = found;

        // 💡 तुरंत Title/Image दिखाने के लिए मेटाडेटा को सेट करें
        setPost(postMetadata);

        // --- Step 2: अब ID का उपयोग करके Content Fetch करें ---
        // (सुनिश्चित करें कि आपने 'notion-post-content.ts' फंक्शन बना ली है)
        return fetch(`/.netlify/functions/notion-post-content?id=${found.id}`);
      })
      .then(async (contentResponse) => {
        if (!contentResponse.ok) {
          const err = await contentResponse.json();
          throw new Error(err.error || "Failed to fetch post content");
        }
        return contentResponse.json();
      })
      .then((contentData: { content: string }) => {
        // --- Step 3: Content को मेटाडेटा के साथ मिलाएं ---

        // 'post' state को नए कंटेंट के साथ अपडेट करें
        setPost((prevPost: any) => ({
          ...prevPost,
          content: contentData.content,
        }));

        // ⚠️ अब Table of Contents (TOC) जनरेट करें
        setToc(generateTOC(contentData.content || ""));
      })
      .catch((err) => {
        console.error("Error during post fetch process:", err);
        setPost(null); // त्रुटि होने पर Error Page दिखाएं
      })
      .finally(() => {
        // 🏁 सब कुछ हो जाने के बाद ही लोडिंग बंद करें
        setLoading(false);
      });
  }, [slug]);
  // ⚠️ END: अपडेटेड useEffect लॉजिक

  if (loading) return <BlogPostSkeleton />;
  if (!post) return <BlogPostError />;

  const currentUrl = window.location.href;
  const { intro, body } = splitIntroAndBody(post.content || "");

  // ==========================================================
  // 🔹 आपका JSX (कोई बदलाव नहीं)
  // ==========================================================
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <HelmetProvider>
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

                {/* Intro paragraph (rendered as markdown) */}
                {intro && (
                  <div className="prose leading-relaxed">
                    
                    {/* ✅ YEH NAYA, FIX KIYA HUA CODE HAI */}
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

                {/* ✅ Render TOC after intro */}
                {toc.length > 0 && (
                  <aside
                    aria-label="Table of contents"
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 mb-10
                      w-full sm:w-[96%] md:w-auto md:max-w-[350px] mx-auto md:mx-0"
                  >
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

                {/* 🔹 Main article markdown (body) */}
                <div
                  className={`
                    prose md:prose-lg
                    text-base md:text-lg
                    prose-headings:font-semibold
                    prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:leading-snug
                    prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-gray-800 prose-p:leading-relaxed
                    prose-a:text-brand-orange hover:prose-a:text-brand-orange-dark
                    prose-strong:text-gray-900
                    prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:rounded-md
                    prose-ul:list-disc prose-ul:pl-6
                    prose-ol:list-decimal prose-ol:pl-6
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-table:border prose-table:border-gray-200 prose-th:bg-gray-50 prose-th:text-gray-800 prose-td:border-t
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

            {/* Sidebar (right) — wrapped correctly so it stays in the right column) */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">About This Article</h3>
                <p className="text-gray-600 mb-4">{post.excerpt || '...'}</p>
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

// ==========================================================
// 🔹 फिक्स: SKELETON COMPONENT
// ==========================================================
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
// 🔹 फिक्स: ERROR COMPONENT
// ==========================================================
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
