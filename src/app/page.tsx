import GoldPrice from "@/components/widgets/GoldPrice";
import RecentPost from "@/components/widgets/RecentPost";
import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories";
const page = () => {
  return (
    <div>
      <Carousel />
      <div className="flex flex-col 2xl:flex-row">
        <NewsPage />
        <GoldPrice />
      </div>
      <div>
        <RecentPost />
      </div>
    </div>
  );
};

export default page;
