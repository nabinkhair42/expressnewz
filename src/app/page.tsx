import GoldPrice from "@/components/widgets/GoldPrice";
import RecentPost from "@/components/widgets/TrendingPost";
import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories";
import RecommendedPost from "@/components/widgets/RecommendedPost";
import TrendingPost from "@/components/widgets/TrendingPost";
const page = () => {
  return (
    <div>
      <RecommendedPost />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] mt-4 ">
        <NewsPage />
        <div className="flex flex-col md:flex-row xl:flex-col gap-4  xl:justify-normal ">
          <GoldPrice />
          <TrendingPost />
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default page;
