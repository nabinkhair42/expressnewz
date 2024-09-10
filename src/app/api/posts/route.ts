// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    await connectToDatabase(); // Ensure database connection

    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    const query: any = {};
    if (slug) {
      query.path = decodeURIComponent(slug);
    }

    const posts = await Post.find(query).exec();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to load posts:", error);
    return NextResponse.json(
      { message: "Failed to load posts" },
      { status: 500 }
    );
  }
}
