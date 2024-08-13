import GoldPrice from '@/components/widgets/GoldPrice'
import RecentPost from '@/components/widgets/RecentPost'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen mt-64'>
      <GoldPrice />
      <RecentPost />  
            
    </div>
  )
}

export default page