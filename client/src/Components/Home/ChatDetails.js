import React from 'react'
import { BsLink45Deg, BsPen, BsX } from 'react-icons/bs'
import { useChat } from '../../Context/ChatContext';

const ChatDetails = ({ chat, totalMembers, setIsDetails, members }) => {
    const { isChannel, isGroup, isChat, userById } = useChat();
    const CartInfo = ({ Icon, Title, Value }) => {
        return (
            <div className='flex gap-3 items-center rounded-lg hover:bg-gray-100 cursor-pointer px-3 py-2'>
                <span className='text-sm text-gray-500'>{Icon}</span>
                <div>
                    <h3>{Value}</h3>
                    <p className='text-sm text-gray-400'>{Title}</p>
                </div>
            </div>
        )
    }
    const CantactCart = ({ contact }) => {
        return (
            <div key={contact._id} className='flex gap-5 items-center'>
                <div className='flex gap-2 items-center'>
                    <img className='w-12 h-12 ' src={process.env.REACT_APP_DefaultIcon} alt='' />
                    <div>
                        <h2 className='font-medium '>{`${contact.firstname} ${contact.lastname}`}</h2>
                        <p className='text-gray-400 text-sm'>{contact.lastseen || 'last seen recently'}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full h-full border-l select-none col-span-2 lg:col-span-1 fixed md:static top-0 right-0 bg-white'>
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
                            <img draggable={false} className="rounded-full object-cover" src={(isChannel || isGroup) ? chat?.Icon?.url : isChat && userById?.avatar[0]?.url} alt='' />
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
                    {(isChannel || isGroup) && <p className='text-sm flex justify-center text-gray-400'>{`${totalMembers} ${isGroup ? 'member' : 'subscriber'}`}</p>}
                    {isChat && <p className='text-gray-400 flex justify-center'>last seen recently</p>}
                </div>
                <div className='p-5'>
                    {(isGroup || isChannel) && <CartInfo Icon={<BsLink45Deg size={25} />} Value={`/group/${chat?._id}`} Title='Link' />}
                    {/* <CartInfo Icon={<p className='font-semibold text-3xl'>@</p>} Value={userById?.username} Title='Username' /> */}
                    {isChat &&
                        <>
                            <CartInfo Icon={<BsLink45Deg size={25} />} Value={userById?.email} Title='Email' />
                            <CartInfo Icon={<p className='font-semibold text-3xl'>@</p>} Value={userById?.username} Title='Username' />
                        </>
                    }
                </div>
                <div className='h-5 w-full bg-gray-100 shadow-inner shadow-gray-300'></div>
                <div className='space-y-5'>
                    {members?.map(contact => (
                        <CantactCart contact={contact} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatDetails
