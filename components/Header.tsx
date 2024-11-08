import React, { ReactNode } from 'react'

const Header = ({ title, text, className, headerClass, textClass, subText, subTextClass }: { title: string, text: string | ReactNode, className?: string, headerClass?: string, textClass?: string, subText?: string, subTextClass?: string }) => {
  return (
    <div className={`flex flex-col text-center w-full ${className}`}>
      <h1 className={headerClass}>{title}</h1>
      <p className={textClass}>{text}</p>
      {subText && <p className={subTextClass}>{subText}</p>}
    </div>
  )
}

export default Header