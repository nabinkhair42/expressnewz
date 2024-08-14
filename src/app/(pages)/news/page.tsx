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
import { Clock12, PenIcon } from "lucide-react";
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
    <div>
  <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
    {posts.map((post) => (
      <Card key={post.slug} className="hover:shadow-lg transition-shadow flex flex-col">
        <Link
          href={`/news/${post.slug}`}
          className="flex flex-col h-full"
        >
          <CardHeader className="relative overflow-hidden h-40">
            <Image
              src={post.image}
              alt={post.title}
              height={400}
              width={400}
              className="object-cover w-full h-full rounded-t-md shadow-sm"
            />
          </CardHeader>
          <CardFooter className="flex flex-col items-start p-4 flex-grow">
            <CardTitle className="text-[18px]">{post.title}</CardTitle>
            <CardDescription className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock12 size={16} />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

export default NewsPage;
