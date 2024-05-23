"use client"
import { useState } from 'react'
import CandleChart from '@/components/CandleChart';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const HomePage = () => {
  const [symbol, setSymbol] = useState("BTCUSDT")

  const handleValueChange = (value: string) => {
    setSymbol(value)
  };

  return (
    <div className='h-screen pb-[100px] flex flex-col justify-around items-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>{`${symbol} chart`}</h1>
        <div className='flex gap-5 items-center justify-center'>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] bg-gray-900  text-white rounded-lg">
              <SelectValue placeholder={symbol} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-gray-900 text-white rounded-lg cursor-pointer">
                <SelectLabel>Select a coin</SelectLabel>
                <SelectItem value="BTCUSDT">Bitcoin</SelectItem>
                <SelectItem value="ETHUSDT">Ethereum</SelectItem>
                <SelectItem value="SOLUSDT">Solana</SelectItem>
                <SelectItem value="XRPUSDT">XRP(Ripple)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>You can check out the last 30 days performance of your selected crypto</p>
        </div>
      </div>
      <CandleChart symbol={symbol} />
    </div>
  )
}

export default HomePage
