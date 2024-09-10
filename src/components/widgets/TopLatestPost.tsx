"use client";
import { Avatar, Divider } from "@nextui-org/react";
import Image from "next/image";
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

        // Sort posts by date, latest first
        const sortedPosts = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime(); // Latest date first
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
        posts.slice(0, 3).map((post, index) => (
          <div key={post.title} className="w-full pt-6">
            <Link href={post.path} className="flex flex-col gap-6">
              <div className="p-4 rounded-md flex flex-col items-center justify-center gap-2">
                <h2 className="text-4xl font-bold text-center hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <div className="flex md:gap-6 gap-3 items-center justify-center text-lg">
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
              </div>

              {/* Add Image for Last Post only */}
              {index === 2 && (
                <Image
                  src={post.image}
                  alt="image"
                  width={500}
                  height={500}
                  className="w-full h-96 object-cover rounded-sm"
                />
              )}
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
