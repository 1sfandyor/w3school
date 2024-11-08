import React from 'react'
import Header from '../Header'
import Link from 'next/link'
import Image from 'next/image'
import circle from '@/public/circle.svg';
import PointerLine from "@/public/PointerLine.svg";
import { cn } from '@/lib/utils';

type CertifiedCareerSectionProps = {
  className?: string;
  headerClassName?: string;
  textClassName?: string;
}

const SertifiedCareerSection = ({className, headerClassName, textClassName}: CertifiedCareerSectionProps) => {
  return (
    <div className={cn('flex flex-col w-full items-center justify-center bg-darkGreen-2 px-[10%] pb-[64px] relative', className)}>
      <Header className={cn('text-pink-1 flex !items-start text-left !justify-start')}
      headerClass={cn('text-[48px] xlt:text-[55px] font-semibold text-start mt-16 mmd:text-6xl', headerClassName)}
      text='Kursni tugatib sertifikat oling'
      textClass={cn('my-10 text-4xl xlt:text-[50px] text-start', textClassName)}
      title='Karerangizni boshlang' 
      />
      <div className='flex absolute top-0 right-0 rotate-12 w-[100px] h-[100px] -translate-y-1/2 -translate-x-1/2
      lt:top-full !lt:bottom-0 lt:w-[170px] lt:h-[170px] lt:right-0 lt:-translate-y-2/4 lt:-translate-x-1/4
      lmd:right-1/3 lmd:translate-x-2/4 lmd:-translate-y-[90%]
      slp:bottom-0
      '>

        <Image alt="Pointer line"
          className="hidden lmd:flex lmd:relative lmd:-right-5 z-50"
          height={143}
          src={PointerLine}
          width={170}
        />
        
        <Image alt='Sertifikat logotipi'
        className='slp:w-[350px] slp:h-[350px] slp:top-1/2 slp:-translate-y-1/4' 
        height={136} src={circle} width={136}
        />

      </div>
      <Link className='flex w-full lt:w-fit items-center lt:self-start justify-center text-xl font-semibold rounded-full bg-green-1 text-white-2 px-[55px] mb-4 text-center py-4' href='/courses'>
        Boshlash
      </Link>
    </div>
  )
}

export default SertifiedCareerSection

// 