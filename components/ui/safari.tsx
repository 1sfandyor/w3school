"use client";
import React, { useState } from 'react'
import Image from 'next/image'

const Safari = ({className, children, tabs, frontImg, backImg, url}: {className?: string, children?: React.ReactNode, tabs?: boolean, frontImg?: string, backImg?: string, url?: string}) => {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");
  
  return (
    <div className={`bg-white-3 w-full rounded-md ${className}`}>
      {/* Safari header */}
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center gap-0.5'>
          <span className='w-3 h-3 rounded-full bg-red-1'/>
          <span className='w-3 h-3 rounded-full bg-yellow-2'/>
          <span className='w-3 h-3 rounded-full bg-green-4'/>
        </div>
        <div className='flex items-center justify-center w-full mx-auto'>
          <span className='text-sm bg-white-2 text-gray-3 w-[76%] self-center justify-self-center px-[5px] mx-2 rounded-md'>
            {url}
          </span>
        </div>
      </div>
      
      {
        tabs && (
          <div className='flex items-center'>
            <button className={`flex text-[17px] rounded-none py-2 px-4 
              ${activeTab === "frontend" 
                ? "bg-black-2 text-gray-2 hover:opacity-80" 
                : "text-black-2 bg-gray-1"}`} 
              onClick={() => setActiveTab("frontend")}>
              Frontend
            </button>
            <button className={`flex text-[17px] rounded-none py-2 px-4 
              ${activeTab === "backend" 
                ? "bg-black-2 text-gray-2 hover:opacity-80" 
                : "text-black-2 bg-gray-1"} `} 
              onClick={() => setActiveTab("backend")}>
              Backend
            </button>
          </div>
        )
      }

      <div className='flex items-center justify-center w-full '>
        {/* safari content */}
        {
          children ? children : (
            <Image 
              unoptimized 
              alt='safari' 
              className='object-cover w-full h-full' 
              height={1000} 
              loading='lazy' 
              src={activeTab === "frontend" ? frontImg || '' : backImg || ''} 
              width={100}
            /> 
          )
        }
      </div>

    </div>
  )
}

export default Safari