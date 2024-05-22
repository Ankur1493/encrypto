import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';

const HomePage = async () => {
  const session = await auth();
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      {JSON.stringify(session)}
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