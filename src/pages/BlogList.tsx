import React, { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/notion";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="shadow-md rounded-xl overflow-hidden">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-3">
              {new Date(post.date).toDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              {post.content.slice(0, 150)}...
            </p>
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-600 font-medium"
            >
              Read More →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
