import React from 'react'
import { BsTelegram } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className='h-screen flex items-center text-center justify-center'>
      <div className='container max-w-[28rem]'>
        <div className='text-[9rem] md:text-[12rem] text-indigo-600 flex justify-center py-6'>
          <BsTelegram />
        </div>
        <div className='py-5'>
          <p className='text-2xl md:text-4xl font-bold text-gray-600'>Sign in to Telegram</p>
          <p className='text-base font-medium py-3 text-gray-500'>Please confirm your country and <br />
            enter your phone number.</p>
        </div>
        <div className='py-5 pt-3'>
          <div className='space-y-6'>
            <div className="relative">
              <input type="text" className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border
           border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label className="absolute text-md font-semibold text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10
           origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Country</label>
            </div>
            <div className="relative">
              <input type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border
           border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10
           origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Country</label>
            </div>
          </div>
          <div className='flex justify-start px-5 py-5 '>
            <input type='checkbox' className='duration-500 p-3' />
            <p className='px-6 text-lg font-medium flex items-center text-gray-500'>Keep me signed in</p>
          </div>
        </div>
        <button className='w-full uppercase text-white bg-indigo-500 font-bold text-xl py-4 rounded-xl hover:bg-indigo-600 focus:bg-indigo-700 duration-700'>Next</button>
        <div className='py-4 hover:bg-gray-100 rounded-xl my-2 duration-700'>
          <Link to='' className='uppercase text-lg text-indigo-600 mt-3 font-semibold'>Log in by qr code</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
