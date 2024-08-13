import { FC } from 'react';
import { notFound } from 'next/navigation';
import { markdownToHtml } from '@/lib/markdownToHtml';
import { Metadata } from 'next';

interface BlogPostProps {
  content: string;
  slug: string;
}

// Generate static params for SSG
export async function generateStaticParams() {
  // Read slugs from your file system or a data source
  const posts = ['post1', 'post2']; // Example slugs, replace with actual data
  return posts.map(slug => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  if (typeof slug !== 'string') {
    throw new Error('Slug is not defined or not a string');
  }
  
  const filePath = `src/data/news/${slug}.md`;
  const content = await markdownToHtml(filePath);
  
  return {
    title: slug.replace('-', ' ').toUpperCase() + ' | My News Website',
    description: content.substring(0, 150),
  };
}

// Page component
const BlogPost: FC<{ params: { slug: string } }> = async ({ params }) => {
  const { slug } = params;
  if (typeof slug !== 'string') {
    notFound();
  }
  
  const filePath = `src/data/news/${slug}.md`;
  const content = await markdownToHtml(filePath);
  
  if (!content) {
    notFound();
  }
  
  return (
    <article className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{slug.replace('-', ' ').toUpperCase()}</h1>
      </header>
      <section className="prose prose-lg">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </article>
  );
};

export default BlogPost;
