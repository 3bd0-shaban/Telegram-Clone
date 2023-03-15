import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Redux/Slices/UserSlice';
const ChatContext = createContext({});

export const ChatProvider = ({ children, singleChat, id }) => {
    const [isChannel, setIsChannel] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [userById, setUserById] = useState({});
    const userInfo = useSelector(selectCurrentUser);

    useEffect(() => {
        if (singleChat?.__t === 'Channel') {
            return setIsChannel(true);
        }
        if (singleChat?.__t === 'Group') {
            return setIsGroup(true);
        } else {
            return setIsChat(true);
        }
    }, [singleChat]);


    useEffect(() => {
        const friend = singleChat?.members?.find(p => p._id !== userInfo?._id);
        setUserById(friend);
    }, [singleChat, userInfo, id]);

    return <ChatContext.Provider value={{ isChannel, isGroup, isChat, userById }}>
        {children}
    </ChatContext.Provider>
}
export const useChat = () => {
    const { isChannel, isGroup, isChat, userById } = useContext(ChatContext);
    return { isChannel, isGroup, isChat, userById };
};

export default ChatContext
