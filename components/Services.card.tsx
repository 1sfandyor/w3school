import { menuData } from '@/data/nav'
import Link from 'next/link'
import React from 'react'

const ServicesMenu = () => {
  return (
    <div className="px-5 py-9 smd:px-0">
      <ul className='px-2 smd:px-0 grid lt:grid-cols-2 smd:grid-cols-3 gap-8 smd:gap-5'>
        {menuData.Xizmatlar.links?.map((link, linkIndex) => (
          <li key={linkIndex} className="mb-1 relative p-2.5 smd:p-0">
            <Link className="text-white-2 flex h-full flex-col px-4 py-2 bg-gray-5 hover:bg-black-1 rounded-lg font-medium" href={link.url}>
              <h2 className='text-xl text-yellow-1 mt-2.5 mb-[18px]'>{link.text}</h2>
              <p className='text-[15px] text-white-2 mb-[18px]'>{link.sub}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServicesMenu