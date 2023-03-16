import React, { useState } from 'react'
import { motion } from 'framer-motion';
import AnimSlideLeft from './../../Animation/AnimSlideLeft';
import { UplaodIcon } from '../Exports';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice';
import { useNewChannelMutation } from '../../Redux/APIs/ChannelApi';
import { useNavigate } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';

const CreateNewChannel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        channelName: '',
        info: '',

    });
    const [icon, setIcon] = useState('');
    const [NewChannel, { isError, error, isLoading }] = useNewChannelMutation()

    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const HandleNewChannel = () => {
        const { channelName, info } = inputs;
        const data = { channelName, info, icon };
        NewChannel(data).unwrap()
            .then(payload => {
                navigate(`/channel/${payload?._id}`);
                dispatch(FeaturesAction.setIsCreateChannel(false));
                dispatch(FeaturesAction.setIsSideBarChats(true));
                setInputs({
                    channelName: '',
                    info: '',

                })
            })
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
                                onChange={handleChange}
                                value={inputs.channelName}
                                name='channelName'
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
                                value={inputs.info}
                                name='info'
                                autoComplete='off'
                                className="px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border-1 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "

                            />
                            <label
                                className="floating-label">Description ( optional )</label>
                        </div>
                        <p className='text-sm text-gray-400'>You can provide an optional description for your channel.</p>
                        {isError && <p className='text-sm text-red-500 font-bold'> {error?.data?.msg}</p>}
                    </div>
                    <div className='fixed bottom-10 right-5'>
                        <div className='relative'>
                            <button
                                onClick={HandleNewChannel}
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

export default CreateNewChannel
