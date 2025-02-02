import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='grid mt-10 grid-cols-1 md:grid-cols-2'>
        
        <div className="flex flex-col gap-5 ">
            <h1 className='text-3xl font-black'>Premium Car <br />Rental in your Area</h1>
       <p className='text-sm text-gray-600'>Book the selected car effortlessly,Pay for driving only,Book the Cars Now</p> 
       <button className='bg-gradient-to-bl w-32 from-blue-600 to-blue-500 text-white rounded-md p-2'>
     Explore Cars
        </button>
        </div>
        <div className=""><Image className='hover:scale-150 transition-all ease-in-out' alt='car' height={400} width={500} src={'/image.png'}/></div>
    </div>
  )
}

export default Hero