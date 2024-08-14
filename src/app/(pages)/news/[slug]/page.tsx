import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/blogmarkdownToHtml";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Avatar } from "@nextui-org/react";

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
};

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (typeof slug !== "string") {
    throw new Error("Slug is not defined or not a string");
  }

  const filePath = `${slug}.md`;
  const fullPath = path.join("src/data/news", filePath);
  const fileExists = fs.existsSync(fullPath);

  if (!fileExists) {
    return { title: "Post Not Found" };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: `${
      data.title || slug.replace("-", " ").toUpperCase()
    } | Express Newz`,
    description: data.description || "No description available.",
  };
}

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
    <div className="container mx-auto px-4 py-6">
      {/* Title */}
      <h1 className="text-center text-4xl md:text-6xl font-bold mb-4">
        {data.title}
      </h1>

      {/* Metadata (Displayed) */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <p className="flex items-center gap-2 text-xl">
          <Calendar size={24} /> {data.date}
        </p>
        <div className="flex items-center gap-2">
          <Avatar size="md" src={data.image} isBordered={true} />
          <p className="text-lg">{data.author}</p>
        </div>
      </div>

      {/* Main Image */}
      <div className="mb-6 flex items-center justify-center">
        <Image
          src={data.image}
          className="rounded-md"
          alt={data.title}
          width={750}
          height={750}
        />
      </div>

      {/* Content */}
      <div
        className="prose max-w-lg mx-auto "
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default BlogPost;
