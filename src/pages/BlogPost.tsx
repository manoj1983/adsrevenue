import React, { useEffect, useState } from "react";
import { getAllPosts } from "../lib/notion";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    getAllPosts().then((posts) => {
      const found = posts.find((p) => p.slug === slug);
      setPost(found);
    });
  }, [slug]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-lg mb-6" />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(post.date).toDateString()}
      </p>
      <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </p>
    </div>
  );
}
