import GoldPrice from "@/components/widgets/GoldPrice";
import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories";
import TopLatestPost from "@/components/widgets/TopLatestPost";
import TrendingPost from "@/components/widgets/TrendingPost";
import CategorizedPost from "@/components/widgets/CategorizedPost";
import BelowLatestPost from "@/components/adsLayout/BelowLatestPost";
import MoreNews from "@/components/widgets/MoreNews";
import Rashifal from "@/components/widgets/Rashifal";
const page = () => {
  return (
    <div className="overflow-x-clip">
      <div className="w-full flex flex-col items-center justify-center">
        <TopLatestPost />
        <BelowLatestPost />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] mt-4">
        <NewsPage />
        <div className="flex flex-col gap-4 mt-4 md:flex-row items-center md:items-start xl:flex-col">
          <GoldPrice />
          <TrendingPost />
          <CategorizedPost />
        </div>
      </div>

      <div className="flex flex-col gap-12 items-center justify-center">
        <BelowLatestPost />
        <MoreNews />
        <BelowLatestPost />
        <Rashifal />
        <BelowLatestPost />
        <Carousel />
      </div>
    </div>
  );
};

export default page;
