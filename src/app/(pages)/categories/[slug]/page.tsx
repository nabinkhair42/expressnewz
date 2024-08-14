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
import { Clock12, PenIcon } from "lucide-react";
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
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {newPosts.map((post) => (
          <Card key={post.slug} className="hover:shadow-lg transition-shadow">
            <Link
              href={`/news/${post.slug}`}
              className="flex flex-col justify-around"
            >
              <CardHeader className="h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  height="400"
                  width="400"
                  className="rounded-t-md shadow-sm h-40"
                />
              </CardHeader>
              <CardFooter className="flex flex-col items-start mt-2 gap-1">
                <CardTitle className="text-[18px] h-24">{post.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Clock12 size={16} />
                    {post.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <PenIcon width={16} />
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
