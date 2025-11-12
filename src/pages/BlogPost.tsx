{/* 🔹 Content Section */}
<div className="container mx-auto px-4 md:px-6 py-8">
  <div className="flex flex-col md:flex-row gap-8">
    
    {/* 🔸 Main Content */}
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

        {/* ✅ Article Content */}
        <div className="prose prose-lg prose-orange max-w-none leading-relaxed">

          {/* ✅ TOC block (inside content, before first heading) */}
          {toc.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScroll(item.id)}
                      className="hover:text-brand-orange transition-colors"
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

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

    {/* 🔸 Sidebar (About + Help) */}
    <div className="w-full md:w-1/3 flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
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
