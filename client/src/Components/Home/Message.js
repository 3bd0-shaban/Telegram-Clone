import moment from 'moment'
import React from 'react'
import { BsCheckAll } from 'react-icons/bs';
const Message = ({ message, friend }) => {
    return (
        <div className='pt-3 p-3'>
            {message?.msg &&
                <>
                    <div className={`flex ${friend ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded-2xl flex items-center max-w-md p-1 ${friend ? 'justify-start bg-white' : 'justify-end bg-[#E9F5E9] lg:mr-16'}`}>
                            <div>
                                <p className={friend? 'pt-1 pl-1' :'pt-1 pl-1 mr-0'}>{message?.msg}</p>
                                <div className={`text-[.8rem] font-medium flex gap-1 justify-end items-center ${friend ? 'text-blue-500' : 'text-[#86ce3a]'}`}>
                                    <p>{moment(message.createdAt).format('LT')}</p>
                                    <BsCheckAll size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {message?.image?.url &&
                <div className={`flex text-right ${friend ? 'justify-start' : 'justify-end'}`}>
                    <img src={message?.image?.url} className='max-w-[10rem] md:max-w-[15rem] rounded-xl' alt='' />
                </div>
            }
        </div>
    )
}

export default Message
