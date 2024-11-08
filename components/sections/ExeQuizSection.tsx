import React from 'react'
import Header from '../Header'
import Link from 'next/link'

const ExeQuizSection = () => {
  return (
    <section className='w-full bg-darkGreen-2  text-white-2 py-[64px] xl px-5'>
      <Header className='text-center ' 
      headerClass='my-2.5 text-5xl font-bold leading-[4rem]'
      text='Bilimlaringizni sinab ko&apos;ring' 
      textClass='my-2.5 text-xl font-semibold'
      title='Mashqlar va Viktorinalar'/>

      <div className='flex flex-col lt:flex-row items-center justify-center w-full px-2 mx-auto max-w-[1352px]'>
        {/* MASHQLAR */}
        <div className='px-2 lt:px-[3%] w-full lt:w-[49.99999%]'>
          <p className='my-[18px] w-full'>
            <Link className='flex w-full  items-center font-semibold justify-center text-[35px] text-white-2 bg-green-1 py-[70px] px-[50px] rounded-lg' href='https://www.w3schools.com/'>
            Mashqlar
            </Link>
          </p>
        </div>

        {/* VIKTORINALAR */}
        <div className='px-2 lt:px-[3%] w-full lt:w-[49.99999%]'>
          <p className='my-[18px] w-full'>
            <Link className='flex w-full  items-center justify-center text-[35px] text-black-1 bg-yellow-1 py-[70px] px-[50px] rounded-lg font-semibold' href='https://www.w3schools.com/'>
            Viktorinalar
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ExeQuizSection