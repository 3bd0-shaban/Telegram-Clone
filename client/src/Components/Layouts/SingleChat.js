import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useChat } from "../../Context/ChatContext";

const SingleChat = ({ chat }) => {
    const { id } = useParams();
    const { isChannel, isGroup, userById } = useChat();


    return (

        <Link to={isChannel ? `/channel/${chat?._id}` : isGroup ? `/group/${chat?._id}` : `/${userById?.username}/message/${chat?._id}`}
            draggable={false}
            // drag='x'
            // dragDirectionLock
            // dragConstraints={{ right: 0, left: 0 }}
            // dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            // whileTap={() => navigate(`/${userById?.username}/message/${chat?._id}`)}
            // dragElastic={0.5}
            className={`py-3 mx-2 flex justify-between px-3 rounded-xl hover:text-blue-500 hover:bg-gray-100 my-1
              ${(id === chat._id) && '!bg-blue-100 !text-blue-500'}`}>
            <div className='flex'>
                <div>
                    {(chat?.Icon?.url || userById?.avatar) ?
                        <div className="w-16 h-16 ">
                            <img className="rounded-full object-cover" src={(isChannel || isGroup) ? chat?.Icon?.url : userById?.avatar[0]?.url} alt='' />
                        </div> :
                        <span
                            className={`w-16 h-16 rounded-full text-2xl flex items-center justify-center text-white font-bold shadow-[.2px_.2px_3px_1px] shadow-[#7c2d12]`}
                            style={{
                                backgroundColor: `${chat?.color}`,
                                '--tw-shadow-color': ` ${chat?.color}`,
                                '--tw-shadow': 'var(--tw-shadow-colored)',
                                boxShadow: 'var(--tw-shadow)'
                            }}>
                            {
                                isChannel ? `${chat?.channelName?.charAt(0)}`
                                    : isGroup ? `${chat?.groupName?.charAt(0)}`
                                        : `${userById?.firstname?.charAt(0)} ${userById?.lastname?.charAt(0)}`
                            }
                        </span>
                    }
                </div>
                <div className='w-full px-3'>
                    <p className='font-[500] text-sm'>
                        {
                            isChannel ? `${chat?.channelName}`
                                : isGroup ? `${chat?.groupName}`
                                    : `${userById?.firstname} ${userById?.lastname}`
                        }
                    </p>
                    <p className='text-xs text-gray-400 ellipse-2'>{chat?.lastMSG}</p>
                </div>
            </div>
            <p className="whitespace-nowrap">{moment(chat?.updatedAt).format('LT')}</p>
        </Link>
    )
}
export default SingleChat