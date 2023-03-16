import React, { useState } from 'react'
import { BsArrowRight, BsPen, BsTelephone, BsX } from 'react-icons/bs'
import { useChat } from '../../Context/ChatContext';
import { useNewContactMutation } from '../../Redux/APIs/ContactsApi';

const AddContact = ({ chat, setIsDetails }) => {
    const { isChannel, isGroup, userById } = useChat();
    const [NewContact, { isError, error }] = useNewContactMutation();
    const [firstname, setIsFirstname] = useState(userById?.firstname);
    const [lastname, setIsLastname] = useState('');
    const username = userById?.username
    const email = userById?.email

    const HandleNewContact = async () => {
        const contactId = userById?._id
        const data = { contactId, firstname, lastname, username, email }
        await NewContact(data).unwrap()
    }

    const CartInfo = ({ Icon, Title, Value }) => {
        return (
            <div className='flex gap-3 items-center rounded-lg hover:bg-gray-100 cursor-pointer px-3 py-2'>
                <span className='text-gray-500'>{Icon}</span>
                <div>
                    <p>{Title}</p>
                    <h3 className='text-sm text-gray-400'>{Value}</h3>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full h-full border-l select-none'>
            <div className='flex justify-between items-center p-5'>
                <div className='flex gap-3 items-center'>
                    <button
                        className='p-2 hover:bg-gray-100 active:scale-75 duration-300 rounded-full'
                        onClick={() => setIsDetails(false)}
                    >
                        <BsX size={25} />
                    </button>
                    <h3 className='text-lg font-medium text-gray-700'>Profile</h3>
                </div>
                <BsPen size={18} />
            </div>
            <div className='w-full'>
                <div className='mx-auto flex justify-center'>
                    {(chat?.Icon?.url || userById?.avatar) ?
                        <div className="w-32 h-32 ">
                            <img draggable={false} className="rounded-full object-cover" src={(isChannel || isGroup) ? chat?.Icon?.url : userById?.avatar} alt='' />
                        </div> :
                        <span
                            className={`w-32 h-32 rounded-full text-2xl flex items-center justify-center text-white font-bold shadow-[.2px_.2px_3px_1px] 
                            shadow-[${chat?.color}]`}
                            style={{ backgroundColor: `${chat?.color}` }}>
                            {
                                isChannel ? `${chat?.channelName?.charAt(0)}`
                                    : isGroup ? `${chat?.groupName?.charAt(0)}`
                                        : `${userById?.firstname?.charAt(0)} ${userById?.lastname?.charAt(0)}`
                            }
                        </span>
                    }
                </div>
                <div className='py-5'>
                    <p className='font-[500] text-lg flex justify-center'>
                        {
                            isChannel ? `${chat?.channelName}`
                                : isGroup ? `${chat?.groupName}`
                                    : `${userById?.firstname} ${userById?.lastname}`
                        }
                    </p>
                    <p className='text-gray-400 flex justify-center'>last seen recently</p>
                </div>
                <div className='px-5 pt-3'>
                    <div className='space-y-6'>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={(e) => setIsFirstname(e.target.value)}
                                defaultValue={userById?.firstname}
                                name='firstname'
                                autoComplete='off'
                                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                className="floating-label">First name (required)</label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={(e) => setIsLastname(e.target.value)}
                                defaultValue={userById?.lastname}
                                name='lastname'
                                autoComplete='off'
                                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "

                            />
                            <label
                                className="floating-label">Last name (optional)</label>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-10 right-5'>
                    <div className='relative'>
                        <div
                            onClick={HandleNewContact}
                            className='rounded-full w-14 h-14 flex justify-center cursor-pointer items-center bg-blue-500 text-white'>
                            <BsArrowRight size={25} />
                        </div>
                    </div>
                </div>
                <div className='p-5'>
                    <CartInfo Icon={<BsTelephone size={25} />} Value='Phone Number will be visiable once ... adds you as a contact' Title='Mobile Hidden' />
                </div>
                <div className='h-5 w-full bg-gray-100 shadow-inner shadow-gray-300'></div>
                {isError && <p className='text-sm text-red-500 font-bold p-5'> {error?.data?.msg}</p>}

            </div>
        </div>
    )
}

export default AddContact
