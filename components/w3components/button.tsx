import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"
import { sourceSansPro } from "@/config/fonts"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'yellow' | 'pink' | 'blue' | 'gray'
  size?: 'default' | 'sm' | 'lg' | 'xl'
  leftChevron?: boolean
  rightChevron?: boolean
  className?: string
}

export default function W3Button({
  href,
  variant = 'default',
  size = 'default',
  leftChevron,
  rightChevron,
  className,
  children,
  ...props
}: CustomButtonProps) {
  const baseStyles = cn(
    "font-medium transition-colors text-white-2",
    // Variant styles
    variant === 'primary' && "bg-emerald-600 hover:bg-emerald-700 text-white-2",
    variant === 'secondary' && "bg-gray-100 hover:bg-gray-200 text-gray-900",
    variant === 'dark' && "bg-gray-900 hover:bg-gray-800 text-white-2",
    variant === 'yellow' && "bg-yellow-100 hover:bg-yellow-200 text-yellow-900",
    variant === 'pink' && "bg-pink-100 hover:bg-pink-200 text-pink-900",
    variant === 'blue' && "bg-blue-500 hover:bg-blue-600 text-white-2",
    variant === 'gray' && "bg-black-2 hover:bg-gray-900 text-gray-900",
    // Size styles
    size === 'sm' && "px-3 py-1.5 text-sm",
    size === 'default' && "px-4 py-2",
    size === 'lg' && "mt-1.5 mb-4 py-2 text-[18px] px-[25px]",
    size === 'xl' && "px-8 py-4 text-lg",
    className
  )

  const content = (
    <>
      {leftChevron && <ChevronLeft className="mr-2 h-4 w-4" />}
      {children}
      {rightChevron && <ChevronRight className="ml-2 h-4 w-4" />}
    </>
  )

  if (href) {
    return (
      <Link className={clsx("inline-flex items-center rounded-md !text-white-2", baseStyles, sourceSansPro.className)} href={href}>
        {content}
      </Link>
    )
  }

  return (
    <Button className={clsx(baseStyles, sourceSansPro.className)} {...props}>
      {content}
    </Button>
  )
}