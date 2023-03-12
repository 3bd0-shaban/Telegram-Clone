import React from 'react'
import { BiChevronsLeft } from 'react-icons/bi'
import { BsPen, BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimSlideLeft from '../../Animation/AnimSlideLeft';

const WindowSettings = () => {
  const dispatch = useDispatch()
  return (
    <>
      <motion.div
        variants={AnimSlideLeft}
        initial='initial'
        animate='animate'
        exit='exit'
        className='border-r px-3 h-screen'>
        <div className='py-3 flex justify-between gap-1 items-center text-gray-700 w-full relative'>
          <div className='flex items-center gap-2'>
            <button onClick={() => dispatch(FeaturesAction.setIsSettingsWin(true))}><BiChevronsLeft size={20} /></button>
            <h3 className='text-lg font-medium'>Settings</h3>
          </div>
          <div className='flex items-center gap-2'>
            <BsPen size={15} />
            <BsThreeDotsVertical size={20} />
          </div>

        </div><hr />
      </motion.div>
    </>
  )
}

export default WindowSettings
