"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Clock12, UserRoundPen } from "lucide-react";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
  path: string;
}

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
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

  if (loading) {
    return <PostSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {posts.map((post) => (
          <Card
            key={post.path}
            className="hover:shadow-lg transition-shadow bg-inherit flex flex-col bg-background rounded-lg overflow-hidden border-none shadow-none"
          >
            <Link href={`${post.path}`} className="flex flex-col h-full">
              <CardHeader className="relative overflow-hidden h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full rounded-t-lg shadow-sm"
                />
              </CardHeader>
              <CardFooter className="flex flex-col p-4 flex-grow items-start">
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex flex-col gap-2 mt-2 md:text-md text-lg">
                  <div className="flex items-center gap-2">
                    <Clock12 size={16} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRoundPen width={16} />
                    {post.author}
                  </div>
                </CardDescription>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
