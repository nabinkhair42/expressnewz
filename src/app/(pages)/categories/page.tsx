// src/app/news/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

// Define the type for your posts
type Post = {
  slug: string;
  title: string;
  description: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const newsDirectory = path.join(process.cwd(), "src/data/categories");
  const fileNames = fs.readdirSync(newsDirectory);

  const posts: Post[] = fileNames.map((fileName) => {
    const fullPath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      description: data.description || "No description",
    };
  });

  return posts;
};

const CategoriesPage = async () => {
  const posts = await fetchPosts();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Categories</h1>
      <ul className="flex flex-col gap-4 ">
        {posts.map((post) => (
          <li key={post.slug} className="border rounded-md px-4 py-4">
            <Link href={`/categories/${post.slug}`}>
              <div className="font-bold">{post.title}</div>
              <div className="text-sm text-muted-foreground">
                {post.description}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
