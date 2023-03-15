import React from 'react'
import { Sidebar, ChatBox, useBreakpoint, WindowSettings, CreateNewChannel, CreateNewGroup, SelectContacts } from '../Components/Exports'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
import { AnimatePresence } from 'framer-motion';
const Home = () => {
  const userInfo = useSelector(selectCurrentUser)
  const [selected, setSelected] = useState(false);
  const { username, id } = useParams();
  const { MobileView } = useBreakpoint();
  const { isSettingsWin, isSideBarChats, isCreateChannel, isCreateGroup, isSelectContact } = useSelector(state => state.Features)
  useEffect(() => {
    if (id) {
      return setSelected(true)
    }
    setSelected(false)
  }, [id, username]);
  return (
    <>
      <div className='container px-0 max-w-[105rem] h-screen overflow- md:border-r md:border-l md:shadow-sm '>
        <div className='grid grid-cols-4 h-full overflow-'>
          {(!MobileView || (!id)) &&
            <div className='col-span-4 lg:col-span-1 h-full'>
              {isSideBarChats && <Sidebar userInfo={userInfo} />}
              <AnimatePresence>
                {isSettingsWin && <WindowSettings />}
              </AnimatePresence>
              <AnimatePresence>
                {isCreateChannel && <CreateNewChannel />}
              </AnimatePresence>

              {isCreateGroup && <CreateNewGroup />}
              {isSelectContact && <SelectContacts />}

            </div>
          }
          <div className={`col-span-3 h-full relative ${MobileView && '!col-span-4'}`}>
            {selected ?
              <ChatBox setSelected={setSelected} />
              :
              <img draggable={false} className='bg-repeat-space h-full absolute inset-x-0 object-cover' src='/Images/pattern.png' alt='' />
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Home
