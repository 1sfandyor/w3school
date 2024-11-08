import React from 'react'

const Paper = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={`!font-sansPro flex flex-col items-center justify-center text-center w-full max-w-[1000px] text-white-2 bg-black-4 p-5 pb-10 rounded-[15px] ${className}`}>
      {children}
    </div>
  )
}

export default Paper