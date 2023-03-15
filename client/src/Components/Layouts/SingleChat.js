import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../Redux/Slices/UserSlice";

const SingleChat = ({ chat }) => {
    const [friendChat, setFriendChat] = useState({});
    const userInfo = useSelector(selectCurrentUser)
    const { id } = useParams();
    const [isChannel, setIsChannel] = useState(false);
    const [isGroup, setIsGroup] = useState(false);

    useEffect(() => {
        const friend = chat?.members?.find(p => p._id !== userInfo?._id);
        setFriendChat(friend);
    }, [chat, userInfo]);

    useEffect(() => {
        if (chat?.__t === 'Channel') {
            return setIsChannel(true)
        }
        if (chat?.__t === 'Group') {
            return setIsGroup(true)
        }
    }, [chat]);

    return (

        <Link to={isChannel ? `/channel/${chat?._id}` : isGroup ? `/group/${chat?._id}` : `/${friendChat?.username}/message/${chat?._id}`}
            draggable={false}
            // drag='x'
            // dragDirectionLock
            // dragConstraints={{ right: 0, left: 0 }}
            // dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            // whileTap={() => navigate(`/${friendChat?.username}/message/${chat?._id}`)}
            // dragElastic={0.5}
            className={`py-3 mx-2 flex justify-between px-3 rounded-xl hover:text-blue-500 hover:bg-gray-100 my-1
              ${(id === chat._id) && '!bg-blue-100 !text-blue-500'}`}>
            <div className='flex'>
                <div>
                    {(chat?.Icon?.url || friendChat?.avatar) ?
                        <div className="w-16 h-16 ">
                            <img className="rounded-full object-cover" src={(isChannel || isGroup) ? chat?.Icon?.url : friendChat?.avatar} alt='' />
                        </div> :
                        <span
                            className={`w-16 h-16 rounded-full text-2xl flex items-center justify-center text-white font-bold shadow-[.2px_.2px_3px_1px] shadow-[${chat.color}]`}
                            style={{ backgroundColor: `${chat?.color}` }}>
                            {
                                isChannel ? `${chat?.channelName?.charAt(0)}`
                                    : isGroup ? `${chat?.groupName?.charAt(0)}`
                                        : `${friendChat?.firstname?.charAt(0)} ${friendChat?.lastname?.charAt(0)}`
                            }
                        </span>
                    }
                </div>
                <div className='w-full px-3'>
                    <p className='font-[500] text-sm'>
                        {
                            isChannel ? `${chat?.channelName}`
                                : isGroup ? `${chat?.groupName}`
                                    : `${friendChat?.firstname} ${friendChat?.lastname}`
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