import React from 'react'
import { Sidebar, ChatBox, useBreakpoint, WindowSettings, CreateNewChannel, CreateNewGroup, SelectContacts, ChatDetails, AddContact } from '../Components/Exports'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
import { AnimatePresence } from 'framer-motion';
import { ChatProvider } from '../Context/ChatContext';
import { useSingleChatQuery } from '../Redux/APIs/ChatApi';
const Home = () => {
  const userInfo = useSelector(selectCurrentUser)
  const [selected, setSelected] = useState(false);
  const { username, id } = useParams();
  const { MobileView } = useBreakpoint();
  const [isDetails, setIsDetails] = useState(false);
  const [skip, setSkip] = useState(true);
  const { isSettingsWin, isSideBarChats, isCreateChannel, isCreateGroup, isSelectContact, isNewContact } = useSelector(state => state.Features);
  useEffect(() => {
    if (id) {
      setSkip(false)
    }
  }, [id]);
  const { data } = useSingleChatQuery(id, { skip });
  useEffect(() => {
    if (id) {
      return setSelected(true)
    }
    setSelected(false)
  }, [id, username]);
  return (
    <>
      <div className='container px-0 max-w-[105rem] h-screen overflow-hidden md:border-r md:border-l md:shadow-sm '>
        <div className='grid grid-cols-4 h-full overflow-hidden'>
          {(!MobileView || (!id)) &&
            <div className='col-span-4 lg:col-span-1 h-full'>
              {isSideBarChats &&
                <Sidebar userInfo={userInfo} />

              }
              <AnimatePresence >
                {isSettingsWin &&
                  <ChatProvider singleChat={data?.singleChat} id={id}>
                    <WindowSettings />
                  </ChatProvider>}
              </AnimatePresence>

              <AnimatePresence>
                {isCreateChannel && <CreateNewChannel />}
              </AnimatePresence>

              {isCreateGroup && <CreateNewGroup />}
              {isSelectContact && <SelectContacts />}

            </div>
          }
          <div className={`col-span-3 h-full duration-300 relative ${MobileView && '!col-span-4'} ${(isDetails || isNewContact) && '!col-span-2'}`}>
            {selected ?
              <ChatProvider singleChat={data?.singleChat} id={id}>
                <ChatBox setSelected={setSelected} setIsDetails={setIsDetails} isDetails={isDetails} data={data} userInfo={userInfo} id={id} />
              </ChatProvider>

              :
              <img draggable={false} className='bg-repeat-space h-full absolute inset-x-0 object-cover' src='/Images/pattern.png' alt='' />
            }
          </div>

          <ChatProvider singleChat={data?.singleChat} id={id}>
            {isDetails && <ChatDetails chat={data?.singleChat} setIsDetails={setIsDetails} />}
            {isNewContact && <AddContact chat={data?.singleChat} />}
          </ChatProvider>
        </div>
      </div>
    </>
  )
}

export default Home
