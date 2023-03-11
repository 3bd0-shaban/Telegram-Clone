import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../Redux/Slices/UserSlice";

const SingleChat = ({ chat, username, SendPost }) => {
    const [friendChat, setFriendChat] = useState();
    const userInfo = useSelector(selectCurrentUser)
    useEffect(() => {
        const follower = chat?.members?.find(p => p._id !== userInfo?._id);
        setFriendChat(follower);
        // eslint-disable-next-line 
    }, []);

    return (

        <Link to={`/${friendChat?.username}/message/${chat?._id}`}
            className={`py-3 mx-2 flex justify-between px-3 rounded-xl hover:text-blue-500 hover:bg-blue-100
              ${(username === friendChat?.username) && '!bg-blue-100 !text-blue-500'}`}>
            <div className='flex'>
                <div>
                    <span className='w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>BG</span>
                </div>
                <div className='w-full px-3'>
                    <p className='font-[500] text-sm'>{`${friendChat?.firstname} ${friendChat?.lastname}`}</p>
                    <p className='text-xs text-gray-400 ellipse-2'>{chat?.lastMSG}</p>
                </div>
            </div>
            <p className="whitespace-nowrap">{moment(chat?.updatedAt).format('LT')}</p>
        </Link>
    )
}
export default SingleChat