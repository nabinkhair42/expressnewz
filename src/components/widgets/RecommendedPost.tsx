"use client";
import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MajorPostLoading } from "@/components/skeletons/MajorPostLoading";
import { Separator } from "@/components/ui/separator";

// Define the types for your post data
interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
  path: string;
}

const RecommendedPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <p>
        <MajorPostLoading />
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>
          <MajorPostLoading />
        </p>
      ) : (
        // Add up to 5 only recommended posts
        posts.slice(0, 3).map((post, index) => (
          <div key={index} className="post">
            <Link href={post.path}>
              <div className="p-4 rounded-md flex flex-col items-center justify-center gap-2">
                <h2 className="text-3xl font-bold text-center">{post.title}</h2>
                <div className="flex gap-6 items-center justify-center text-nowrap">
                  <p className="flex items-center justify-center gap-2 text-primary">
                    <Avatar
                      src="/author/author.jpg"
                      alt={post.author}
                      size="sm"
                      isBordered={true}
                      className="inline-block ml-2 border border-primary h-12 w-12"
                    />
                    By {post.author}
                  </p>
                  <p className="text-muted-foreground">{post.date}</p>
                </div>
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

export default RecommendedPost;
