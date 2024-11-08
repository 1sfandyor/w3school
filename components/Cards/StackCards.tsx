import React from 'react'
import { StackCardsProp } from '@/types'
import Link from 'next/link';

const StackCards = ({ bgColor, title, description, button }: StackCardsProp) => {
  return (
    <div className={`${bgColor} py-[2%] px-[3%] w-full slp:w-1/2`}>
      <div className='flex flex-col w-full rounded-lg items-center text-black-1 justify-center p-6' style={{ backgroundColor: bgColor }}>
        <h2 className='text-5xl my-2.5 font-bold'>{title}</h2>
        <p className='flex items-center text-lg text-center my-2.5 font-semibold h-[70px] self-center'>{description}</p>
        <Link className={`text-white-2 text-center h-10 mb-[16px] w-[200px] px-4 py-2 mx-auto rounded-full`} 
              href={button?.url as string} 
              style={{ backgroundColor: button?.bg as string }}>
          {button?.text}
        </Link>
      </div>
    </div>
  )
}

export default StackCards