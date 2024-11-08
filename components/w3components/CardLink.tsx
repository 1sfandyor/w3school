import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link'
import React from 'react'

interface CardLinkProps extends LinkProps {
  children: React.ReactNode
  href: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'yellow' | 'pink' | 'blue' | 'gray'
  size?: 'default' | 'sm' | 'lg' | 'xl';
  className?: string;
};

const CardLink = ({
  children, 
  href,
  variant = 'default',
  size = 'default',
  className,
}: CardLinkProps) => {

  const baseStyles = cn(
    "font-medium transition-colors text-white-2",
    // Variant styles
    variant === 'primary' && "bg-emerald-600 hover:bg-emerald-700 text-white-2",
    variant === 'secondary' && "bg-gray-100 hover:bg-gray-200 text-gray-900",
    variant === 'dark' && "bg-gray-900 hover:bg-gray-800 text-white-2",
    variant === 'yellow' && "bg-yellow-100 hover:bg-yellow-200 text-yellow-900",
    variant === 'pink' && "bg-pink-100 hover:bg-pink-200 text-pink-900",
    variant === 'blue' && "bg-blue-500 hover:bg-blue-600 text-white-2",
    variant === 'gray' && "bg-black-2 hover:!text-white-2 hover:bg-darkGreen-2 !text-gray-2 hover:text-white-2",
    // Size styles
    size === 'sm' && "px-3 py-1.5 text-sm",
    size === 'default' && "mb-4 py-5 !w-full lt:w-[33.33333%] rounded-[5px]",
    size === 'lg' && "mt-1.5 mb-4 py-2 text-[18px] px-[25px]",
    size === 'xl' && "px-8 py-4 text-lg",
    className
  )


  return (
    <div className="flex px-2 w-full">
      <Link className={clsx(baseStyles, 'flex items-center justify-center text-center text-[15px] font-medium')} href={href}>
        {children}
      </Link>
    </div>
  )
};

export default CardLink