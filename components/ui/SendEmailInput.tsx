'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const emailSchema = z.string().email('Invalid email address')

export default function SendEmailInput({ buttonText, placeholder, formClassName}: { buttonText?: string, placeholder?: string, formClassName?: string }) {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      emailSchema.parse(email)
      // Here you would typically send the email to your server
      toast({
        title: "Success!",
        description: "Your email has been submitted.",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error",
          description: error.errors[0].message,
          variant: "destructive",
        })
      }
    }
  }

  return (
    <form className={`w-full max-w-md h-[46px] mt-[28px] ${formClassName}`} onSubmit={handleSubmit}>
      <div className="flex w-full rounded-l-md rounded-r-md text-white-2 overflow-hidden bg-white-4 shadow-sm">
        <Input
          required
          className="flex-1 h-full p-2.5 placeholder:text-white-2 placeholder:font-normal placeholder:text-lg text-lg text-white-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={placeholder}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="px-6 w-1/2 py-3 h-full rounded-r-md bg-emerald-500 text-white-2 font-normal hover:bg-green-1 text-lg transition-colors rounded-none"
          type="submit"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  )
}