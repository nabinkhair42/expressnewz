"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock12, PenIcon, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  path: string;
}

const TrendingPosts: React.FC = () => {
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
        const data = await response.json();
        setPosts(data.slice(0, 3)); // Limit to 3 posts
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a skeleton loader
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col p-4 pt-6 px-6 gap-4 xl:gap-6 w-full">
      <h2 className="text-3xl font-bold flex gap-2 items-center">
        <TrendingUp className="text-primary" />
        ट्रेन्डिङ
      </h2>
      <Separator />
      {posts.length === 0 ? (
        <p>No trending posts available</p>
      ) : (
        posts.map((post, index) => (
          <React.Fragment key={post.slug}>
            <div className="pb-2">
              <Link href={`${post.path}`} className="flex flex-col gap-2">
                <h2 className="md:text-xl text-3xl font-bold hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <div className="text-muted-foreground flex flex-col gap-2 md:flex-row md:text-md text-lg">
                  <div className="flex items-center gap-2">
                    <Clock12 size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PenIcon size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            </div>
            {index < posts.length - 1 && <Separator className="my-2" />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default TrendingPosts;
