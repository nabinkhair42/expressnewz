import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// Directory where Markdown files are stored
const postsDirectory = path.join(process.cwd(), 'src/data/news');

export async function GET() {
  try {
    // Read file names from the posts directory
    const fileNames = fs.readdirSync(postsDirectory);

    // Map through file names to create an array of post data
    const posts = fileNames.map((fileName) => {
      // Construct full file path
      const fullPath = path.join(postsDirectory, fileName);

      // Read file content
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse front matter from the file
      const { data } = matter(fileContents);

      // Return structured post data
      return {
        title: data.title || 'Untitled',
        categories: data.categories || [], // Handle categories as an array
        image: data.image || '', // Adjust based on your front matter
        path: `/news/${fileName.replace(/\.md$/, '')}`, // Create URL path for routing
      };
    });

    // Return posts data as JSON response
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to load posts:', error);
    return NextResponse.json({ message: 'Failed to load posts' }, { status: 500 });
  }
}
