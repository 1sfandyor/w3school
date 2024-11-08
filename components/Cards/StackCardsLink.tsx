import React from 'react'
import Link from 'next/link'
import { StackCardsProp } from '@/types'

const StackCardsLink = ({ url, title, bgColor }: StackCardsProp) => {
  return (
    <div className={`flex flex-col py-[2%] px-[3%] items-center justify-center w-full  
    ${
      url !== '/csharp' && url !== '/c' && url !== '/excel' && url !== '/dsa' && url !== '/machinelearning' && url !== '/ai' 
      ? 'lt:w-1/2 slp:w-1/4' : 'slp:w-1/2'
    }`}>
      <Link className='flex w-full h-full items-center justify-center text-center rounded-sm text-black-1 py-9 px-6 text-lg font-semibold' href={url as string} style={{ backgroundColor: bgColor }}>
        <span className='text-center my-2.5 text-[30px]'>{title}</span>
      </Link>
    </div>
  )
};

export default StackCardsLink