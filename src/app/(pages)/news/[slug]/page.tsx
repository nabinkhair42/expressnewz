import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/blogmarkdownToHtml";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  categories: string[]; // Change this to an array for multiple categories
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
          <div className="rounded-t-md bg-background -mt-32 p-5 sm:p-10 border">
            <h1 className="font-bold text-3xl mb-2">{data.title}</h1>

            {/* Author Details  */}
            <div className="font-semibold flex items-center gap-2 mt-4">
              <Avatar
                src={data.image}
                alt={data.author}
                size="sm"
                className="inline-block ml-2"
              />
              <div className="flex flex-col justify-start items-start gap-1 ">
                <p>{data.author}</p>
                <p className="text-muted-foreground">{data.date}</p>
              </div>
            </div>

            {/* Complete News Goes Here  */}

            <p className="leading-8 text-[18px] text-justify mt-4">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </p>

            {/* Categories Displayed  */}

            {data.categories && data.categories.length > 0 && (
              <div className="mt-8">
                <div className="list-disc pl-5 flex gap-2">
                  {data.categories.map((category: string, index: number) => (
                    <p key={index} className="text-primary">
                      <Link href={`/categories/${category.toLowerCase()}`}>
                        #{category}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
