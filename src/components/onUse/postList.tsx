"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Post {
  title: string;
  categories: string[];
  image: string;
  path: string;
}

async function fetchPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      }
    }

    loadPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.path}>
          <h2>{post.title}</h2>
          <Image src={post.image} alt={post.title} />
          <p>{post.categories.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
