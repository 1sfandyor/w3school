'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  workEmail: z.string().email("Please enter a valid work email"),
  role: z.string().min(1, "Please select your role"),
  learners: z.string().regex(/^\d+$/, "Please enter a valid number")
})

export default function JoinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      role: "",
      learners: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values)
    // Handle form submission
  }

  return (
    <div className="flex items-center justify-center py-[32px] nlp:px-[52px]">
      <Card className="w-full max-w-lg bg-white-5 backdrop-blur border border-white-2">
        <CardHeader className="text-black-1 nlp:px-[33px] px-[16px]">
          <h2 className="text-xl ">
            Sinfingizda w3school akademiyasidan foydalanishni hohlaysizmi ?
          </h2>
          <p className="text-lg font-thin">
            Formani to&apos;ldiring va demo video orqali batafsil ma&apos;lumot oling!{" "}
            <GraduationCap className="inline h-5 w-5" />
          </p>
        </CardHeader>
        <CardContent className="nlp:px-[33px] px-[16px]">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ism</FormLabel>
                      <FormControl>
                        <Input className="bg-white-2 border-white-2 text-gray-1 placeholder:text-gray-1" placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ishxona emaili</FormLabel>
                      <FormControl>
                        <Input className="bg-white-2 border-white-2 text-gray-1 placeholder:text-gray-1" placeholder="Email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kasbingiz</FormLabel>
                      <Select  defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl className="bg-white-2 border-white-2 text-black-2">
                          <SelectTrigger>
                            <SelectValue className="bg-white-2 border-white-2 text-black-2" placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white-2 border-white-2 text-black-1 ">
                          <SelectItem className="" value="teacher">O&apos;qituvchi</SelectItem>
                          <SelectItem className="" value="administrator">Maktab administratori</SelectItem>
                          <SelectItem className="" value="business">O&apos;quvchi</SelectItem>
                          <SelectItem className="" value="other">Biznes uchun</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="learners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>O&apos;quvchilar soni</FormLabel>
                      <FormControl>
                        <Input className="bg-white-2 border-white-2 text-gray-1 placeholder:text-gray-1" placeholder="Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-sm text-black-1">
                Formani to&apos;ldirish orqali bizning{" "}
                <Link className="text-primary hover:underline text-black-1" href="/terms">
                  Foydalanish shartlarimizga
                </Link>{" "}
                va{" "}
                <Link className="text-primary hover:underline text-black-1" href="/privacy">
                  Maxfiylik siyosati
                </Link>
                mizga rozilik bildirgan bo&apos;lasiz.
              </div>

              <Button className="flex justify-self-end self-end bg-emerald-600 hover:bg-emerald-700 text-white-2" type="submit" >
                Yuborish
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}