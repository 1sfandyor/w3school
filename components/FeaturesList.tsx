import React from 'react'
import Image from 'next/image'
import CheckIcon from "@/public/check.svg"
import { FeaturesProps } from '@/types'

const FeatureItems = ({ title, id }: FeaturesProps) => {
  return (
    <li key={id} className="flex items-center text-lg text-white-1 nlts:text-xl">
      <Image alt='check' className='mr-3.5' height={20} src={CheckIcon} width={20} />
      {title}
    </li>
  )
}

export default FeatureItems