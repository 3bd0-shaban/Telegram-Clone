import React from 'react'
import { BsCheck2, BsCheck2All } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
      <div className='mt-20 overflow-y-auto h-screen'>
        <div className='px-3'>
          <Link to='#' className='py-3 flex justify-between px-3 rounded-xl duration-500 focus:bg-gray-300 hover:bg-gray-200'>
            <div className='flex gap-3'>
              <div className='w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>B G</div>
              <div>
                <p className='text-lg font-medium'>Derpy MAX3</p>
                <p className='text-sm font-'>Derpy MAX3</p>
              </div>
            </div>
            <div className='flex items-end gap-3 '>
              <BsCheck2All /><BsCheck2 />
              <p>WEB</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
