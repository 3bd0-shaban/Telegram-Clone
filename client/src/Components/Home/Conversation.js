import React, { useEffect, useRef, useState } from 'react'
import { BsEmojiSmile, BsMicFill } from 'react-icons/bs'
import { RiAttachment2 } from 'react-icons/ri'
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery, useNewMessageMutation } from '../../Redux/APIs/MessageApi'
import { useGetUserByIdQuery } from '../../Redux/APIs/UserApi'
import { useSocket, Message, Emoji } from '../Exports';
import { IoMdPaperPlane } from 'react-icons/io'
import { motion } from 'framer-motion';
import AnimDropdown from '../../Animation/AnimDropdown';
const Conversation = () => {
    const { username, id } = useParams();
    const { data: userById } = useGetUserByIdQuery(username) || {};
    const { data: FollowerMessages } = useGetMessagesQuery(id) || {};
    const [recievedmessage, setRecieved] = useState({});
    const [allmessages, setAllmessages] = useState([]);
    const [MewMessage] = useNewMessageMutation() || {};
    const [message, setmessage] = useState('');
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    const ScrollRef = useRef();
    const { socket } = useSocket();
    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        ScrollRef.current?.focus();
    }, [allmessages]);
    useEffect(() => {
        setAllmessages(FollowerMessages);
        socket?.on('MessagetoClient', ({ sender, receiver, createdAt, message }) => {
            console.log({ sender, receiver, createdAt, message });
            setRecieved({
                sender, receiver, createdAt, message
            });
        })
        // eslint-disable-next-line 
    }, [socket, FollowerMessages]);

    useEffect(() => {
        recievedmessage &&
            setAllmessages([...allmessages, recievedmessage]);
        // eslint-disable-next-line 
    }, [recievedmessage, setAllmessages]);

    const Newmessage = (e) => {
        e.preventDefault();
        const data = { message }
        MewMessage({ data, id }).unwrap()
            .then(payload => {
                setAllmessages([...allmessages, payload]);
                socket.emit("Message", {
                    sender: payload.sender,
                    message: payload.message,
                    createdAt: payload.createdAt,
                    receiver: userById?._id
                });
                setmessage('')
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className='pt-3 overflow-y-scroll hideScroll w-full h-full'>

                <div>
                    <div className='mb-24'>
                        {allmessages?.map((message, index) => (
                            <div ref={ScrollRef} key={index}>
                                <Message message={message} Patient={message?.sender === userById?._id} />
                            </div>
                        ))}
                    </div>
                    <form onSubmit={Newmessage} className='mb-3 py-5 xl:px-6 flex items-center w-full gap-5 mt-auto absolute bottom-0'>
                        <>
                            <div className='relative w-full'>
                                <input className='outline-none border rounded-full py-5 w-full px-12 placeholder:font-semibold'
                                    onChange={(e) => setmessage(e.target.value)}
                                    onFocus={() => setIsPikerVisable(false)}
                                    value={message}
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
                                            setContent={setmessage}
                                            content={message} />
                                    </motion.div>
                                }
                                <button className='px-4 text-gray-500 absolute inset-y-0 flex items-center right-0 text-2xl'><RiAttachment2 /></button>
                            </div>
                            {message ?
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
            </div>
        </>

    )
}

export default Conversation
