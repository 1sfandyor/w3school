import React from 'react'
import Header from '../Header'
import Link from 'next/link'
import Image from 'next/image'
import circle from '@/public/circle.svg';
import PointerLine from "@/public/PointerLine.svg";
import clsx from 'clsx';
import { sourceSansPro } from '@/config/fonts';

type CertifiedCareerSectionProps = {
  className?: string;
  headerClassName?: string;
  textClassName?: string;
}

const SertifiedCareerSection2 = ({className, headerClassName, textClassName}: CertifiedCareerSectionProps) => {
  return (
    <div className={clsx('flex flex-col w-full items-center justify-center bg-darkGreen-2 rounded-[16px] mt-[16px] mb-[55px] lmd:mb-[125px] px-[10%] pb-[64px] relative ',
      className, sourceSansPro.className)}>
      <Header className={clsx('text-pink-1 flex !items-start text-left !justify-start')}
      headerClass={clsx('text-[32px] xlt:text-[55px] font-semibold text-start mt-16 mmd:text-6xl', headerClassName)}
      text='Kursni tugatib sertifikat oling'
      textClass={clsx('my-10 text-2xl xlt:text-[50px] text-start', textClassName)}
      title='Karerangizni boshlang'
      />

      <div className='flex absolute top-0 right-0 rotate-12 w-[100px] h-[100px] -translate-y-1/4 translate-x-[7%]
      lmd:!bottom-0 lmd:!w-[200px] lmd:!h-[200px] lmd:translate-y-[150%] lmd:-translate-x-[110%]
      slp:-translate-x-[25%] slp:translate-y-[255%]
      nmlp:translate-y-[210%]
      xlp:-translate-x-[110%] xlp:translate-y-[190%]
      slg:translate-y-[155%]
      '>
        <Image alt="Pointer line"
          className="hidden lmd:flex slp:hidden xlp:flex lmd:w-full lmd:h-full lmd:relative -translate-y-5 lmd:-right-10 z-50"
          height={143}
          src={PointerLine}
          width={170}
        />
        
        <Image alt='Sertifikat logotipi' 
        className='lmd:!w-[200px] lmd:!h-[200px] ' 
        height={136} src={circle} width={136}
        />
      </div>

      <Link className='flex w-full lt:py-[17px] font-semibold lmd:w-fit items-center lmd:self-start justify-center text-lg rounded-full bg-green-1 text-white-2 px-[55px] mb-4 text-center py-3' href='/courses'>
        Boshlash
      </Link>
    </div>
  )
}

export default SertifiedCareerSection2;