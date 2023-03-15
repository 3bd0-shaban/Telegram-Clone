import React from 'react'
import { BiChevronsLeft } from 'react-icons/bi'
import {
  BsBell, BsEasel2, BsFolder, BsInfoCircle, BsPen,
  BsDatabaseAdd, BsEmojiSmile, BsLock, BsThreeDotsVertical, BsGear, BsTelephone
} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { IoLanguageOutline } from 'react-icons/io5';
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimSlideLeft from '../../Animation/AnimSlideLeft';
import LogOut from './LogOut';
import { selectCurrentUser } from './../../Redux/Slices/UserSlice';

const WindowSettings = () => {
  const { isLogout } = useSelector(state => state.Features);
  const userInfo = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const CartInfo = ({ Icon, Title, Value }) => {
    return (
      <div className='flex gap-3 items-center rounded-lg hover:bg-gray-100 cursor-pointer px-3 py-2'>
        <span className='text-gray-500'>{Icon}</span>
        <div>
          <h3>{Value}</h3>
          <p className='text-sm text-gray-400'>{Title}</p>
        </div>
      </div>
    )
  }

  const CartSettingTitle = ({ Icon, Title, Value }) => {
    return (
      <div className='flex gap-3 items-center rounded-lg hover:bg-gray-100 cursor-pointer px-3 py-2'>
        <span className='text-gray-500'>{Icon}</span>
        <p className='text-sm text-gray-700 font-medium'>{Title}</p>
      </div>
    )
  }
  return (
    <>
      <motion.div
        variants={AnimSlideLeft}
        initial='initial'
        animate='animate'
        exit='exit'
        className='border-r h-screen select-none'>
        <div className='p-2 flex justify-between gap-1 items-center text-gray-700 w-full relative'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => {
                dispatch(FeaturesAction.setIsSettingsWin(true));
                dispatch(FeaturesAction.setIsSideBarChats(false));
              }}
            >
              <BiChevronsLeft size={20} />
            </button>
            <h3 className='text-lg font-medium'>Settings</h3>
          </div>
          <div className='flex items-center gap-2'>
            <BsPen size={15} />
            <button
              onClick={() => dispatch(FeaturesAction.setIsLogout(true))}
              className='relative rounded-full p-3 hover:bg-gray-100 focus:bg-gray-200 duration-200'
            >
              <BsThreeDotsVertical size={20} />
            </button>

            {isLogout && <LogOut />}
          </div>

        </div><hr />
        <div className='select-none'>
          <div className='relative'>
            <img draggable={false} src={userInfo?.avatar[0]?.url} className='h-72 object-cover w-full' alt='' />
            <div className='absolute px-5 bottom-5 text-white font-medium'>
              <h4>{`${userInfo?.firstname} ${userInfo?.lastname}`}</h4>
              <p className='text-sm text-gray-400'>Online</p>
            </div>
          </div>
          <div className='p-5 px-2'>
            <CartInfo Icon={<BsTelephone size={25} />} Value={userInfo?.email} Title='Email' />
            <CartInfo Icon={<p className='font-semibold text-3xl'>@</p>} Value={userInfo?.username} Title='Username' />
            <CartInfo Icon={<BsInfoCircle size={25} />} Value={userInfo?.bio || ' '} Title='BIO' />
          </div>
        </div><hr />
        <div className='p-3 select-none'>
          <CartSettingTitle Icon={<BsBell size={25} />} Title='Notoification And Sounds' />
          <CartSettingTitle Icon={<BsDatabaseAdd size={25} />} Title='Data And Storage' />
          <CartSettingTitle Icon={<BsLock size={25} />} Title='Privacy And Security' />
          <CartSettingTitle Icon={<BsGear size={25} />} Title='General Settings' />
          <CartSettingTitle Icon={<BsFolder size={25} />} Title='Chat Folder' />
          <CartSettingTitle Icon={<BsEmojiSmile size={25} />} Title='Stikers And Emoji' />
          <CartSettingTitle Icon={<BsEasel2 size={25} />} Title='Devices' />
          <CartSettingTitle Icon={<IoLanguageOutline size={25} />} Title='Languages' />
        </div>
      </motion.div>
    </>
  )
}

export default WindowSettings
