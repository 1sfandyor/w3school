import React from 'react'
import { freckle } from '@/config/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image';
import lynx from '@/public/w3lynx_200.webp';
import Link from 'next/link';

const CodeGameSection = () => {
  return (
    <section className='w-full h-full bg-green-3 text-black-1 py-10'>
      <div className='flex flex-col items-center justify-center text-center w-full h-full p-[3%]'>
        <h1 className={cn(freckle.className, 'text-[55px] font-bold mb-2.5 slt:text-6xl mmd:text-[48px]')}>Code Game</h1>
        <p className={cn(freckle.className, 'text-xl mb-5 slt:text-3xl md:text-2xl')}>
          Lynx-ga qarag&apos;ay konuslarini yig&apos;ishga yordam bering
        </p>

        <Image alt='Lynx' className='w-[120px] h-[200px] mb-6' height={120} src={lynx} width={200} />
      
        <Link className='w-[200px] mx-auto text-white-2 text-xl py-[11px] px-[18px] rounded-full bg-gray-3' href='https://www.w3schools.com/'>O&apos;yin o&apos;nash</Link>
      </div>
    </section>
  )
}

export default CodeGameSection