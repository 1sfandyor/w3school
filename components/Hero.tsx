import Link from 'next/link'
import React from 'react'
import SearchComponent from './Search'

const Hero = () => {
  return (
    <div className={`flex items-center justify-center w-full py-[90px] px-5
      bg-[url('/background_in_space.webp')] 
      slp:bg-[url('/lynx_in_space.webp'),url('/background_in_space.webp')] 
      slp:bg-[position:90%_60%,center_center] 
      bg-[position:center_center]
      slp:bg-[size:auto,cover]
      bg-[size:cover]
      bg-no-repeat
      `}>
        <div className='flex flex-col text-white-2 items-center justify-center text-center xl:max-w-[1200px] xl:px-[35px] xlp:px-[90px]'>
          <h1 className='text-[40px] lt:text-6xl md:text-7xl font-bold'>Dasturlashni o&apos;rganish</h1>
          <h3 className='text-[19px] lt:text-[23px] text-yellow-1 font-bold my-5'>uchun dunyodagi eng katta sayt.</h3>

          <br />
          <SearchComponent className="h-11" btn/>
          <Link className='text-white-2 text-nowrap underline text-[18px] lt:text-[23px] mt-[30px] capitalize font-bold hover:text-yellow-1' href='/'>
            Qayerdan boshlashni bilmayapsizmi ?
          </Link>
        </div>
    </div>
  )
}

export default Hero

// bg-gray-3