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

// ... (आपका generateTOC और splitIntroAndBody हेल्पर फ़ंक्शंस यहाँ रहेंगे)
// ✅ Table of contents generator (captures heading text)
const generateTOC = (content: string) => {
  // ... (आपका कोड - कोई बदलाव नहीं)
};

// helper: split intro (everything before first H2/H3) and body (from first H2/H3 onward)
const splitIntroAndBody = (content: string) => {
  // ... (आपका कोड - कोई बदलाव नहीं)
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
          {/* ... (आपका Helmet कोड) */}
        </HelmetProvider>

        {/* 🔹 Hero Section */}
        {/* ... (आपका Hero JSX) */}

        {/* 🔹 Content Section */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content (left) */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                {/* ... (Back to Blog, Date, Intro, TOC, Markdown, Separator, SocialShare... सब कुछ वैसा ही रहेगा) */}

                {/* 🔹 Main article markdown (body) */}
                <div
                  className={`
                    prose md:prose-lg
                    text-base md:text-lg
                    // ... (आपकी सारी prose स्टाइलिंग)
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
                        <a {...props} className="text-brand-orange hover:underline" />
                      ),
                      // ... (आपका img component)
                    }}
                  >
                    {/* 💡 यह अब सही से काम करेगा */}
                    {body || post.content} 
                  </ReactMarkdown>
                </div>

                {/* ... (Separator और SocialShare) */}
              </div>
            </div>

            {/* Sidebar (right) */}
            {/* ... (आपका Sidebar JSX) */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// ... (आपके BlogPostSkeleton और BlogPostError कंपोनेंट - कोई बदलाव नहीं)
// 🔹 Loading skeleton (unchanged)
const BlogPostSkeleton = () => (
  // ... (आपका कोड)
);

// 🔹 Error fallback (unchanged)
const BlogPostError = () => (
  // ... (आपका कोड)
);


export default BlogPost;
