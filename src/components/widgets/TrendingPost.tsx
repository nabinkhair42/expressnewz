"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock12, PenIcon, TrendingUp } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
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
          const dailyPosts = getRandomPosts(fetchedPosts, 5); // Adjust number of posts as needed
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
      }
    };

    fetchAndSetPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 px-6 gap-4 xl:gap-6 shadow-md border rounded-md max-w-sm">
        <h1 className="text-2xl font-bold flex gap-2 items-center"><TrendingUp className="text-primary"/>Trending Posts:</h1>
      {posts.length === 0 ? (
        <p>No trending posts available</p>
      ) : (
        posts.map((post) => (
          <div className="">
            <Link href={`/news/${post.slug}`}>
              <div>
                <h2 className="text-lg font-bold">{post.title}</h2>
                <div className="flex justify-start items-start gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock12 size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
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

export default TrendingPost;
