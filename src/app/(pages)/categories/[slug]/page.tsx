// // src/app/(pages)/news/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Clock12, PenIcon, UserRoundPen } from "lucide-react";
import Image from "next/image";

type Post = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  author: string;
  image: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const newsDirectory = path.join(process.cwd(), "src/data/news");
  const fileNames = fs.readdirSync(newsDirectory);

  const posts: Post[] = fileNames.map((fileName) => {
    const fullPath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ""),
      image: data.image || "", // Add image field
      title: data.title || "Untitled",
      date: data.date || "",
      categories: data.categories || [], // Default categories
      author: data.author || "Express Newz", // Default author
    };
  });

  return posts;
};

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const posts = await fetchPosts();

  const newPosts = posts.filter((p) =>
    p.categories.includes(slug.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} News
      </h1>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {newPosts.map((post) => (
          <Card
            key={post.slug}
            className="hover:shadow-lg transition-shadow bg-inherit flex flex-col bg-background rounded-lg overflow-hidden border-none shadow-none"
          >
            <Link href={`/news/${post.slug}`} className="flex flex-col h-full">
              <CardHeader className="relative overflow-hidden h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full rounded-t-lg shadow-sm"
                />
              </CardHeader>
              <CardFooter className="flex flex-col items-start mt-2 gap-1">
                <CardTitle className="text-[18px] hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex flex-col gap-2">
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

export default BlogPost;
