import React from 'react'
import { Sidebar, ChatBox, useBreakpoint } from '../Components/Exports'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
const Home = () => {
  const userInfo = useSelector(selectCurrentUser)
  const [selected, setSelected] = useState(false);
  const { username, id } = useParams();
  const { MobileView } = useBreakpoint();

  useEffect(() => {
    if (id && username) {
      return setSelected(true)
    }
    setSelected(false)
  }, [id, username]);
  return (
    <>
      <div className='container px-0 max-w-[105rem] h-screen overflow-hidden md:border-r md:border-l md:shadow-sm '>
        <div className='grid grid-cols-4 h-full'>
          {(!MobileView || (!id)) &&
            <div className='col-span-4 lg:col-span-1 h-full'>
              <Sidebar userInfo={userInfo} />
            </div>
          }
          <div className={`col-span-3 h-full relative ${MobileView && '!col-span-4'}`}>
            {selected ?
              <ChatBox setSelected={setSelected} />
              :
              <img className='bg-repeat-space h-full absolute inset-x-0 object-cover' src='/Images/pattern.png' alt='' />
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Home
