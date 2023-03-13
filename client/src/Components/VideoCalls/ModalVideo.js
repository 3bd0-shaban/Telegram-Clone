import { motion } from 'framer-motion';
import AnimModal from './../../Animation/AnimModal';
import { useDispatch } from 'react-redux';
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice';
import { BsX, BsMicFill, BsEasel2 } from 'react-icons/bs';
import { IoGridOutline, IoVideocamOutline } from 'react-icons/io5';
import { MdOutlineCallEnd } from 'react-icons/md';
import { usePeer } from '../Exports';

const ModalVideo = () => {
    const dispatch = useDispatch();
    const { callEnded, isMyCam, userVideo, stream, setIsMyCam, leaveCall, myVideo } = usePeer();
    return (
        <>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                drag
                dragConstraints={{
                    top: -200,
                    right: 400,
                    bottom: 400,
                    left: -200,
                }}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                dragElastic={1}
                className='fixed inset-x-0 top-[10%] cursor-pointer p-4 container max-w-md sm:max-w-xl h-[35rem] sm:h-[47.5rem] md:h-[52rem] lg:max-w-4xl z-30 '
            >
                <div className="relative bg-black/90 backdrop-blur-3xl rounded-lg overflow-hidden h-full shadow">
                    <div className='w-full h-full text-white'>
                        <div className='relative h-full w-full'>
                            <div className='flex justify-between items-center p-5 text-3xl absolute top-0 w-full'>
                                <button
                                    onClick={() => dispatch(FeaturesAction.setIsVideoModal(false))}><BsX /></button>
                                <button><IoGridOutline /></button>
                            </div>
                            {/* <video playsInline muted ref={myVideo} autoPlay className='w-full h-full object-cover' /> */}

                            {stream && (
                                <div>
                                    <video playsInline muted ref={userVideo} autoPlay className='w-full h-full object-cover' />
                                    <h2>fi</h2>
                                </div>
                            )}
                            {isMyCam && !callEnded && (
                                <video playsInline muted ref={myVideo} autoPlay className='w-[20%] h-[20%] absolute right-0 bottom-0 object-cover' />
                            )}
                            <div className='flex gap-5 justify-center absolute bottom-24 inset-x-0'>
                                <button className='rounded-full h-14 w-14 bg-white text-black flex justify-center items-center'><IoVideocamOutline size={25} /></button>
                                <button className='rounded-full h-14 w-14 bg-white text-black flex justify-center items-center'><BsEasel2 size={25} /></button>
                                <button className='rounded-full h-14 w-14 bg-white text-black/50 flex justify-center items-center'><BsMicFill size={25} /></button>
                                <button onClick={() => {
                                    leaveCall();
                                    setIsMyCam();
                                }} className='rounded-full h-14 w-14 bg-red-600 flex justify-center items-center'><MdOutlineCallEnd size={25} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ModalVideo
