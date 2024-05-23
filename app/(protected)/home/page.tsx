import React from 'react'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import CandleChart from '@/components/CandleChart';

const HomePage = async () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <CandleChart symbol='BTCUSDT' />
      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <Button className='bg-gradient-to-r from-pink-600 to-red-400 text-white' type='submit'>Sign Out</Button>
      </form>
    </div>
  )
}

export default HomePage
