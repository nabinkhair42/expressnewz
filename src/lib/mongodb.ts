// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI!);
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
