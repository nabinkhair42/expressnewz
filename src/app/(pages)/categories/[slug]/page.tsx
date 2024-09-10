// src/app/(pages)/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Clock12, UserRoundPen } from "lucide-react";
import Image from "next/image";

// Define the Post type
type Post = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  author: string;
  image: string;
  path: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const baseUrl = "https://expressnewz.vercel.app";
  const response = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// The main component
const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let posts: Post[] = [];

  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return <p>Error loading posts.</p>;
  }

  // Filter posts by category
  const categoryPosts = posts.filter((p) =>
    p.categories.map((c) => c.toLowerCase()).includes(slug.toLowerCase())
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-primary font-extrabold text-center outline-dotted">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} News
      </h1>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {categoryPosts.map((post) => (
          <Card
            key={post.slug}
            className="hover:shadow-lg transition-shadow bg-inherit flex flex-col bg-background rounded-lg overflow-hidden border-none shadow-none"
          >
            <Link href={post.path} className="flex flex-col h-full">
              <CardHeader className="relative overflow-hidden h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full rounded-t-lg shadow-sm"
                />
              </CardHeader>
              <CardFooter className="flex flex-col items-start mt-2 gap-1">
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
      </ul>
    </div>
  );
};

export default CategoryPage;
