// app/api/submit-news/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/data/news");
const imagesDirectory = path.join(process.cwd(), "public/images");

function getNextPostNumber() {
  const files = fs.readdirSync(postsDirectory);
  const postNumbers = files
    .filter((file) => file.startsWith("post") && file.endsWith(".md"))
    .map((file) => parseInt(file.replace("post", "").replace(".md", "")));
  return Math.max(17, ...postNumbers) + 1;
}

export async function GET() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ""),
      ...data,
      content,
    };
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const author = formData.get("author") as string;
  const categories = JSON.parse(formData.get("categories") as string);
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;

  let imagePath = "";
  if (image) {
    const imageBuffer = await image.arrayBuffer();
    const imageExt = image.name.split(".").pop();
    imagePath = `/images/image${getNextPostNumber()}.${imageExt}`;
    const fullImagePath = path.join(
      imagesDirectory,
      `image${getNextPostNumber()}.${imageExt}`
    );
    fs.writeFileSync(fullImagePath, Buffer.from(imageBuffer));
  }

  const postNumber = getNextPostNumber();
  const fileName = `post${postNumber}.md`;
  const fullPath = path.join(postsDirectory, fileName);

  const fileContent = `---
title: "${title}"
date: "${date}"
author: "${author}"
categories: ${JSON.stringify(categories)}
image: "${imagePath}"
---
${content}`;

  fs.writeFileSync(fullPath, fileContent);
  return NextResponse.json(
    { message: "Post created successfully", postNumber },
    { status: 201 }
  );
}
