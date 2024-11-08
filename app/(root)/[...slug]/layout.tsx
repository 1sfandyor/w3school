'use client'
import React from 'react'
import Aside from '@/components/w3components/Aside'
import Sidebar from '@/components/w3components/sidebar'
import LayoutInner from './_component/LayoutInner'
import { verdana } from "@/config/fonts";
import clsx from 'clsx'
import Navigation from '@/components/Navigation'
import TrackAd from '@/components/w3components/TrackAd'
interface Params {
  slug: string
}
const InnerLayout = ({params, children}: {params: Promise<Params>, children: React.ReactNode}) => {
  const resolvedParams = React.use(params)
  
  return (
    <>
      <div className="w-full flex flex-col slp:flex-row text-[15px] bg-darkGreen-1 text-gray-2">
        <Sidebar/>
        <div className={clsx('slp:ml-[250px] min-w-[320px] slt:px-8 pb-8 slp:pl-8 text-[20px] p-4 w-full',verdana.className)}>
          <LayoutInner params={resolvedParams}/>
          {children}
          <Navigation slug={resolvedParams.slug[resolvedParams.slug.length - 1]} 
          technology={resolvedParams.slug[0]} />
          <TrackAd/>
        </div>
        <Aside/>
      </div>

      <div className="border-t border-black-2 py-8 bg-darkGreen-1 h-20"></div>
    </>

    
  )
}

export default InnerLayout