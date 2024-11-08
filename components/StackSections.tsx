import React from 'react'
import { StackSectionProps } from '@/types'
import Link from 'next/link'
import { CodeSnippet } from './ui/codeSnippet'
import { cn } from '@/lib/utils'

const StackSections = ({ bgColor, title, description, buttons, buttonBg, buttonText, codeSnippetText, codeSnippet, syntax, href }: StackSectionProps) => {
  return (
    <div className={`flex flex-col slp:flex-row slp:w-full items-start justify-center w-full text-black-1 py-[32px]`} style={{ backgroundColor: bgColor }}>

      {/* Title and Description */}
      <div className={`p-2.5 w-full slp:w-[500px] text-center slt:p-5 ${title === 'JavaScript' ? '!text-white-2' : ''}`}>
        <h2 className={
          cn(
            `text-6xl mb-[22.8px] font-bold md:text-[100px]`,
            title === 'JavaScript' && 'slp:text-[70px]',
            title === 'Python' && 'slp:text-[80px]',
            title === 'SQL' && 'slp:text-[80px]'
          )
        }>
          {title}
        </h2>
        <p className='text-[19px] mb-[22.8px] font-semibold mx-auto'>
          {description}
        </p>
        <div className='flex flex-col  mx-auto gap-y-2.5'>
          {buttons.map((button, index) => (
            <Link key={index} 
              className={
                cn(
                  button.bg === '#fff4a3' || button.bg === '#FFB3BB' || button.bg === '#E7E9EB' ? '!text-black-1' : 'text-white-2',
                  `text-[18px] mx-auto w-[200px] px-4 py-2 rounded-full`
                )
              } 
              href={button.url}
              style={{backgroundColor: button.bg}}>
              {button.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Code Snippet */}
      <div className='hidden w-full slp:w-[500px] slt:block slt:p-5'>
        <CodeSnippet buttonBg={buttonBg} buttonText={buttonText} className='w-full p-0' href={href} syntax={syntax} title={codeSnippetText}>
          {codeSnippet}
        </CodeSnippet>
      </div>
    </div>
  )
}

export default StackSections
