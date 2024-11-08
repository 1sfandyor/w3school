import { sourceSansPro } from '@/config/fonts'
import clsx from 'clsx'
import React from 'react'
import { Progress } from '../ui/progress'
import Link from 'next/link'


const TrackAd = () => {
  return (
    <div className={clsx('flex flex-col  items-center smd:items-end justify-center w-full bg-gray-3 relative rounded-[8px] text-white-2 p-[30px] mt-5',sourceSansPro.className)}>
      <div className="flex flex-col items-center justify-center smd:items-end smd:flex-row text-center">
        <div className="flex flex-col items-center justify-end text-center">
          <h2 className='text-[19px] text-yellow-1 my-0'>W3shools pathfinder</h2>
          <p className='text-[18px] my-0 smd:text-[22px]'>
            Jarayonni kuzating - bu bepul!
          </p>
          <Progress  className="mt-[22px] smd:mt-3 bg-[#181920]" value={30}/>
        </div>

        <div className="h-10 my-6 flex items-center justify-center min-w-[266px] relative">
          <Link className="fle0 text-[17px] absolute leading-normal items-center left-14 justify-center z-10 rounded-full bg-green-1 shrink-0 py-2 px-4 pl-6"
              href={
                "https://profile.w3schools.com/sign-up?redirect_url=https%3A%2F%2Fwww.w3schools.com%2Fspaces%2Findex.php"
              }
            >
              Yaratish
            </Link>

            <Link className="bg-green-2 pl-10 text-[17px] left-8 leading-normal flex items-center text-nowrap justify-center px-4 py-2 text-black-1 hover:text-white-2 cursor-pointer hover:bg-green-1 relative rounded-full"
              href={"https://profile.w3schools.com/login?redirect_url=https%3A%2F%2Fwww.w3schools.com%2Fspaces%2Findex.php"}
            >
              Kirish
            </Link>
        </div>
      </div>
      {/* <div className='absolute top-0 left-0 w-[93.5%] min-w-auto h-full bg-[url("/lynx-path-left-side.png")] bg-no-repeat bg-cover bg-center'></div> */}
    </div>
  )
}

export default TrackAd