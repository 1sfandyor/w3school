import React from 'react'
import Header from '../Header'
import Link from 'next/link'
import Image from 'next/image'

const SpacesSection = () => {
  return (
    <section className='flex flex-col items-center justify-center pt-14 px-5 w-full bg-gray-3 pb-20 text-white-2'>
        <Header
          headerClass='text-[2.3rem] font-bold md:text-[65px]'
          subText="U foydalanish uchun bepul va hech qanday sozlashlar talab qilinmaydi:"
          subTextClass='text-[1.15rem] !slp:text-5 my-2.5 md:text-2xl font-bold'
          text={
            <>
              Agar o&apos;z veb-saytingizni yaratmoqchi bo&apos;lsangiz <br /> 
              <Link className='text-pink-1 underline' href={'/spaces'}>w3schools maydonlari</Link>
              ni sinab ko&apos;ring.
            </>
            }
          textClass='text-[1.15rem] !slp:text-5 mt-[25px] mb-2.5 font-bold md:text-2xl'
          title='W3Schools Maydonlari'
        />
        <br />
        <Image unoptimized alt="spaces" className='w-full flex mt-2.5 mb-[70px] slp:max-w-[850px]' height={50} src="/dynamicspaces.webp" width={50} />
        <Link className='w-[300px] self-center mx-auto h-[53px] text-xl rounded-full flex items-center justify-center bg-green-1 text-white-2' href={'/spaces'}>Learn More</Link>
    </section>
  )
}

export default SpacesSection