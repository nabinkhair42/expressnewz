// src/app/api/posts/route.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const postsDirectory = path.join(process.cwd(), "src/data/news");

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title || "Untitled",
        date: data.date || "",
        author: data.author || "",
        content: content || "",
        image: data.image || "",
        categories: data.categories || [],
        path: `/news/${fileName.replace(/\.md$/, "")}`,
      };
    });

    const filteredPosts = category
      ? posts.filter(post => post.categories.includes(category))
      : posts;

    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Failed to load posts:', error);
    return NextResponse.json({ message: 'Failed to load posts' }, { status: 500 });
  }
}
