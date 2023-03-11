import React from 'react'
import { useState } from 'react';

const FriendCart = () => {
    const [mute, setMute] = useState(false)
    return (
        <div className='w-full rounded-xl border overflow-y-scroll h-[90vh] hideScroll'>
            <div className='relative'>
                <img className='h-96 w-full object-cover' src='https://res.cloudinary.com/abdo9/image/upload/v1676215069/Instegram/User/oynzrxgesqkpgjcpbzww.png' alt='' />
                <div className='absolute bottom-0 m-5 space-y-2 text-white'>
                    <p className='text-3xl'>Aubery Fisher</p>
                    <p className='text-sm'>Last Seen today at 13:05</p>
                </div>
            </div>
            <div className='p-5 space-y-5'>
                <div className='space-y-4 text-gray-600'>
                    <p className='text-blue-600 text-lg font-semibold'>Contact info</p>
                    <div>
                        <label className='font-medium text-gray-500'>Email Address</label>
                        <p>aubery.fisher@gmaiul.com</p>
                    </div>
                    <div>
                        <label className='font-medium text-gray-500'>Phone Number</label>
                        <p>(545) 544 2164</p>
                    </div>
                    <div>
                        <label className='font-medium text-gray-500'>Street Address</label>
                        <p>Jl Diponegoro No.21</p>
                    </div>
                    <div>
                        <label className='font-medium text-gray-500'>City</label>
                        <p>Cilacop</p>
                    </div>
                </div><hr />
                <div>
                    <p className='text-blue-600 text-lg py-3 font-semibold'>Attachment</p>
                    <div className='grid grid-cols-3 gap-4'>
                        <img className='h-28 w-full object-cover' src='https://res.cloudinary.com/abdo9/image/upload/v1676215069/Instegram/User/oynzrxgesqkpgjcpbzww.png' alt='' />
                        <img className='h-28 w-full object-cover' src='https://res.cloudinary.com/abdo9/image/upload/v1676215069/Instegram/User/oynzrxgesqkpgjcpbzww.png' alt='' />
                        <img className='h-28 w-full object-cover' src='https://res.cloudinary.com/abdo9/image/upload/v1676215069/Instegram/User/oynzrxgesqkpgjcpbzww.png' alt='' />
                    </div>
                </div><hr />
                <div className='space-y-3'>
                    <p className='text-blue-600 text-lg py-2 font-semibold'>Chat Settings</p>
                    <div className='flex justify-between'>
                        <span className='font-medium text-gray-500'>Mute</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={() => setMute(!mute)} type="checkbox" value="" class="sr-only peer" />
                            <div className={`rounded-full w-10 h-5 relative ${mute ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                <span className={`absolute w-5 h-5 bg-white rounded-full border ${mute ? 'right-0' : 'left-0'}`} />                                                            </div>
                        </label>
                    </div>
                    <button className='text-red-500'>Report Chat</button>
                </div>
            </div>
        </div>
    )
}

export default FriendCart
