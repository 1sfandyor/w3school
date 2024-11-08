import { cn } from '@/lib/utils'
import React from 'react'

interface HintProps {
  warning?: boolean,
  dangerous?: boolean,
  info?: boolean,
  succes?: boolean,
  children?: React.ReactNode,
  margin?: boolean;
}
const Hint = ({warning, dangerous, info, succes, children, margin}: HintProps) => {

  return (
    <div className={cn(
      warning && 'bg-yellow-1 text-black-1 p-4 slt:px-8 my-6',
      dangerous && 'bg-red-2',
      info && 'bg-blue-1',
      succes && 'bg-darkGreen-5 text-gray-2 py-8 px-4 slt:px-8',
      margin && '-mx-4 slt:-mr-8 slt:-ml-8'
    )}>
      {children}
    </div>
  )
}

export default Hint