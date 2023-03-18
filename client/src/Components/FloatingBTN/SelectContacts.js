import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import AnimSlideLeft from './../../Animation/AnimSlideLeft';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice';
import { useGetContactsQuery } from '../../Redux/APIs/ContactsApi';
import { setContacts } from '../../Redux/Slices/ContactsSlice';

const SelectContacts = () => {
  const dispatch = useDispatch()
  const { data } = useGetContactsQuery();
  const { Contacts } = data || {};
  const [contactsAdded, setContactsAdded] = useState([]);
  const [error, setIsError] = useState('');
  console.log(contactsAdded.length)
  const HandleNewChannel = () => {
    try {
      if (contactsAdded.length > 0) {
        dispatch(setContacts(contactsAdded))
        dispatch(FeaturesAction.setIsSelcetContact(false));
        dispatch(FeaturesAction.setISCreateGroup(true));
      } else {
        setIsError('Add one contact al least')
      }
    } catch (error) {

    }
  }
  const CantactCart = ({ contact }) => {
    const [isAdded, setIsAdded] = useState(false);
    useEffect(() => {
      if (contactsAdded?.some(p => p === contact)) {
        setIsAdded(true)
      }
    }, [contact])
    const handleAddContact = () => {
      if (!isAdded) {
        setContactsAdded([...contactsAdded, contact])
      } else {
        setContactsAdded(() => {
          contactsAdded.filter(p => p._id !== contact?._id)
        })
      }
    }

    return (
      <div key={contact._id} className='flex gap-5 items-center'>
        <div>
          <input className='w-5 h-5 rounded-xl overflow-hidden' checked={isAdded}
            onChange={handleAddContact} type='checkbox' />
        </div>
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

  const AddContactsCart = ({ contact }) => {
    return (
      <div key={contact._id} className='flex gap-2 items-center my-2 rounded-full bg-gray-100'>
        <img className='w-10 h-10 overflow-hidden' draggable={false} src={process.env.REACT_APP_DefaultIcon} alt='' />
        <h2 className='font-medium '>{`${contact.firstname} ${contact.lastname}`}</h2>
      </div>
    )
  }
  return (
    <>
      <motion.div
        variants={AnimSlideLeft}
        initial='initial'
        animate='animate'
        exit='exit' className='border-r h-screen relative overflow-y-scroll hideScrollBar bg-white'>
        <div className='py-5 pt-3 relative h-full w-full select-none'>
          <div className='flex gap-3 px-5 py-2'>
            <button className='text-gray-400'
              onClick={() => {
                dispatch(FeaturesAction.setIsSelcetContact(false));
                dispatch(FeaturesAction.setIsSideBarChats(true));
              }} ><BsArrowLeft size={25} /></button>
            <h3 className='text-lg font-medium'>Add Members</h3>
          </div>

          <div className='p-5 grid grid-cols-2 gap-x-3 items-center'>
            {contactsAdded?.map(contact => (
              <AddContactsCart contact={contact} />
            ))}
          </div>

          <div className='h-5 w-full bg-gray-100 shadow-inner shadow-gray-300'></div>
          <div className='p-5 lg:px-7 space-y-5'>
            {Contacts?.contacts?.map(contact => (
              <CantactCart contact={contact} />
            ))}
          </div>
          {error && <p className='px-5 text-red-500'>{error}</p>}
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

export default SelectContacts
