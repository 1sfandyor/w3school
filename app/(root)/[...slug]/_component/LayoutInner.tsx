import React from 'react'
import { findCurrentAndAdjacentLessons } from '@/utils/navigation'
import Navigation from '@/components/Navigation';

const LayoutInner = ({params}: {params: {slug: string}}) => {
  const { current } = findCurrentAndAdjacentLessons(params.slug[params.slug.length - 1], params.slug[0]);

  return (
    <>
      <div className="w-full h-[60px] nmd:h-[90px]"></div>
      <h1 className='text-[30px] slt:text-[42px] my-2.5 capitalize'>
        {current && current.title}
      </h1>
      <div className=''>
        <Navigation 
          slug={params.slug[params.slug.length - 1]} 
          technology={params.slug[0]} // 'html', 'css', yoki 'js'
        />
      </div>
    </>
  )
}

export default LayoutInner;