"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { useState, useTransition } from "react"

import { CardWrapper } from "./CardWrapper"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"
import { register } from "@/actions/register"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const submitLogin = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data?.error ?? "");
        })
    });
  }

  return (
    <CardWrapper headerLabel="Join Now" backButtonLabel="Already a member" backButtonHref="/auth/login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitLogin)}
          className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input
                    className="bg-fuchsia-100 border-gray-400"
                    disabled={isPending}
                    {...field}
                    type="text"
                    placeholder="Ankur" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input
                    className="bg-fuchsia-100 border-gray-400"
                    disabled={isPending}
                    {...field}
                    type="email"
                    placeholder="ankursharma1493@gmail.com" />
                  </FormControl>
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
                  <FormControl><Input
                    className="bg-fuchsia-100 border-gray-400"
                    disabled={isPending}
                    {...field}
                    type="password"
                    placeholder="*****" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full bg-black text-white text-[20px]" variant={"secondary"}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
