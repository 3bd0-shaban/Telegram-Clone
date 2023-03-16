import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    BsBellSlash, BsCameraVideo, BsCheckCircle,
    BsLock, BsPersonAdd, BsTelephoneOutbound
} from 'react-icons/bs'
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { usePeer } from '../Exports';
const ChatDropdown = ({ isContact, userById }) => {
    const { callUser } = usePeer();

    const DropItem = ({ onClickEvent, Icon, Title, Toggle }) => {
        return (
            <Link
                to=''
                draggable={false}
                onClick={() => {
                    dispatch(FeaturesAction.setIsChatDropdown(true));

                    onClickEvent()
                }}
                className='flex gap-3 items-center justify-between px-3 rounded-lg hover:bg-gray-200 active:scale-95 duration-200'>
                <div className='flex gap-5 items-center py-2 duration-200 focus:px-1'>
                    <div className='text-[1.2rem]'>{Icon}</div>
                    <span className='whitespace-nowrap'>{Title}</span>
                </div>
                <div className='text-2xl'>{Toggle}</div>
            </Link>
        )
    }

    const dispatch = useDispatch();
    return (
        <>
            <div onClick={() => dispatch(FeaturesAction.setIsChatDropdown(false))} className="fixed inset-0 z-20"></div>
            <div className='absolute z-30 top-[4rem] right-2 shadow-gray-200 drop-shadow-lg
                 rounded-lg bg-[rgb(255,255,255,.9)] backdrop-blur-xl text-sm font-semibold p-2 w-[13rem]'>
                <DropItem Icon={<BsBellSlash />} Title={'Mute'} />
                <DropItem Icon={<BsTelephoneOutbound />} Title={'Call'} />
                <DropItem Icon={<BsCameraVideo />} Title={'Video Call'} onClickEvent={
                    () => {
                        callUser({ id: userById?._id, acceptorName: `${userById?.firstname} ${userById?.lastname}` })
                        dispatch(FeaturesAction.setIsVideo(true));
                        dispatch(FeaturesAction.setIsVideoModal(true));
                    }}
                />
                <DropItem Icon={<BsCheckCircle />} Title={'Select Messages'}
                    onClickEvent={() => {
                        dispatch(FeaturesAction.setIsSettingsWin(true));
                        dispatch(FeaturesAction.setIsSideBarChats(false));
                    }} />
                {!isContact && <DropItem Icon={<BsPersonAdd />} Title={'Add to contacts'}
                    onClickEvent={() => dispatch(FeaturesAction.setIsNewContact(true))}
                />}

                <DropItem Icon={<BsLock />} Title={'Block user'} />
                <div className='text-red-500'>
                    <DropItem Icon={<AiOutlineUsergroupDelete />} Title={'Delete Chat'} />
                </div>
            </div>
        </>
    )
}

export default ChatDropdown
