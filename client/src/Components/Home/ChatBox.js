import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../../Redux/APIs/UserApi'
import { CoversationCTRL, Emoji, InfinteScrollableChat, MainVideo, usePeer } from '../Exports'
import { useNewMessageMutation } from '../../Redux/APIs/MessageApi'
import { motion } from 'framer-motion';
import AnimDropdown from '../../Animation/AnimDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../Redux/Slices/UserSlice'
import { Scrolldown } from '../../Helpers/Scroll'
import { BsBellSlash, BsEmojiSmile, BsMicFill } from 'react-icons/bs';
import { IoMdPaperPlane } from 'react-icons/io'
import { RiAttachment2 } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'
import { RxDotsVertical } from 'react-icons/rx';
import { BiChevronLeft } from 'react-icons/bi'
import getSocket from '../../Utils/SocketConnect'
import { IoVideocamOutline } from 'react-icons/io5'
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { MdOutlineCallEnd } from 'react-icons/md';
const ChatBox = ({ setSelected }) => {
    Scrolldown();
    const { username, id } = useParams();
    const { data: userById, error } = useGetUserByIdQuery(username) || {};
    const [MewMessage, { isLoading }] = useNewMessageMutation() || {};
    const { callUser, isVideoCalling, answerCall } = usePeer();
    const [msg, setMSG] = useState('');
    const [image, setImage] = useState();
    const [details, setDetails] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const userInfo = useSelector(selectCurrentUser);
    // const { isVideo } = useSelector(state => state.Features);
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    const dispatch = useDispatch();
    const socket = getSocket();
    useEffect(() => {
        socket?.on("getusers", (data) => {
            const online = data?.some(user => user.userId === userById?._id)
            online && setIsOnline(true)
        });
    }, [socket, userById, id])

    const NewMSG = (e) => {
        if (!image) {
            e.preventDefault();
        }
        if (!msg && !image) return;
        const data = { msg, image }
        MewMessage({ data, id }).unwrap()
            .then(payload => {
                setMSG('')
                setImage('')
                setIsPikerVisable(false)
                socket.emit("typing", { receiver: userById._id, sender: userInfo._id, status: false, chatId: id });
                socket.emit("Message", {
                    sender: payload.sender,
                    msg: payload.msg,
                    createdAt: payload.createdAt,
                    image: payload.image,
                    chatId: payload.chatId,
                    receiver: userById?._id
                });
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (image) {
            NewMSG()
        }
        // eslint-disable-next-line 
    }, [image]);
    return (
        details ? <CoversationCTRL userById={userById} setDetails={setDetails} details={details} id={id} setSelected={setSelected} /> :
            <div className='h-full w-full'>
                <div className='absolute top-0 bg-white w-full flex border-b justify-between'>
                    <div className='w-full h-full'>
                        {isVideoCalling && <MainVideo userById={userById} />}
                        <div className='w-full flex py-1 justify-between items-center px-2 lg:px-5'>
                            <div className='flex gap-3 items-center'>
                                <div className='flex gap-2 items-center'>
                                    <Link to='/' onClick={() => setSelected(false)} className='block lg:hidden'><BiChevronLeft size={30} /></Link>
                                    <div className='w-12 h-12 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>V L</div>
                                </div>
                                <div>
                                    <p className='lg:text-lg text-gray-600 font-semibold'>{`${userById?.firstname} ${userById?.lastname}`}</p>
                                    {isOnline && <div className='font-light text-sm text-gray-400 flex items-end gap-1'>
                                        <p>Active Now</p>
                                        <span className='w-2 h-2 mb-0.5 bg-green-500 rounded-full'></span>
                                    </div>}
                                </div>
                            </div>
                            <div className='flex gap-5 text-2xl'>
                                <button
                                    onClick={() => {
                                        callUser({ id: userById?._id, acceptorName: `${userById?.firstname} ${userById?.lastname}` })
                                        dispatch(FeaturesAction.setIsVideo(true));
                                        dispatch(FeaturesAction.setIsVideoModal(true));
                                    }}
                                >
                                    <IoVideocamOutline />
                                </button>
                                <button onClick={answerCall}><MdOutlineCallEnd size={25} /></button>

                                <BsBellSlash />
                                <FiSearch />
                                <RxDotsVertical />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full'
                    style={{ backgroundImage: 'url("/Images/pattern.png")' }}
                >
                    <>
                        <InfinteScrollableChat userById={userById} id={id} image={image} isLoading={isLoading} />

                        {/* {isTyping && <p className='mx-3'>typing ....</p>} */}
                        {!(error?.status === 400) ?

                            <div className='absolute bottom-8  inset-x-0'>
                                <form onSubmit={NewMSG} className='container max-w-3xl flex items-center  gap-3 justify-center'>
                                    <>
                                        <div className='relative w-full'>
                                            <input className='outline-none border rounded-full py-5 w-full px-12 placeholder:font-semibold'
                                                onChange={(e) => setMSG(e.target.value)}
                                                onFocus={() => setIsPikerVisable(false)}
                                                value={msg}
                                                autoComplete='off'
                                                placeholder='Message ...'
                                            />

                                            <button
                                                type='button'
                                                onClick={() => setIsPikerVisable(!isPikerVisiable)}
                                                className='px-4 text-gray-500 absolute inset-y-0 flex items-center left-0 text-2xl'>
                                                <BsEmojiSmile />
                                            </button>
                                            {isPikerVisiable &&
                                                <motion.div
                                                    variants={AnimDropdown}
                                                    initial='initial'
                                                    animate='animated'
                                                    exit='exit'
                                                    className='absolute z-10 bottom-[4.5rem]'>
                                                    <Emoji
                                                        setContent={setMSG}
                                                        content={msg} />
                                                </motion.div>
                                            }
                                            <button className='px-4 text-gray-500 absolute inset-y-0 flex items-center right-0 text-2xl'>
                                                <RiAttachment2 />
                                            </button>
                                        </div>
                                        {msg ?
                                            <button className='text-white text-2xl bg-blue-500 rounded-full flex items-center cursor-pointer justify-center p-4'>
                                                <IoMdPaperPlane />
                                            </button>
                                            :
                                            <button className='text-white text-2xl bg-blue-500 rounded-full flex items-center justify-center p-4'>
                                                <BsMicFill />
                                            </button>
                                        }
                                    </>
                                </form>
                            </div>
                            :
                            <p className='w-full text-center text-lg -mb-10'>Not accessed</p>
                        }
                    </>
                </div>
            </div>
    )
}

export default ChatBox
