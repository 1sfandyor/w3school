import React from 'react'

const UnOrderedList = ({list}: {list: React.ReactNode[]}) => {
  return (
    <ul className='flex flex-col list-disc my-[15px] pl-10'>
      {list.map((item, index) => (
        <li key={index} className="text-[15px]">{item}</li>
      ))}
    </ul>
  )
}

export default UnOrderedList