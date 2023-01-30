import React from 'react'
import { BsPen, BsTelegram } from 'react-icons/bs';
const ConfirmNumber = () => {
    return (
        <div className='h-screen flex items-center text-center justify-center'>
            <div className='container max-w-[28rem]'>
                <div className='text-[9rem] md:text-[12rem] text-indigo-600 flex justify-center py-6'>
                    <BsTelegram />
                </div>
                <div className='py-5'>
                    <div className='flex gap-4 items-center justify-center'>
                        <p className='text-2xl md:text-4xl font-bold text-gray-600'>+20 10 1507 6447</p>
                        <button><BsPen style={{ fontSize: '1.4rem' }} /></button>
                    </div>
                    <p className='text-base font-medium py-3 text-gray-500'>We have sent you a message in Telegram <br />
                        with the code.</p>
                </div>
                <div className='py-5 pt-3'>
                    <div className='space-y-6'>
                        <div className="relative">
                            <input type="text" className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="absolute text-md font-semibold text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Code</label>
                        </div>
                    </div>
                </div>
                <button className='w-full uppercase text-white bg-indigo-500 font-bold text-xl py-4 rounded-xl hover:bg-indigo-600 focus:bg-indigo-700 duration-700'>confirm</button>
            </div>
        </div>
    )
}

export default ConfirmNumber
