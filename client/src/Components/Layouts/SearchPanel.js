import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserApi, useSearchQuery } from './../../Redux/APIs/UserApi';
import { useNavigate } from 'react-router-dom';
import { useNewChatMutation } from '../../Redux/APIs/ChatApi';
const SearchPanel = ({ keyword }) => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line 
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isFetching, error } = useSearchQuery(keyword);
  const [NewChat] = useNewChatMutation();
  const { users, totalCount } = data || {};
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
        UserApi.endpoints.SearchMore.initiate({
          keyword,
          page
        })
      );
    }
  }, [page, keyword, dispatch]);
  const HandleNewChat = async (username, id) => {
    await NewChat(id).unwrap()
      .then(id => {
        navigate(`/${username}/message/${id}`)
      })
  }

  return (
    <>
      <div className='overflow-y-scroll hideScrollBar border-r h-full'>
        {isFetching ?
          <div className='space-y-7 py-5'>

          </div>
          : isError ? <p>{error?.data?.msg}</p> :

            <InfiniteScroll
              dataLength={users.length}
              next={fetchMore}
              hasMore={hasMore}
              // loader={<h4>Loading...</h4>}
              className='overflow-y-scroll !h-full hideScrollBar mt-10 lg:mt-0'
            >
              <div className='px-3'>
                {users?.map(user => (
                  <div
                    onClick={() => HandleNewChat(user?.username, user?._id)}
                    key={user?._id} className='w-full cursor-pointer'>
                    <div className='flex p-2 hover:bg-gray-100 rounded-xl my-1'>
                      <div>
                        {(user?.avatar?.url || user?.avatar) ?
                          <div className="w-16 h-16 ">
                            <img className="rounded-full object-cover" src={user?.avatar[0]?.url} alt='' />
                          </div> :
                          <span
                            className={`w-16 h-16 rounded-full text-2xl flex items-center justify-center text-white font-bold shadow-[.2px_.2px_3px_1px] shadow-[#7c2d12]`}
                            style={{
                              backgroundColor: `${user?.color}`,
                              '--tw-shadow-color': ` ${user?.color}`,
                              '--tw-shadow': 'var(--tw-shadow-colored)',
                              boxShadow: 'var(--tw-shadow)'
                            }}>
                            {

                              `${user?.firstname?.charAt(0)} ${user?.lastname?.charAt(0)}`
                            }
                          </span>
                        }
                      </div>
                      <div className='w-full px-3 pt-2'>
                        <p className='font-[500] text-sm'>
                          {

                            `${user?.firstname} ${user?.lastname}`
                          }
                        </p>
                        <p className="whitespace-nowrap text-gray-400">{user?.username}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
        }
      </div>
    </>
  )
}

export default SearchPanel
