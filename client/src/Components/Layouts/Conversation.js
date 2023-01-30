import React from 'react'
import { BsEmojiSmile, BsMicFill } from 'react-icons/bs'
import { RiAttachment2 } from 'react-icons/ri'

const Conversation = () => {
    return (
        <div className='fixed bottom-0 left-[45%] flex gap-6 mb-8'>
            <div className='relative'>
                <input className='outline-none rounded-3xl py-5 w-[44rem] px-12 placeholder:font-semibold' placeholder='Message' />
                <div className='px-3 text-gray-600 absolute inset-y-0 flex items-center left-0 text-2xl'><BsEmojiSmile /></div>
                <div className='px-3 text-gray-600 absolute inset-y-0 flex items-center right-0 text-2xl'><RiAttachment2 /></div>
            </div>
            <div className='text-white text-2xl bg-blue-500 rounded-full flex items-center justify-center p-4 px-5'><BsMicFill /></div>
        </div>
    )
}

export default Conversation
