"use server";
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 14);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "email already in use" }
  }

  await db.user.create({ data: { name, email, password: hashedPassword } })

  return { success: "User Created" }

}
