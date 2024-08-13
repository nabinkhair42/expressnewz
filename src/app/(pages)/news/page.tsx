// src/app/news/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Define the type for your posts
type Post = {
  slug: string;
  title: string;
  date: string;
  author: string; // Add author field
};

const fetchPosts = async (): Promise<Post[]> => {
  const newsDirectory = path.join(process.cwd(), 'src/data/news');
  const fileNames = fs.readdirSync(newsDirectory);

  const posts: Post[] = fileNames.map(fileName => {
    const fullPath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      date: data.date || '',
      author: data.author || 'Express Newz', // Default author
    };
  });

  return posts;
};

const NewsPage = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>News</h1>
      <ul className='flex flex-col gap-4 mt-4'>
        {posts.map(post => (
          <li key={post.slug} className='border rounded-md px-4 py-4'>
            <Link href={`/news/${post.slug}`}>
              <div className='font-bold'>{post.title}</div>
              <div className='text-sm text-muted-foreground'>{post.date} - {post.author}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
