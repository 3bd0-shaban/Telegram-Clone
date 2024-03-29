import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatApi, useUserChatsQuery } from '../../Redux/APIs/ChatApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SingleChat, FloatingBtn, DrobDownMore } from '../Exports'
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { AiOutlineMenu } from 'react-icons/ai';
import SearchPanel from './SearchPanel';
import { BiChevronLeft } from 'react-icons/bi';
import { motion } from 'framer-motion';
import AnimSlideRight from '../../Animation/AnimSlideRight';

import { ChatProvider } from './../../Context/ChatContext';
const Sidebar = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line 
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { data, isError, isFetching, error } = useUserChatsQuery(1, {
    // refetchOnMountOrArgChange: true
  });
  const [keyword, setKeyword] = useState('')
  const { DrobdownMore, isSearchPanel } = useSelector(state => state.Features);
  const { Chats, totalCount } = data || {};
  const { username } = useParams()
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        ChatApi.endpoints.getMoreChats.initiate(page)
      );
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalCount === 0) {
      setHasMore(false);
    }
  }, [totalCount, page]);

  return (
    <motion.div
      variants={AnimSlideRight}
      initial='initial'
      animate='animate'
      exit='exit'
      className='h-screen'>
      <div className='border-r px-3'>

        <div className='py-2 flex gap-1 items-center text-gray-700 w-full relative'>
          {isSearchPanel ? <button className='rounded-full p-3 hover:bg-gray-100 focus:bg-gray-200 duration-200 relative'
            onClick={() => dispatch(FeaturesAction.setSearchPanel(false))}> <BiChevronLeft size={25} />
          </button>
            :
            <button className='rounded-full p-3 hover:bg-gray-100 focus:bg-gray-200 duration-200 relative'
              onClick={() => dispatch(FeaturesAction.ShowDrobdownMore(true))}><AiOutlineMenu size={25} />
            </button>
          }

          {DrobdownMore && <DrobDownMore />}
          <input className='outline-none border rounded-full w- py-3 pl-3 w-full'
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => dispatch(FeaturesAction.setSearchPanel(true))}
            // onBlur={() => dispatch(FeaturesAction.setSearchPanel(true))}
            placeholder='Search' />
        </div>
      </div>
      <hr />
      <div className=' overflow-hidden'>
        {isSearchPanel ? <SearchPanel keyword={keyword} /> :
          <div className='border-r h-full pt-2'>
            {isFetching ?
              <div className='space-y-7 py-5'>

              </div>
              : isError ? <p>{error?.data?.msg}</p> :

                <InfiniteScroll
                  dataLength={Chats.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  // loader={<h4>Loading...</h4>}
                  className='overflow-y-scroll !h-[calc(100vh-4.5rem)] hideScrollBar relative mt-10 lg:mt-0'
                >
                  {Chats?.map(chat => (
                    <div key={chat?._id} >
                      <ChatProvider singleChat={chat}>
                        <SingleChat chat={chat} username={username} />
                        <FloatingBtn />
                      </ChatProvider>

                    </div>
                  ))}
                </InfiniteScroll>
            }
          </div>
        }
      </div>
    </motion.div>
  )
}

export default Sidebar
