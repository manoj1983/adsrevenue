
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, MessageSquare, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/CTASection';

const blogPosts = {
  "1": {
    id: 1,
    title: "10 SEO Strategies to Boost Your Website Ranking",
    excerpt: "Learn the latest on-page and off-page SEO techniques to improve your search engine visibility and drive more organic traffic.",
    content: `
      <p class="text-lg mb-4">Search Engine Optimization (SEO) continues to be one of the most critical aspects of digital marketing. With search algorithms constantly evolving, staying updated with the latest SEO strategies is essential for maintaining and improving your website's visibility.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Focus on Core Web Vitals</h2>
      <p class="mb-4">Google's Core Web Vitals have become crucial ranking factors. These metrics measure user experience in terms of loading performance, interactivity, and visual stability.</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Optimize Largest Contentful Paint (LCP) to under 2.5 seconds</li>
        <li>Improve First Input Delay (FID) to less than 100 milliseconds</li>
        <li>Ensure Cumulative Layout Shift (CLS) is less than 0.1</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Create Comprehensive, High-Quality Content</h2>
      <p class="mb-4">Content remains king in the SEO world. Focus on creating in-depth, valuable content that thoroughly addresses user search intent.</p>
      <p class="mb-4">Instead of producing numerous short articles, invest in comprehensive resources that cover topics extensively. These content pieces are more likely to rank well and establish your site as an authority.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Optimize for Voice Search</h2>
      <p class="mb-4">With the rising popularity of virtual assistants and smart speakers, optimizing for voice search has become increasingly important.</p>
      <p class="mb-4">Voice searches typically use natural language patterns and questions. Incorporate conversational keywords and FAQ sections to capture this traffic.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Build a Strong Backlink Profile</h2>
      <p class="mb-4">Quality backlinks remain one of the strongest ranking factors. Focus on earning links from reputable sites within your industry.</p>
      <p class="mb-4">Strategies for building quality backlinks include:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Creating link-worthy content such as original research or comprehensive guides</li>
        <li>Guest posting on industry-leading websites</li>
        <li>Building relationships with influencers and thought leaders</li>
        <li>Reclaiming unlinked mentions of your brand</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Technical SEO Optimization</h2>
      <p class="mb-4">Technical SEO forms the foundation of your website's search performance. Ensure your site has:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>A responsive design that works seamlessly across all devices</li>
        <li>Proper URL structure that's clean and descriptive</li>
        <li>XML sitemap and robots.txt files that guide search engines</li>
        <li>Implemented schema markup to enhance rich snippets</li>
        <li>Fixed crawl errors and broken links</li>
      </ul>

      <p class="text-lg mt-8">By implementing these strategies consistently, you can significantly improve your website's visibility in search results and drive more organic traffic to your business.</p>
    `,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "SEO",
    date: "Apr 15, 2025",
    author: "Jane Cooper",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    tags: ["SEO", "On-page SEO", "Technical SEO"],
    relatedPosts: [2, 8, 5]
  },
  "2": {
    id: 2,
    title: "Maximizing ROI with Google Ads Campaigns",
    excerpt: "Discover how to optimize your Google Ads campaigns to achieve better conversions and reduce cost per acquisition.",
    content: `
      <p class="text-lg mb-4">Google Ads remains one of the most powerful advertising platforms, allowing businesses to reach potential customers at the exact moment they're searching for relevant products or services. However, achieving a positive return on investment (ROI) requires strategic optimization.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Structure Your Campaigns Effectively</h2>
      <p class="mb-4">A well-structured Google Ads account is fundamental to success. Organize your campaigns by product categories, services, or business goals. Within each campaign, create tightly-themed ad groups with closely related keywords.</p>
      <p class="mb-4">This structure allows for more relevant ad copy and landing pages, improving quality scores and reducing costs.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Implement Strategic Keyword Targeting</h2>
      <p class="mb-4">The foundation of any successful Google Ads campaign is strategic keyword selection. Focus on:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Long-tail keywords with clear purchase intent</li>
        <li>Negative keywords to filter out irrelevant traffic</li>
        <li>Regular search term analysis to discover new opportunities</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Craft Compelling Ad Copy</h2>
      <p class="mb-4">Your ad copy should speak directly to the user's intent while highlighting your unique selling propositions. Include:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Keywords in headlines and descriptions</li>
        <li>Clear calls to action</li>
        <li>Specific benefits or offers</li>
        <li>Trust signals like reviews or guarantees</li>
      </ul>
      <p class="mb-4">Always test multiple ad variations to identify top performers.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Create Dedicated Landing Pages</h2>
      <p class="mb-4">The post-click experience is crucial for conversion. Design landing pages that:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Match the ad's message and keywords</li>
        <li>Have a clean, distraction-free design</li>
        <li>Include a prominent call to action</li>
        <li>Load quickly on all devices</li>
        <li>Address potential objections</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Leverage Automation and Smart Bidding</h2>
      <p class="mb-4">Google's machine learning capabilities have advanced significantly. Consider using smart bidding strategies like:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Target ROAS (Return on Ad Spend)</li>
        <li>Target CPA (Cost Per Acquisition)</li>
        <li>Maximize Conversions</li>
      </ul>
      <p class="mb-4">These automated strategies can optimize bids in real-time based on the likelihood of conversion.</p>

      <p class="text-lg mt-8">By implementing these strategies and continuously testing and refining your approach, you can significantly improve the ROI of your Google Ads campaigns and achieve sustainable growth for your business.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Google Ads",
    date: "Apr 12, 2025",
    author: "Mark Wilson",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    tags: ["Google Ads", "PPC", "SEM"],
    relatedPosts: [1, 3, 7]
  }
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts[postId as keyof typeof blogPosts];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 animate-fade-in">
        {post ? (
          <>
            {/* Hero Section */}
            <div className="relative">
              <div className="h-80 md:h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover animate-fade-in transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <div className="container mx-auto px-4 md:px-6">
                <div className="relative -mt-32 z-20 animate-slide-in-bottom">
                  <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-4xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-brand-orange mb-6 transition-colors">
                      <ArrowLeft size={16} className="mr-2" /> Back to all articles
                    </Link>
                    <div className="mb-6">
                      <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                      {post.title}
                    </h1>
                    <div className="flex items-center flex-wrap gap-6 text-gray-600 mb-8">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={post.authorImage}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center">
                          <User size={16} className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={16} className="mr-1" />
                        <span>5 Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-12">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3 animate-fade-in [animation-delay:300ms]">
                  <article className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </article>
                  
                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Share */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-bold mb-4">Share this article</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin size={18} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Author */}
                  <div className="mt-12 bg-gray-50 p-8 rounded-xl animate-fade-in [animation-delay:400ms]">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                        <img 
                          src={post.authorImage}
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                        <p className="text-gray-600">
                          Digital marketing specialist with over 10 years of experience in SEO, PPC, and content strategy. 
                          Passionate about helping businesses grow their online presence and achieve their marketing goals.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div className="mt-12 animate-fade-in [animation-delay:500ms]">
                    <h3 className="text-2xl font-bold mb-6">Comments (5)</h3>
                    <div className="space-y-8">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <img 
                              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200"
                              alt="Comment author"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold">John Doe</h4>
                              <span className="text-sm text-gray-500">3 days ago</span>
                            </div>
                            <p className="text-gray-600 mb-3">
                              This is exactly what I needed! I've been struggling with my SEO strategy and these tips are super helpful. 
                              Especially the part about Core Web Vitals - I had no idea they were so important.
                            </p>
                            <button className="text-brand-orange hover:text-brand-orange-dark text-sm font-medium">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="lg:w-1/3 animate-fade-in [animation-delay:600ms]">
                  <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200"
                            alt="Related article"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold hover:text-brand-orange transition-colors">
                            <Link to="/blog/2">Maximizing ROI with Google Ads Campaigns</Link>
                          </h4>
                          <p className="text-sm text-gray-500">Apr 12, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-brand-orange text-white p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                    <p className="mb-4">Get the latest marketing tips and strategies delivered straight to your inbox.</p>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/70 mb-4"
                    />
                    <Button className="w-full bg-white text-brand-orange hover:bg-white/90">Subscribe</Button>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {["SEO", "Google Ads", "Meta Ads", "Content Marketing", "Social Media", "Email Marketing", "Analytics", "Local SEO"].map(tag => (
                        <span key={tag} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm hover:border-brand-orange cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CTASection />
          </>
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button className="bg-brand-orange">Return to Blog</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
