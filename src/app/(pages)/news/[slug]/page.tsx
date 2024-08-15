// src/app/news/posts/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/blogmarkdownToHtml";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Avatar, Chip } from "@nextui-org/react";
import Link from "next/link";
import { ShareMenu } from "@/components/reusable/share";
import RelatedPost from "@/components/widgets/RelatedPost";

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[];
};

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  if (typeof slug !== "string") {
    notFound();
  }

  const filePath = `${slug}.md`;
  const fullPath = path.join(process.cwd(), "src/data/news", filePath);
  const fileExists = fs.existsSync(fullPath);

  if (!fileExists) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const htmlContent = await markdownToHtml(filePath);

  return (
    <div className="mx-auto">
      <div className="max-w-screen-xl mx-auto relative">
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: "500px",
            backgroundImage: `url(${data.image})`,
          }}
          title={data.title}
        ></div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-t-md bg-background -mt-32 px-5 sm:px-10 border py-10">
            <h1 className="font-bold text-3xl mb-2">{data.title}</h1>

            {/* Author Details */}
            <div className="flex md:justify-between md:items-center items-start  justify-start  flex-col md:flex-row">
              <div className="flex gap-2 items-center justify-center">
                <Avatar
                  src={data.image}
                  alt={data.author}
                  size="sm"
                  isBordered={true}
                  className="inline-block ml-2 border border-primary h-12 w-12"
                />
                <div className="flex flex-col justify-start items-start gap-1 ">
                  <p>{data.author}</p>
                  <p className="text-muted-foreground">{data.date}</p>
                </div>
              </div>
              <ShareMenu />
            </div>

            {/* Complete News Goes Here */}
            <p className="leading-8 text-[18px] text-justify mt-4">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </p>

            {/* Categories Displayed */}
            {data.categories && data.categories.length > 0 && (
              <div className="mt-8">
                <div className="flex gap-2 md:flex-row flex-col">
                  {data.categories.map((category: string, index: number) => (
                    <p key={index} className="text-primary">
                      <Link href={`/categories/${category.toLowerCase()}`}>
                        <Chip color="primary" className="px-2 py-1">
                          # {category}
                        </Chip>
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {data.categories && <RelatedPost categories={data.categories} />}
    </div>
  );
};

export default BlogPost;
