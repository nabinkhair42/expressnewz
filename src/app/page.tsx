import GoldPrice from "@/components/widgets/GoldPrice";
import RecentPost from "@/components/widgets/RecentPost";
import React from "react";
import NewsPage from "./(pages)/news/page";
import { Carousel } from "@/components/onUse/stories";
const page = () => {
  return (
    <div>
      <Carousel />
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <NewsPage />
        </div>
        <div className="col-span-1">
          <GoldPrice />
        </div>
      </div>
      <div>
        <RecentPost />
      </div>
    </div>
  );
};

export default page;
