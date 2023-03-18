import React, { useState } from 'react'
import { motion } from 'framer-motion';
import AnimSlideLeft from './../../Animation/AnimSlideLeft';
import { UplaodIcon } from '../Exports';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice';
import { selectContacts } from './../../Redux/Slices/ContactsSlice';
import { useNewGroupMutation } from '../../Redux/APIs/GroupApi';
import { useNavigate } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';


const CreateNewGroup = () => {
  const dispatch = useDispatch()
  const [groupName, setIsGroupName] = useState('');
  const navigate = useNavigate();
  const [NewGroup, { isLoading, isError, error }] = useNewGroupMutation();
  const [icon, setIcon] = useState('');
  const members = useSelector(selectContacts);

  const HandleNewGroup = async () => {
    const data = { groupName, members, icon };
    await NewGroup(data).unwrap()
      .then((payload) => {
        navigate(`/group/${payload?._id}`);
        dispatch(FeaturesAction.setISCreateGroup(false));
        dispatch(FeaturesAction.setIsSideBarChats(true));
        setIcon('');
        setIsGroupName('')
      })
  }
  const CantactCart = ({ contact }) => {
    return (
      <div key={contact._id} className='flex gap-5 items-center'>
        <div className='flex gap-2 items-center'>
          <img className='w-12 h-12 ' src={process.env.REACT_APP_DefaultIcon} alt='' />
          <div>
            <h2 className='font-medium '>{`${contact.firstname} ${contact.lastname}`}</h2>
            <p className='text-gray-400 text-sm'>{contact.lastseen || 'last seen recently'}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <motion.div
        variants={AnimSlideLeft}
        initial='initial'
        animate='animate'
        exit='exit' className='border-r h-screen relative bg-white w-full'>
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
                onChange={(e) => setIsGroupName(e.target.value)}
                autoComplete='off'
                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                className="floating-label">Group Name</label>
            </div>
          </div>
          <div className='h-5 w-full bg-gray-100 shadow-inner shadow-gray-300'></div>
          <div className='p-5 pt-0'>
            <p className='text-blue-400 font-medium py-5'>{members?.length} members</p>
            <div className='space-y-5'>
              {members?.map(contact => (
                <CantactCart contact={contact} />
              ))}
            </div>
            {isError && <p className='text-sm text-red-500 py-5 font-bold'> {error?.data?.msg}</p>}
          </div>
          <div className='absolute bottom-10 right-5'>
            <div className='relative'>
              <button
                onClick={HandleNewGroup}
                disabled={isLoading}
                className='rounded-full w-14 h-14 flex justify-center cursor-pointer items-center bg-blue-500 text-white'>
                {isLoading ? <span className='flex justify-center items-center animate-spin'><ImSpinner3 size={25} /></span> : <BsArrowRight size={25} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CreateNewGroup
