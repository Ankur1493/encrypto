import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "password is empty" })
})

export const RegisterSchema = z.object({
  name: z.string().min(4, { message: "minimum 4 characters required" }),
  email: z.string().email(),
  password: z.string().min(5, { message: "minimum 5 characters required" })
})
