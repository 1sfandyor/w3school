import Image from 'next/image'
import React from 'react'
import Header from '../Header'
import Link from 'next/link'

const MyLearningSections = () => {
  return (
    <section className='flex flex-col slp:flex-row items-start justify-center pt-[65px] pb-[70px] px-5 w-full bg-green-2'>
      <div className='flex items-center justify-center p-[3%] w-full slp:w-fit'>
        <Image alt="mylearning" className='w-full nlts:max-w-[500px] slp:max-w-[417px]' height={415} src="/mylearning24.webp" width={415} />
      </div>

      <div className='p-2.5 text-black-1 slp:w-[473px] slp:p-[3%] '>
        <Header
          headerClass='text-[2.3rem] font-bold mb-[35px] ms:text-5xl slt:text-6xl'
          subText='Hisobingizga kiring va ballarni to&apos;plashni boshlang'
          subTextClass='text-[1.15rem] ms:text-xl mb-[22px] mt-[35px] font-semibold'
          text='Bizning bepul "O&apos;rganayapman" bo&apos;limimizda o&apos;rganish jarayoningizni kuzatib boring.'
          textClass='text-[1.15rem] ms:text-xl font-semibold'
          title='O&apos;rganayapman'
        />

        <Link className='w-full ms:w-[300px] self-center mx-auto h-[53px] text-xl rounded-full flex items-center justify-center bg-green-1 text-white-2' href={'/spaces'}>Bepul ro&apos;yhatdan o&apos;tish</Link>
        
      </div>
    </section>
  )
}

export default MyLearningSections