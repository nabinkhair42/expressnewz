"use client";
import { useEffect, useState } from "react";
import { Avatar, Chip } from "@nextui-org/react";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";

type Post = {
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
  path: string;
};

const RelatedPosts: React.FC<{ categories: string[] }> = ({ categories }) => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(
            data.filter((post: Post) =>
              post.categories.some((category) => categories.includes(category))
            )
          );
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [categories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-background">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col gap-8">
        <div
          id="title"
          className="text-5xl py-2 text-primary font-extrabold text-center outline-dotted"
        >
          सिफारिस गरिएको समाचार
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.path}
              className="p-6 rounded-lg border shadow-md bg-card"
            >
              <div className="flex justify-between items-start mb-5 text-muted-foreground flex-col md:flex-row gap-2">
                <div className="flex gap-2 flex-row">
                  {post.categories.map((category: string, index: number) => (
                    <p key={index} className="text-primary">
                      <Link href={`/categories/${category.toLowerCase()}`}>
                        <Chip color="primary" className="p-1">
                          # {category}
                        </Chip>
                      </Link>
                    </p>
                  ))}
                </div>
                <span className="text-lg">{post.date}</span>
              </div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight hover:text-primary transition-colors">
                <Link href={post.path}>{post.title}</Link>
              </h2>
              <p className="mb-5 font-light text-muted-foreground text-xl text-justify">
                {post.content.substring(0, 150)}...
              </p>
              <div className="flex justify-between items-center text-lg">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src="/author/author.jpg"
                    size="sm"
                    className="w-fit aspect-square object-fill border border-orange-400"
                  />
                  <span className="font-medium">{post.author}</span>
                </div>
                <Link
                  href={post.path}
                  className="flex items-center gap-[2px] text-primary"
                >
                  Read more
                  <ChevronRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
