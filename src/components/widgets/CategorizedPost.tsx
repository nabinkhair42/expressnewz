"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Clock12, PenIcon } from "lucide-react";
import { TrendingPostSkeleton } from "../skeletons/TrendingPost";
import { Separator } from "@/components/ui/separator";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  path: string;
  categories: string[];
}

// Function to fetch posts based on the category with token
const fetchPosts = async (category: string): Promise<Post[]> => {
  const response = await fetch(
    `/api/posts?category=${encodeURIComponent(category)}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Function to get a random selection of posts
const getRandomPosts = (posts: Post[], numberOfPosts: number): Post[] => {
  const shuffled = posts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfPosts);
};

const CategorizedPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts("politics");
        const dailyPosts = getRandomPosts(fetchedPosts, 5);
        setPosts(dailyPosts);
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

    fetchAndSetPosts();
  }, []);

  // Display loading state
  if (loading) {
    return <TrendingPostSkeleton />;
  }

  // Display error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col p-4 pt-6 px-6 gap-4 xl:gap-6 w-full">
      <h1 className="text-3xl font-bold flex gap-2 items-center">
        <Bookmark className="text-primary" />
        राजनीति
      </h1>
      <Separator />
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.slice(0, 3).map((post) => (
          <div key={post.slug} className="border-b pb-4 mb-4">
            <Link href={post.path} className="flex flex-col gap-2">
              <h2 className="md:text-xl text-3xl font-bold hover:text-primary transition-colors">
                {post.title}
              </h2>
              <div className="flex justify-start items-start gap-2">
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
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default CategorizedPost;
