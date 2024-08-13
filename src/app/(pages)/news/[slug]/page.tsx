// src/app/(pages)/news/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/Blog-markdownToHtml";
import { notFound } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (typeof slug !== "string") {
    throw new Error("Slug is not defined or not a string");
  }

  const filePath = `${slug}.md`; // Use the slug to find the Markdown file
  const fullPath = path.join("src/data/news", filePath);
  const fileExists = fs.existsSync(fullPath);

  if (!fileExists) {
    return { title: "Post Not Found" };
  }

  const content = await markdownToHtml(filePath);

  return {
    title: slug.replace("-", " ").toUpperCase() + " | My Blog",
    description: content.substring(0, 150),
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
    <div>
      <h1>{data.title}</h1>
      <p>
        {data.date}
      </p>
      <p>{data.author}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default BlogPost;
