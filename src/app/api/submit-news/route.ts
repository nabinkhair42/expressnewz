import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectToDatabase();

  const posts = await Post.find({});
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  await connectToDatabase();

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const author = formData.get("author") as string;
  const categories = JSON.parse(formData.get("categories") as string);
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;

  let imagePath = ""; // Default to empty string if no image is provided
  if (image) {
    const imageBuffer = await image.arrayBuffer();
    const imageExt = image.name.split(".").pop();

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            { resource_type: "image", format: imageExt },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          )
          .end(Buffer.from(imageBuffer));
      }
    );

    imagePath = uploadResult.secure_url || "";
  }

  const newPost = new Post({
    title,
    date,
    author,
    categories,
    image: imagePath,
    content,
  });

  await newPost.save();

  return NextResponse.json(
    { message: "Post created successfully" },
    { status: 201 }
  );
}
