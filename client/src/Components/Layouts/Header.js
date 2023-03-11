import React, { useState } from 'react'
import { BsBellSlash } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { RxDotsVertical } from 'react-icons/rx'
import { AiOutlineMenu } from 'react-icons/ai';
import { DrobDownMore } from '../Exports';
import { useDispatch } from 'react-redux';
// import { useGetUserByIdQuery } from '../../Redux/APIs/UserApi'
import { FeaturesAction } from '../../Redux/Slices/FeaturesSlice'
import { useParams } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchInput, setSeachInput] = useState();
  // const { data: user } = useGetUserByIdQuery(id) || {};
  // const navigate = useNavigate();
  const user=[]
  const handlesearch = (e) => {
    setSeachInput(e.target.value);
    dispatch(FeaturesAction.setKeyword(searchInput))
  }
  console.log(searchInput)
  return (
    <>
      <div className='fixed border-r border-l left-0 right-0 z-10 container px-0 max-w-[120rem] grid grid-cols-4 bg-white border-b'>
        <DrobDownMore />
        <div className='col-span-1 border-r px-5'>
          <div className='py-2 flex gap-3 items-center text-gray-700 w-full'>
            <button className='rounded-full p-3 hover:bg-gray-100 focus:bg-gray-200 duration-200 relative'
              onClick={() => dispatch(FeaturesAction.ShowDrobdownMore(true))}><AiOutlineMenu style={{ fontSize: "1.5rem" }} />
            </button>
            <input className='outline-none border rounded-full w- py-3 pl-3 w-full' onChange={handlesearch} value={searchInput} onFocus={() => dispatch(FeaturesAction.setSearchPanel(true))} placeholder='Search' />
          </div>
        </div>

        <div className='col-span-3 w-full flex py-1 justify-between items-center px-5'>
          <div className='flex gap-3 items-center'>
            <div className='w-12 h-12 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>V L</div>
            <div>
              <p className='text-xl font-semibold'>{user?.email}</p>
              <p className='font-light text-lg'>125 Subscriber</p>
            </div>
          </div>
          <div className='flex gap-5 text-2xl'>
            <BsBellSlash />
            <FiSearch />
            <RxDotsVertical />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
