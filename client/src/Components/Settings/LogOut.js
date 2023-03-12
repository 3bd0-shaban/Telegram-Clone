import React from 'react'
import { useLogOutMutation } from '../../Redux/APIs/AuthApi'
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { BsPower } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logOut] = useLogOutMutation();
    const handleLogOut = () => {
        logOut().unwrap()
            .then(() => {
                navigate('/signin')
            })
    }

    return (
        <>
            <div onClick={() => dispatch(FeaturesAction.setIsLogout(false))} className="fixed inset-0 z-20"></div>
            <div className='absolute z-30 top-[3.8rem] right-0 shadow-gray-200 drop-shadow-lg rounded-lg bg-[rgb(255,255,255,.9)]
                 backdrop-blur-xl text-md font-semibold w-[15rem]'>
                <button onClick={handleLogOut} className='flex gap-3 items-center p-3 w-full rounded-lg hover:bg-gray-100'>
                    <div className='text-[1.4rem]'><BsPower /></div>
                    <span className='whitespace-nowrap'>Logout</span>
                </button>
            </div>
        </>
    )
}

export default LogOut
