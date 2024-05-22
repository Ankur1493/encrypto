"use client"

import { ReactNode } from "react"
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Chrome, ArrowUpRight } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})


interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref }
  : CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-fuchsia-100 flex flex-col justify-center items-center">
      <CardHeader>
        <h1 className={cn("text-3xl font-semibold text-center", font.className)}>
          {headerLabel}
        </h1>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter >
        <div className="w-full flex justify-between items-center border border-black px-10 py-2 rounded-lg bg-black text-white cursor-pointer gap-3">
          <div>
            continue with google
          </div>
          <Chrome color="white" />
        </div>
      </CardFooter>
      <CardFooter>
        <Link href={backButtonHref} className="flex w-full text-gray-700 gap-2">
          {backButtonLabel}
          <ArrowUpRight color="gray" />
        </Link>
      </CardFooter>
    </Card>
  )
}

