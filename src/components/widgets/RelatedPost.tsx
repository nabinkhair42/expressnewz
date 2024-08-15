
"use client";
import { useEffect, useState } from "react";
import { Avatar, Chip } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/posts?category=${categories[0]}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data.filter((post: Post) => post.categories.some(category => categories.includes(category))));
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [categories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-background mt-12">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.path} className="p-6 rounded-lg border shadow-md bg-card">
              <div className="flex justify-between items-center mb-5 text-muted-foreground">
                <Chip color="primary" className="px-2">
                  {post.categories.join(', ')}
                </Chip>
                <span className="text-sm">{post.date}</span>
              </div>
              <h2 className="mb-2 text-xl font-bold tracking-tight">
                <Link href={post.path}>{post.title}</Link>
              </h2>
              <p className="mb-5 font-light text-muted-foreground">
                {post.content.substring(0, 150)}...
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar src={post.image || '/default-avatar.png'} />
                  <span className="font-medium dark:text-white">{post.author}</span>
                </div>
                <Link
                  href={post.path}
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <MoveRight size={16} />
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