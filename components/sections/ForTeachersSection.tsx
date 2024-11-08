import Link from 'next/link'
import React from 'react'
import Header from '../Header'
import FeatureItems from '../FeaturesList'
import { ForTeachersFeatures } from '@/data/Features'
import Image from 'next/image'
import classroom from '@/public/classroom.webp'

const ForTeachersSection = () => {
  return (
    <section className='flex flex-col slp:flex-row items-center justify-center pt-14 px-5 w-full bg-darkGreen-2 pb-8 text-white-2'>
      <div className='w-full p-[2%] llp:max-w-[500px]'>
        <Header
          headerClass='text-[2.3rem] font-bold slp:text-[48px] slp:mb-5'
          text="O&apos;qitishni soddalashtiring"
          textClass='text-lg my-2.5 mb-[30px] slp:mt-0 font-bold'
          title="O&apos;qituvchilar uchun"
        />

        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 slt:pl-16">
          {ForTeachersFeatures.map((feature) => (
            <FeatureItems key={feature.id} {...feature} />
          ))}
        </ul>

        <Link className='w-[200px] mt-[20px] mb-14 mx-auto h-10 text-lg rounded-full flex items-center justify-center bg-green-1 text-white-2' href={'/spaces'}>Ko&apos;proq o&apos;rganish</Link>
      </div>

      <div className='w-full p-[2%] llp:max-w-[500px]'>
        <Image alt='for teachers' className='w-full' height={400} src={classroom} width={500} />
      </div>
    </section>
  )
}

export default ForTeachersSection