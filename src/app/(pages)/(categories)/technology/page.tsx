import { FC } from 'react';
import Link from 'next/link';

const TechnologyPage: FC = () => {
  const posts = [
    { slug: 'tech-innovations', title: 'Latest Innovations in Technology' },
    { slug: 'tech-trends', title: 'Emerging Trends in Tech for 2024' },
    // Add more posts here
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Technology</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.slug} className="border rounded p-4">
            <Link href={`/news/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyPage;
