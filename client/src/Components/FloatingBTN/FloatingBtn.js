import { BsMegaphone, BsPen, BsPeople, BsPerson } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';


const FloatingBtn = () => {
    const dispatch = useDispatch()
    const { isFloatingMenu } = useSelector(state => state.Features);

    const BTNFloatingFeatures = ({ onClickEvent, Icon, Title }) => {
        return (
            <button
                onClick={() => {
                    dispatch(FeaturesAction.setIsFloatingMenu(true));
                    dispatch(FeaturesAction.setIsSideBarChats(false));
                    onClickEvent();
                }}
                className='flex gap-3 items-center p-3 w-full rounded-lg hover:bg-gray-100 active:scale-95 duration-200'
            >
                <div className='text-[1.4rem]'>{Icon}</div>
                <span className='whitespace-nowrap'>{Title}</span>
            </button>
        )
    }

    return (
        <>

            <div className='absolute bottom-10 right-5'>
                <div className='relative'>
                    <div
                        onClick={() => dispatch(FeaturesAction.setIsFloatingMenu(!isFloatingMenu))}
                        className='rounded-full w-14 h-14 flex justify-center cursor-pointer items-center bg-blue-500 text-white'>
                        <BsPen size={23} />
                    </div>
                    {isFloatingMenu &&
                        <div className='absolute z-30 bottom-16 right-0 shadow-[2ox_2px_2px_2px] drop-shadow-lg select-none rounded-lg bg-[rgb(255,255,255,.9)]
                            backdrop-blur-xl text-md font-semibold w-[12rem] p-1 text-gray-700'>
                            <BTNFloatingFeatures onClickEvent={() => dispatch(FeaturesAction.setIsCreateChannel(false))} Icon={<BsMegaphone />} Title='New Channel' />
                            <BTNFloatingFeatures onClickEvent={() => dispatch(FeaturesAction.setIsSelcetContact(false))} Icon={<BsPeople />} Title='New Group' />
                            <BTNFloatingFeatures onClickEvent={() => dispatch(FeaturesAction.setIsSelcetContact(false))} Icon={<BsPerson />} Title='New Privat Chat' />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default FloatingBtn
