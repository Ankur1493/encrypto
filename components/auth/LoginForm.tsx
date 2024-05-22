"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schemas"

import { CardWrapper } from "./CardWrapper"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"

export const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const submitLogin = (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
  }

  return (
    <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account" backButtonHref="/auth/register">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitLogin)}
          className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input {...field} type="email" placeholder="ankursharma1493@gmail.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input {...field} type="password" placeholder="*****" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormError message="" />
          <Button type="submit" className="w-full bg-black text-white text-[20px]" variant={"secondary"}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
