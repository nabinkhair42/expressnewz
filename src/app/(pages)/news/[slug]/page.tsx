//@ts-nocheck

import { notFound } from "next/navigation";
import { Avatar, Chip } from "@nextui-org/react";
import Link from "next/link";
import { ShareMenu } from "@/components/reusable/share";
import RelatedPost from "@/components/widgets/RelatedPost";
import AboveRelatedPost from "@/components/adsLayout/aboveRelatedPost";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { MongoClient } from "mongodb";

// Function to fetch the post data from MongoDB
const fetchPost = async (slug: string) => {
  const decodedSlug = decodeURIComponent(slug);

  const client = await MongoClient.connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const post = await db
    .collection("posts")
    .findOne({ path: `/news/${decodedSlug}` });
  client.close();

  if (!post) {
    return null;
  }

  return JSON.parse(JSON.stringify(post));
};

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  // Fetch the post data based on the path
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  // Convert markdown content to HTML if necessary
  const htmlContent = await markdownToHtml(post.content);

  return (
    <div className="mx-auto">
      <div className="max-w-screen-xl mx-auto relative">
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: "500px",
            backgroundImage: `url(${post.image})`,
          }}
          title={post.title}
        ></div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-t-md bg-background -mt-32 px-5 sm:px-10 border py-10">
            <h1 className="font-bold text-[30px] mb-2">{post.title}</h1>

            {/* Author Details */}
            <div className="flex md:justify-between md:items-center items-start justify-start flex-col md:flex-row">
              <div className="flex gap-2 items-center justify-center">
                <Avatar
                  src="/author/author.jpg"
                  alt={post.author}
                  size="sm"
                  isBordered={true}
                  className="inline-block ml-2 border border-orange-400 h-12 w-12"
                />
                <div className="flex flex-col justify-start items-start gap-1">
                  <p>{post.author}</p>
                  <p className="text-muted-foreground">{post.date}</p>
                </div>
              </div>
              <ShareMenu />
            </div>

            {/* Advertise */}
            <AboveRelatedPost />

            {/* Complete News Goes Here */}
            <p className="leading-8 text-[20px] text-justify mt-4">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              <AboveRelatedPost />
            </p>

            {/* Categories Displayed */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-8">
                <div className="flex gap-2 md:flex-row flex-col">
                  {post.categories.map((category, index) => (
                    <p key={index} className="text-primary">
                      <Link href={`/categories/${category.toLowerCase()}`}>
                        <Chip color="primary" className="px-2 py-1">
                          # {category}
                        </Chip>
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advertise */}
      <AboveRelatedPost />

      {/* Related Posts */}
      {post.categories && <RelatedPost categories={post.categories} />}
    </div>
  );
};

export default BlogPost;
