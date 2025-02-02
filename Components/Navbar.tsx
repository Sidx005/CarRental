import { UserButton } from '@clerk/nextjs'
import React from 'react'

export const Navbar = () => {
  return (
   <div className='flex shadow-md p-3 items-center border-b-2 justify-between'>
     <div className='bg-gradient-to-tr from-blue-500 to-yellow-500 bg-clip-text text-transparent text-5xl  '>Rentals</div>
  <div className='hidden  md:flex gap-5'>
    <h2 className='px-3 p-2 rounded-full hover:text-blue-500  transition-all ease-in-out cursor-pointer' title='Home'>Home</h2>
    <h2 className='px-3 p-2 rounded-full hover:text-blue-500  transition-all ease-in-out cursor-pointer' title='History'>History</h2>
    <h2 className='px-3 p-2 rounded-full hover:text-blue-500  transition-all ease-in-out cursor-pointer' title='Contact'>Contact Us</h2>
  </div>
  <UserButton/>
  </div>
  
)

}
