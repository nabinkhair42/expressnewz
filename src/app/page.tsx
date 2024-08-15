import GoldPrice from "@/components/widgets/GoldPrice";
import RecentPost from "@/components/widgets/TrendingPost";
import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories";
import RecommendedPost from "@/components/widgets/RecommendedPost";
import TrendingPost from "@/components/widgets/TrendingPost";
import CategorizedPost from "@/components/widgets/CategorizedPost";
const page = () => {
  return (
    <div>
      <RecommendedPost />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] mt-4 ">
        <NewsPage />
        <div className="flex flex-col gap-4 mt-4 md:flex-row items-center md:items-start xl:flex-col">
          <GoldPrice />
          <TrendingPost />
          <CategorizedPost />
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default page;
