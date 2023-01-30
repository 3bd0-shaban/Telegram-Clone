import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { BsBookmarkCheck, BsBookmarks, BsGear, BsJournals, BsMoon, BsPeople, BsQuestionCircle, BsToggleOff } from 'react-icons/bs'
import { ShowDrobdownMore } from '../../Redux/Slices/FeaturesSlice';
const DrobDownMore = () => {
    const DropItem = (props) => {
        return (
            <Link to='' className='flex gap-3 items-center justify-between px-3 rounded-lg hover:bg-gray-200'>
                <div className='flex gap-3 items-center py-2 duration-200 focus:px-1'>
                    <div className='text-[1.4rem]'>{props.Icon}</div>
                    <span className='whitespace-nowrap'>{props.Title}</span>
                </div>
                <div className='text-2xl'>{props.Toggle}</div>
            </Link>
        )
    }

    const { DrobdownMore } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    return (
        DrobdownMore &&
        <>
            <div onClick={() => dispatch(ShowDrobdownMore(false))} className="fixed inset-0 z-20"></div>
            <div className='absolute z-30 top-[4rem] left-5 shadow-gray-200 drop-shadow-lg rounded-lg bg-[rgb(255,255,255,.9)] backdrop-blur-xl text-md font-semibold py-3 px-2 w-[19rem]'>
                <DropItem Icon={<BsBookmarks />} Title={'Saved Messages'} />
                <DropItem Icon={<BsJournals />} Title={'Archeved Chats'} />
                <DropItem Icon={<BsPeople />} Title={'Contacts'} />
                <DropItem Icon={<BsGear />} Title={'Settings'} Toggle={<BsToggleOff />} />
                <DropItem Icon={<BsMoon />} Title={'Dark Mode'} />
                <DropItem Icon={<BsBookmarkCheck />} Title={'Animations'} />
                <DropItem Icon={<BsQuestionCircle />} Title={'Telegram Features'} />
                <DropItem Icon={<BsBookmarkCheck />} Title={'Report Bug'} />
                <DropItem Icon={'Z'} Title={' Switch to z version'} />
                <DropItem Icon={'w'} Title={' Switch to old version'} />
            </div>
        </>
    )
}

export default DrobDownMore
