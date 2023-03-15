import React, { useState } from 'react'
import { motion } from 'framer-motion';
import AnimSlideLeft from './../../Animation/AnimSlideLeft';
import { UplaodIcon } from '../Exports';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice';


const CreateNewGroup = () => {
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    ChannelName: '',
    des: '',

  });
  const [icon, setIcon] = useState('');


  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const HandleNewChannel = () => {

  }

  return (
    <>
      <motion.div
        variants={AnimSlideLeft}
        initial='initial'
        animate='animate'
        exit='exit' className='border-r h-screen bg-white w-full'>
        <div className='py-5 pt-3 select-none'>
          <div className='flex gap-3 px-5 py-2'>
            <button className='text-gray-400'
              onClick={() => {
                dispatch(FeaturesAction.setIsCreateChannel(false));
                dispatch(FeaturesAction.setIsSideBarChats(true));
              }} ><BsArrowLeft size={25} /></button>
            <h3 className='text-lg font-medium'>New channel</h3>
          </div>
          <UplaodIcon setIcon={setIcon} icon={icon} />
          <div className='space-y-6 p-5'>
            <div className="relative">
              <input
                type="text"
                onChange={handleChange}
                value={inputs.ChannelName}
                name='firstname'
                autoComplete='off'
                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                className="floating-label">Channel Name</label>
            </div>
            <div className="relative">
              <input
                type="text"
                onChange={handleChange}
                value={inputs.des}
                name='lastname'
                autoComplete='off'
                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "

              />
              <label
                className="floating-label">Description ( optional )</label>
            </div>
            <p className='text-sm text-gray-400'>You can provide an optional description for your channel.</p>
          </div>
          <div className='absolute bottom-10 right-5'>
            <div className='relative'>
              <div
                onClick={HandleNewChannel}
                className='rounded-full w-14 h-14 flex justify-center cursor-pointer items-center bg-blue-500 text-white'>
                <BsArrowRight size={25} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CreateNewGroup
