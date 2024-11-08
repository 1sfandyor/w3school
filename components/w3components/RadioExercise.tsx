'use client'
import React from 'react'
import Paper from '@/components/w3components/Paper'
import W3Button from './button'
import clsx from 'clsx'
import { monospace, segeo, sourceSansPro } from '@/config/fonts'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form'



interface RadioExerciseProps{
  task: string  
  link: string
  test: string[]
}

const RadioExercise = ({task, test}: RadioExerciseProps) => {

  const FormSchema = z.object({
    variant: z.enum(test as [string, ...string[]], {
      required_error: "Biror variantni tanlang.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return data;
  }

  return (
    <Paper>
      <div className="relative">
        <h2 className={clsx(segeo.variable, "!font-segoe text-[25px]")}>Mashq</h2>
        <div className="absolute inline-block cursor-pointer top-0 right-0 translate-x-full text-lg px-2.5 rounded-[15px] max-w-[240px] z-10 bg-gray-10">?</div>
      </div>

      <span className={clsx(sourceSansPro.className, "text-lg")}>{task}</span>
      <br />

      <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  
                  {
                    test.map((item, index) => (
                      <FormItem key={index} className="flex relative cursor-pointer items-center text-start justify-start w-full max-w-[600px] bg-white-2/20 hover:bg-gray-9 mx-auto py-2 px-4 mb-1 rounded-[5px]">
                        <FormControl>
                          <RadioGroupItem value={item as string} />
                        </FormControl>
                        <FormLabel className={clsx(monospace.className, "inline-block cursor-pointer !my-0 ml-2 leading-5 sm:ml-[29px] !text-[15px]")}>
                          {item}
                        </FormLabel>
                      </FormItem>
                    ))
                  }

                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <W3Button className="text-[17px] font-medium" type='submit' variant="primary">
          Testga o&apos;tish »
        </W3Button>
        </form>
      </Form>
        
      
    </Paper>
  )
}

export default RadioExercise