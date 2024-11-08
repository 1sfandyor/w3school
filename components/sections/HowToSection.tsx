import React from 'react'
import Header from '../Header';
// import Safari from '../ui/safari';
import Slider from '../ui/slider';
import mountains from '@/public/img_mountains_wide.jpg';
import nature from '@/public/img_nature_wide.jpg';
import snow from '@/public/img_snow_wide.jpg';
import Safari from '../ui/safari';
import Link from 'next/link';

const HowToSection = () => {
  
  const images = [mountains.src, nature.src, snow.src];

  return (
    <div className='flex flex-col w-full items-center text-gray-2 bg-darkGreen-1 justify-center px-[24px] pt-[84px] pb-[90px]'>
      <Header className='text-center'
        headerClass="text-2xl font-bold mb-2.5 text-6xl leading-relaxed"
        subText='Masalan, slider show qanday qilinishi'
        subTextClass='text-lg mb-5 text-center font-bold'
        text="HTML, CSS va JavaScript uchun kod bo'laklari."
        textClass='text-xl mb-5 text-center font-bold'
        title="Qanday qilinadi ?"
      />

      <Safari className='slp:max-w-[932px] mb-[37px]' url='www.w3schools.com/howto/'>
        <Slider images={images} />
      </Safari>
      
      <Link className='text-white-2 hover:text-black-1 bg-darkGreen-2 p-4 w-full lt:w-1/2 slp:w-[480px] lt:mx-auto text-xl h-[62px] rounded-full flex items-center justify-center text-center' href='/w3css/w3css_templates'>
        Qanday qilishni o&apos;rganish
      </Link>
    </div>
  );
};

export default HowToSection