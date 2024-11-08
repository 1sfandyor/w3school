import React from 'react'
import Header from '../Header'
import Safari from '../ui/safari'
import Link from 'next/link'
// import codeEditor from ""

const CodeEditorSection = () => {
  return (
    <section className='flex flex-wrap w-full lt:flex-row flex-col bg-darkGreen-2 py-2 px-4 pb-[64px]'>
      <div className='slp:mx-auto slp:max-w-[942px]'>
        <Header 
          className='text-center text-white-2'
          headerClass='text-[2.3rem] font-bold'
          text="Bizning online kod muharirimiz yordamida, kodlaringizni o'zgartira olasiz va natijani brauzeringizda ko'rishingiz mumkin" 
          textClass='text-[1.15rem] !slp:text-5 mt-[25px] mb-2.5'
          title='Kod Muharriri'
        />
        <br />
        <br />
        <Safari backImg="/codeeditor.webp" frontImg="/best2.webp" tabs={true} url="www.w3schools.com/tryit/" />
        <br />
        <div className='flex flex-col w-full'>
          <Link className='flex py-1.5 lt:w-fit font-semibold rounded-md px-[18px] text-white-1 bg-green-1' href="">
            Try Frontend Editor (HTML/CSS/JS)
          </Link>
          <br />
          <Link className='flex py-1.5 lt:w-fit font-semibold rounded-md px-[18px] text-black-1 bg-yellow-1' href="">
            Try Backend Editor (Python/PHP/Java/C..)
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CodeEditorSection