import { FC } from 'react';
import Link from 'next/link';

const BusinessPage: FC = () => {
  const posts = [
    { slug: 'market-trends', title: 'Current Market Trends and Insights' },
    { slug: 'entrepreneurship', title: 'Entrepreneurship in the Modern World' },
    // Add more posts here
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Business</h1>
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

export default BusinessPage;
