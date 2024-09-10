// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/mongodb";

// Use the provided constant API token
const API_TOKEN =
  "fG0BtIbay98c0xGJyaCDAki3yLbdePOyx1P5lV7UHpLCyKcelpC8lMpFTakJqdC";

export async function GET(request: Request) {
  try {
    // Validate API token
    const token = request.headers.get("Authorization");
    if (token !== `Bearer ${API_TOKEN}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase(); // Ensure database connection

    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    const query: any = {};
    if (slug) {
      query.path = decodeURIComponent(slug);
    }

    const posts = await Post.find(query).limit(100).exec();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to load posts:", error);
    return NextResponse.json(
      { message: "Failed to load posts", error: error.message },
      { status: 500 }
    );
  }
}
