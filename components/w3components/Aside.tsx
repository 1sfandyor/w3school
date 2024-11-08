'use client';
import { socials } from '@/data/socials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import ColorPicker from '@/public/colorpicker.webp'
import Link from 'next/link'
const Aside = () => {

  const router = useRouter();

  return (
    <div className="hidden min-w-[13%] slp:flex flex-col px-2 py-4 border-l border-gray-6/25">
      <div className="py-5">
        <Image alt='w3schools' className="w-full" height={300} src={'/img_kurs_up_html_160.webp'}  width={160} />
      </div>
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className='text-[21px] uppercase mb-1 text-center'>Rang tanlagich</h2>
        <Image alt='color-picker' className='mx-auto cursor-pointer' height={68} src={ColorPicker} width={80} 
            onClick={() => router.push('colors/colors_picker')}/> 
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {
          socials.map((social, index) => (
            <li key={index} className="w-fit h-fit">
              <Link className="flex items-center justify-center" href={social.href}>
                <FontAwesomeIcon className="w-8 h-8" icon={social.icon} />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Aside