import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Redux/Slices/UserSlice';
import getSocket from '../Utils/SocketConnect';
const ChatContext = createContext({});

export const ChatProvider = ({ children, singleChat, id }) => {
    const [isChannel, setIsChannel] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [userById, setUserById] = useState({});
    const [isOnline, setIsOnline] = useState(false);

    const userInfo = useSelector(selectCurrentUser);
    const socket = getSocket();

    useEffect(() => {
        if (singleChat?.__t === 'Channel') {
            setIsChannel(true);
            setIsGroup(false);
            setIsChat(false);
            return
        }
        if (singleChat?.__t === 'Group') {
            setIsChannel(false);
            setIsGroup(true);
            setIsChat(false);
            return
        } else {
            setIsChannel(false);
            setIsGroup(false);
            setIsChat(true);
            return
        }
    }, [singleChat]);


    useEffect(() => {
        const friend = singleChat?.members?.find(p => p._id !== userInfo?._id);
        setUserById(friend);
    }, [singleChat, userInfo, id]);

    useEffect(() => {
        socket?.on("getusers", (data) => {
            const online = data?.some(user => user.userId === userById?._id)
            if (online) {
                return setIsOnline(true)
            }
            setIsOnline(false)
        });
    }, [socket, userById, id])


    return <ChatContext.Provider value={{ isChannel, isGroup, isChat, userById, isOnline }}>
        {children}
    </ChatContext.Provider>
}
export const useChat = () => {
    const { isChannel, isGroup, isChat, userById, isOnline } = useContext(ChatContext);
    return { isChannel, isGroup, isChat, userById, isOnline };
};

export default ChatContext
