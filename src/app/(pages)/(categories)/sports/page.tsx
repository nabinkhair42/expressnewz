import { FC } from 'react';
import Link from 'next/link';

const SportsPage: FC = () => {
  const posts = [
    { slug: 'sports-events', title: 'Upcoming Major Sports Events' },
    { slug: 'athlete-profiles', title: 'Profiles of Top Athletes' },
    // Add more posts here
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sports</h1>
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

export default SportsPage;
