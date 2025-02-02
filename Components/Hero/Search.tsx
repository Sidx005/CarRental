import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col items-center gap-6 justify-center'>
        <h2 className='text-[20px] text-gray-400'>Let's search what you need</h2>
   <div className='flex justify-center items-center '>
    <div className="flex gap-5 rounded-md items-center divide-x bg-gray-100 p-3">
    <div>
        <input type="text" placeholder='Location' className="p-2 outline-none bg-transparent" id="" /></div>
    <div>
        <input className='bg-transparent' type="date" name="" id="" />
        </div>
   </div>
         </div>

    </div>
  )
}

export default Search