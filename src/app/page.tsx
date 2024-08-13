import GoldPrice from '@/components/widgets/GoldPrice'
import RecentPost from '@/components/widgets/RecentPost'
import React from 'react'
import NewsPage from './(pages)/news/page'
const page = () => {
  return (
    <div>
      <div>
        <NewsPage />
      </div>
      <div>
        <GoldPrice />
        <RecentPost />
      </div>
    </div>
  );
}

export default page