import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatApi, useUserChatsQuery } from '../../Redux/APIs/ChatApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SingleChat } from '../Exports'
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { AiOutlineMenu } from 'react-icons/ai';
import DrobDownMore from './DrobDownMore';
import SearchPanel from './SearchPanel';
import { BiChevronLeft } from 'react-icons/bi';
const Sidebar = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line 
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { data, isError, isFetching, error } = useUserChatsQuery(1, {
    // refetchOnMountOrArgChange: true
  });
  const [keyword, setKeyword] = useState('')
  console.log(keyword)
  const { DrobdownMore, isSearchPanel } = useSelector(state => state.Features);
  const { Chats, totalCount } = data || {};
  const { username } = useParams()
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (totalCount === 0) {
      setHasMore(false);
    }
  }, [totalCount, page]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        ChatApi.endpoints.getMoreChats.initiate({
          page
        })
      );
    }
  }, [page, dispatch]);

  return (
    <>
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
            onBlur={() => dispatch(FeaturesAction.setSearchPanel(true))}
            placeholder='Search' />
        </div>
      </div>
      <hr />
      <div className='h-[calc(100vh-3.5rem)] overflow-hidden'>
        {isSearchPanel ? <SearchPanel keyword={keyword} /> :
          <div className='overflow-y-scroll hideScrollBar border-r h-full pt-2'>
            {isFetching ?
              <div className='space-y-7 py-5'>

              </div>
              : isError ? <p>{error?.data?.msg}</p> :

                <InfiniteScroll
                  dataLength={Chats.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  // loader={<h4>Loading...</h4>}
                  className='overflow-y-scroll !h-full hideScrollBar mt-10 lg:mt-0'
                >
                  {Chats?.map(chat => (
                    <div key={chat?._id}>
                      <SingleChat chat={chat} username={username} />
                    </div>
                  ))}
                </InfiniteScroll>
            }
          </div>
        }
      </div>
    </>
  )
}

export default Sidebar
