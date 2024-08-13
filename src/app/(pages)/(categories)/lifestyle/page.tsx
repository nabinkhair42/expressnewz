import { FC } from 'react';
import Link from 'next/link';

const LifestylePage: FC = () => {
  const posts = [
    { slug: 'healthy-living', title: 'Tips for Healthy Living' },
    { slug: 'travel-destinations', title: 'Top Travel Destinations for 2024' },
    // Add more posts here
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lifestyle</h1>
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

export default LifestylePage;
