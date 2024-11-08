'use client'

import React from 'react'
import Header from '../Header'
import Image from 'next/image'
import ColorPicker from '@/public/colorpicker.webp'
import { useRouter } from 'next/navigation'

const ColorPickerSection = () => {

  const router = useRouter();

  return (
    <section className='w-full py-[78px] bg-gray-8 text-black-1'>
      <Header
        headerClass='text-5xl font-bold md:text-[65px] mb-[25px]'
        text='W3Schoolsning mashxur rang tanlagichi'
        textClass='text-xl mb-[36px] font-semibold md:text-2xl nlts:text-[25px]'
        title="Rang tanlagich"
      />
      <Image alt='color-picker' className='mx-auto cursor-pointer' height={128} src={ColorPicker} width={150} 
            onClick={() => router.push('colors/colors_picker')}/> 
    </section>
  )
}

export default ColorPickerSection