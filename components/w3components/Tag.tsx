import { consolas } from '@/config/fonts'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import React from 'react'

const Tag = ({children, size, e1, e2}: {children: string, size?: 'lg', e1?: string, e2?: string}) => {
  const baseStyles = cn(
    size === 'lg' && "mt-1.5 p-2.5 mb-2.5 text-xl",
  )

  if(size === 'lg') {
    return (
      <div className={baseStyles}>
        <code className={clsx(consolas.className,'text-red-2')} style={{fontFamily: 'Consolas, Menlo, "courier-new"'}}>
          <span className="text-green-5">{'<'}</span>
            {e1}
          <span className="text-green-5">{'> '}</span>
        </code>

          {children}

        <code className={clsx(consolas.className, 'text-red-2')} style={{fontFamily: 'Consolas, Menlo, "courier-new"'}}>
          <span className="text-green-5">{' <'}</span>
            {e2}
          <span className="text-green-5">{'/>'}</span>
        </code>

      </div>
    )
  }

  return (
    <code className={clsx(consolas.className, 'bg-gray-11/10 text-red-2 text-[15.75px] px-1')} style={{fontFamily: 'Consolas, Menlo, "courier-new"'}}>
      {children}
    </code>
  )
}

export default Tag