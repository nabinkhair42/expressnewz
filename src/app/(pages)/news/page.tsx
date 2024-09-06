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
import Image from "next/image";
import { Clock12, PenIcon, UserRoundPen } from "lucide-react";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
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
      title: data.title || "Untitled",
      image: data.image || "",
      date: data.date || "",
      categories: data.categories || [],
      author: data.author || "Express Newz",
    };
  });

  return posts;
};

const NewsPage = async () => {
  const posts = await fetchPosts();

  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {posts.length === 0 ? (
          <PostSkeleton />
        ) : (
          posts.map((post) => (
            <Card
              key={post.slug}
              className="hover:shadow-lg transition-shadow bg-inherit flex flex-col bg-background rounded-lg overflow-hidden border-none shadow-none"
            >
              <Link
                href={`/news/${post.slug}`}
                className="flex flex-col h-full"
              >
                <CardHeader className="relative overflow-hidden h-40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
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
          ))
        )}
      </div>
    </div>
  );
};

export default NewsPage;
