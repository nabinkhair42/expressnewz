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
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = process.env.NEXT_PUBLIC_API_URL; 

  // Ensure API_URL is set
  if (!API_URL) {
    throw new Error("API URL is not defined");
  }

  // Form the absolute URL
  const response = await fetch(`${API_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

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
    console.log('Fetched Posts:', posts); // Debugging log
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <p>No Post added in this category.</p>;
  }

  // Filter posts by category (include posts that have at least one matching category)
  const categoryPosts = posts.filter((p) =>
    p.categories.some((category) => category.toLowerCase() === slug.toLowerCase())
  );

  if (categoryPosts.length === 0) {
    return <p>No Post added in this category.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-primary font-extrabold text-center">
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
                    {new Date(post.date).toLocaleDateString()} {/* Format date */}
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
