import React from 'react'
import Header from '../Header'
import Link from 'next/link'
import FeatureItems from '../FeaturesList'
import { PlusFeatures } from '@/data/Features'

const PlusUserSection = () => {
  return (
    <section className='flex flex-col items-center justify-center pt-[70px] px-[15px] w-full bg-darkGreen-2 pb-28 text-white-2'>
      <Header
        headerClass='text-[2.3rem] font-bold md:text-[65px] ms:text-5xl slt:text-6xl'
        text='Va kuchli afzalliklarga ega bo&apos;ling'
        textClass='text-xl mt-[25px] mt-[19px] mb-10 font-semibold md:text-2xl nlts:text-[25px] text-pink-1'
        title="Plusga a'zo bo'ling"
      />

      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 slt:pl-16">
        {PlusFeatures.map((feature) => (
          <FeatureItems key={feature.id} {...feature} />
        ))}
      </ul>

      <Link className='w-full mt-[35px] ms:w-[300px] self-center mx-auto h-[53px] text-xl rounded-full flex items-center justify-center bg-green-1 text-white-2' href={'/spaces'}>Bepul ro&apos;yhatdan o&apos;tish</Link>

    </section>
  )
}

export default PlusUserSection