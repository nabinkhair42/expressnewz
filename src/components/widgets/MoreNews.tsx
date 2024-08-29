"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
  path: string;
}

const MoreNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();

        const sortedPosts = data.sort((a, b) => {
          const numA = parseInt(a.path.replace(/\D/g, ""), 10);
          const numB = parseInt(b.path.replace(/\D/g, ""), 10);
          return numB - numA;
        });

        setPosts(sortedPosts);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="mt-4 w-full flex flex-col gap-4">
      <div id="title" className="text-4xl text-primary font-extrabold">
        समाचार
      </div>
      <div className="grid md:grid-cols-2 gap-4 container">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post, index) => (
            <Link key={index} href={`/news/${post.path}`}>
              <div key={post.title} className="p-2 rounded-sm">
                <div className="flex gap-4 items-center max-w-md">
                  <div id="image">
                    <Image
                      src={post.image}
                      alt="image"
                      width={100}
                      height={100}
                      className="rounded shadow-md"
                    />
                  </div>
                  <div id="newsTitle">
                    <h1 className="text-2xl font-bold hover:text-primary transition-colors">
                      {post.title.length > 30
                        ? post.title.substring(0, 30) + ".."
                        : post.title}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MoreNews;
