"use client";

import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MajorPostLoading } from "@/components/skeletons/MajorPostLoading";
import { Separator } from "@/components/ui/separator";

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
  path: string;
}

const TopLatestPost: React.FC = () => {
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

  if (loading) return <MajorPostLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        // Only display the top 3 sorted posts
        posts.slice(0, 3).map((post, index) => (
          <div key={post.title}>
            <Link href={post.path} className="flex flex-col gap-2">
              <div className="p-4 rounded-md flex flex-col items-center justify-center gap-2">
                <h2 className="text-3xl font-bold text-center">{post.title}</h2>
                <div className="flex md:gap-6 gap-2 items-center justify-center text-nowrap">
                  <p className="flex items-center justify-center gap-2 text-primary">
                    <Avatar
                      src="/author/author.jpg"
                      alt={post.author}
                      size="sm"
                      isBordered={true}
                      className="inline-block ml-2 border border-orange-400 h-12 w-12"
                    />
                    {post.author}
                  </p>
                  <p className="text-muted-foreground">{post.date}</p>
                </div>
                {/* //For the last Post show image also  */}
              </div>
              <Separator />
            </Link>
            <Divider />
          </div>
        ))
      )}
    </div>
  );
};

export default TopLatestPost;