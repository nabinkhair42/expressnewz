import GoldPrice from "@/components/widgets/GoldPrice";
import RecentPost from "@/components/widgets/RecentPost";

import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories"; 
import PostList from "@/components/onUse/postList";
import { ShareMenu } from "@/components/reusable/share";
const page = () => {
  return (
    <div>
      {/* <PostList /> */}
    
      <Carousel />
      <div>
        <NewsPage />
      </div>
      <div>
        <GoldPrice />
        <RecentPost />
      </div>
    </div>
  );
};

export default page;
