import React from 'react'
import Header from '../Header'
import w3css_templates from "@/public/w3css_templates.webp";
import Image from 'next/image';
import Link from 'next/link';

const WebTemplatesSection = () => {
  return (
    <div className='flex w-full items-center justify-center flex-col pt-[64px] px-6 pb-[90px] bg-black-2'>
      <Header className='text-white-1' 
      headerClass='text-5xl font-bold leading-relaxed lt:text-6xl mmd:text-[65px]' 
      text="Bizning bepul HTML shablonlarimizni ko'zdan kechiring" 
      textClass='text-xl my-2.5'
      title='Veb Shablonlar'/>

      <Image alt="web template" className='w-full mt-[16px] mb-[32px] lp:max-w-[980px] rounded-md' height={375} src={w3css_templates} width={980}/>

      <Link className='text-white-2 hover:text-black-1 bg-gray-3 p-4 w-full lt:w-1/2 lt:mx-auto text-xl h-[62px] rounded-full flex items-center justify-center text-center' href='/w3css/w3css_templates'>
        Shablonlarni ko&apos;rish
      </Link>
    </div>
  )
}

export default WebTemplatesSection