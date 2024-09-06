"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock12, PenIcon, TrendingUp } from "lucide-react";
import { TrendingPostSkeleton } from "../skeletons/TrendingPost";
import { Separator } from "@/components/ui/separator";

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  path: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const getRandomPosts = (posts: Post[], numberOfPosts: number): Post[] => {
  const shuffled = posts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfPosts);
};

const TrendingPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const now = new Date();
        const day = now.toISOString().split("T")[0];
        const savedDay = localStorage.getItem("postsDay");
        const savedPosts = localStorage.getItem("postsData");

        if (savedDay === day && savedPosts) {
          setPosts(JSON.parse(savedPosts));
        } else {
          const fetchedPosts = await fetchPosts();
          const dailyPosts = getRandomPosts(fetchedPosts, 5);
          localStorage.setItem("postsDay", day);
          localStorage.setItem("postsData", JSON.stringify(dailyPosts));
          setPosts(dailyPosts);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
        console.log("TrendingPost component mounted");
      }
    };

    fetchAndSetPosts();

    
  }, []);

  if (loading)
    return (
      <p>
        <TrendingPostSkeleton />
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 px-6 gap-4 xl:gap-6 rounded-md w-full">
      <h1 className="text-3xl font-bold flex gap-2 items-center">
        <TrendingUp className="text-primary" />
        ट्रेन्डिङ:
      </h1>
      <Separator />
      {posts.length === 0 ? (
        <p>No trending posts available</p>
      ) : (
        posts.slice(0, 3).map((post) => (
          <div key={post.slug}>
            <Link href={post.path} className="flex flex-col gap-2 ">
              <h2 className="md:text-xl text-3xl  font-bold hover:text-primary transition-colors">
                {post.title}
              </h2>
              <div className="flex justify-start items-start gap-2">
                <div className="text-muted-foreground flex flex-col gap-2 md:flex-row md:text-md text-lg">
                  <div className="flex items-center gap-2 ">
                    <Clock12 size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PenIcon size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
              <Separator />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default TrendingPost;
